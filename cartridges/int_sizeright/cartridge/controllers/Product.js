var server = require('server');

server.extend(module.superModule);

var Site = require('dw/system/Site');
var checkSessionIdService = require('*/cartridge/scripts/services/checkSessionId');
var ProductMgr = require('dw/catalog/ProductMgr');
var collections = require("*/cartridge/scripts/util/collections");

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
    var userSessionId = req.session.raw.custom.sizeRightSessionId ? req.session.raw.custom.sizeRightSessionId : req.session.raw.custom.sizeRightSessionId = Math.random().toString(36).substr(2);
    var gender = 'female';
    var sessionData = {session_id: userSessionId,gender:"female",sku:req.querystring.pid};
    var serviceResponse = checkSessionIdService.sendSessionInfo.call(JSON.stringify(sessionData));
    var status = serviceResponse.status == "OK" ? true : false;
    if (!status) {
        serviceResponse = null;
    }
    var data = res.getViewData();
    var shoeSize = gender == 'male' ? serviceResponse.object.malesize : serviceResponse.object.femalesize;
    var showScoreFlag = false;

    var product = ProductMgr.getProduct(req.querystring.pid);

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
        showScoreFlag:showScoreFlag
    });


    next();
});
module.exports = server.exports();