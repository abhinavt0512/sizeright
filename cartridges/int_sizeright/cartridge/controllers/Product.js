var server = require('server');

server.extend(module.superModule);

var Site = require('dw/system/Site');
var checkSessionIdService = require('*/cartridge/scripts/services/checkSessionId');
var ProductMgr = require('dw/catalog/ProductMgr');
var collections = require("*/cartridge/scripts/util/collections");
var Mac = require('dw/crypto/Mac');
var MessageDigest = require('dw/crypto/MessageDigest');

/**
 * Product-Show : Extended Route Show from app_storefront_base to
 * send the active current customer email for the Product Details Page
 * @name Product-Show
 * @function
 * @memberof Product
 * @param {category} - sensitive
 */
server.prepend('Show', function (req, res, next) {

    var sizeRightDomain = Site.getCurrent().getCustomPreferenceValue("fitGeniusDomain");
    var sizeRightCategories = Site.getCurrent().getCustomPreferenceValue("sizerightCategories");
    var digest = new MessageDigest(MessageDigest.DIGEST_SHA_256);
    var userSessionId = req.session.raw.custom.sizeRightSessionId ? req.session.raw.custom.sizeRightSessionId : req.session.raw.custom.sizeRightSessionId = digest.digest(Math.random().toString(36).substr(2)).substr(0,30);
    var product = ProductMgr.getProduct(req.querystring.pid);
    var gender;
    var productSku;
    if (product) {
        gender = product.custom.sizeRightGender ? product.custom.sizeRightGender.value : 'female';
        productSku = product.ID;
    }

    var sessionData = {session_id: userSessionId,gender:"female",sku:req.querystring.pid};
    var serviceResponse = checkSessionIdService.sendSessionInfo.call(JSON.stringify(sessionData));
    var status = serviceResponse.status == "OK" ? true : false;
    if (!status) {
        serviceResponse = null;
    }
    var data = res.getViewData();
    var shoeSize = gender == 'male' ? serviceResponse.object.malesize : serviceResponse.object.femalesize;
    var showScoreFlag = false;


    if (product) {

        var productCategories = product.allCategories;

        sizeRightCategories.forEach(function(category) {

            collections.forEach(productCategories, function (productCategory) {
                if (productCategory.ID == category) {
                    showScoreFlag = true;
                }
                
            });
            
        });
        
    }


    res.setViewData({
        gender:gender,
        userSessionId:userSessionId,
        sizeRightDomain:sizeRightDomain,
        serviceResponse:serviceResponse,
        shoeSize:shoeSize,
        showScoreFlag:showScoreFlag,
        productSku: productSku
    });


    next();
});
module.exports = server.exports();


server.prepend('Show', function (req, res, next) {

    if (req.currentCustomer.profile) {
        var customerEmail = req.currentCustomer.profile.email;
        var bytes = new Bytes(customerEmail);
        var digest = new MessageDigest(MessageDigest.DIGEST_SHA_256);
        var hashBytes = digest.digest(bytes);
        var customerLoggedIn = true;
        var integrationMode = Site.getCurrent().getCustomPreferenceValue("integrationMode");
        var fitGeniusScore;
        var siteDomain = Site.getCurrent().getCustomPreferenceValue("fitGeniusDomain");
        var profileEmail = Resource.msg('fitgenius.testHashedEmail', 'widgets', null);
        var productList;
        var profileData;

        if (integrationMode == 'test') {

            productList=["AE210W"];
            
            profileData =  {domain: siteDomain, profile_email: profileEmail,skus:productList};
            var serviceResponse = fitGeniusScoreService.getScore.call(JSON.stringify(profileData));
            if (serviceResponse.status == 'OK') {
                fitGeniusScore = serviceResponse.object.results[0].FitGenius_Score;
                
            }
        }
        else if (integrationMode == 'live') {
            productList=[req.querystring.pid];
            profileData =  {domain: siteDomain, profile_email: customerEmail,skus:productList};
            var serviceResponse = fitGeniusScoreService.getScore.call(JSON.stringify(profileData));
            if (serviceResponse.status == 'OK') {
                fitGeniusScore = serviceResponse.object.results[0].FitGenius_Score;
            }
            
        }
        res.setViewData({
            customerEmail: req.currentCustomer.profile.email,
            hashedUserEmail: hashBytes,
            customerLoggedIn: customerLoggedIn,
            showScoreFlag: true,
            displayOnDetailsPage: true,
            fitGeniusScore: fitGeniusScore
        });
    }




// var Logger = require('dw/system/Logger');
// var successLog = Logger.getLogger('custom-fitGenius-Logs','root');
// var errorLog = Logger.getLogger('service-fit-genius','root');
// try{
//     successLog.debug(msg : "success", args : Object...)
// }catch(e){
//     errorLog.error(msg : "error", args :e )
// }






    next();
});