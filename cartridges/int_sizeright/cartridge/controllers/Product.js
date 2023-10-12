'use strict';

var server = require('server');
server.extend(module.superModule);

const Site = require('dw/system/Site');
const ProductMgr = require('dw/catalog/ProductMgr');
const MessageDigest = require('dw/crypto/MessageDigest');

/**
 * Product-Show : It renders the size-right component on PDP
 * @name Product-Show
 * @function
 * @memberof Product
 * @param {category} - sensitive
 */
server.prepend('Show', function (req, res, next) {
    const sizeRightDomain = req.host;
    const digest = new MessageDigest(MessageDigest.DIGEST_SHA_256);
    const userSessionId = req.session.raw.custom.sizeRightSessionId ? req.session.raw.custom.sizeRightSessionId : req.session.raw.custom.sizeRightSessionId = digest.digest(Math.random().toString(36).substr(2)).substr(0,30);
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

    res.setViewData({
        gender: gender,
        userSessionId: userSessionId,
        sizeRightDomain: sizeRightDomain,
        productSku: productSku,
        deviceType: deviceType,
        sizeRightEnabled: sizeRightEnabled
    });
    next();
});

module.exports = server.exports();
