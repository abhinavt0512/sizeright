var server = require('server');

server.extend(module.superModule);

var Site = require('dw/system/Site');
var checkSessionIdService = require('*/cartridge/scripts/services/checkSessionId');
var ProductMgr = require('dw/catalog/ProductMgr');
var collections = require("*/cartridge/scripts/util/collections");
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
    const deviceType = (session.custom.device || 'WEB') === 'WEB' ? 'desktop' : 'mobile';
    var sizeRightEnabled;
    var gender;
    var productSku;
    if (product && product.primaryCategory) {
        gender = product.primaryCategory.custom.sizeRightGender ? product.primaryCategory.custom.sizeRightGender.value : 'Female';
        sizeRightEnabled = product.primaryCategory.custom.sizeRightEnabled;
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
        productSku: productSku,
        deviceType: deviceType,
        sizeRightEnabled: sizeRightEnabled
    });


    next();
});
module.exports = server.exports();
