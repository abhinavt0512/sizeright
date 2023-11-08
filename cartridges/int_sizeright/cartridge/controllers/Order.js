'use strict';
var server = require('server');
server.extend(module.superModule);


/**
 * Order-Confirm : This endpoint is appended to the Order-Confirm endpoint to track the order
 * @name int_sizeright/Order-Confirm
 * @function
 * @memberof Order
 * @param {querystringparameter} - ID - Order ID
 * @param {querystringparameter} - token - token associated with the order
 * @param {category} - sensitive
 * @param {serverfunction} - get
*/
server.append('Confirm', function (req, res, next) {
    var MessageDigest = require('dw/crypto/MessageDigest');
    var Encoding = require('dw/crypto/Encoding');
    var pixelTrackingService = require('*/cartridge/scripts/hooks/services/pixelTrackingService');
    var Logger = require('dw/system/Logger');
    
    
    var getViewData = res.getViewData();
    if (!getViewData || !getViewData.order) {
        Logger.debug('Pixeltracking | No order data found');
        return next();
    }
    
    var order = getViewData.order;
    var trackingEmailId = order.orderEmail;
    var trackingOrderId = order.orderNumber;
    var trackingOrderTotal = order.priceTotal;
    var trackingProductIds = order.items.items;
    var trackingProductIdsArray = [];
    trackingOrderTotal = parseFloat(trackingOrderTotal.replace(/[^\d.-]/g, ''));
    
    if (!trackingProductIds) {
        Logger.debug('Pixeltracking | No product line items found');
        return next();
    }
    
    trackingProductIds.forEach(function (product) {
        trackingProductIdsArray.push(product.id);
    });
    trackingProductIdsArray = trackingProductIdsArray.join(',');
    
    var userSessionId = req.session.raw.custom.sizeRightSessionId;
    if (!userSessionId) {
        userSessionId = req.session.raw.custom.sizeRightSessionId = Encoding.toBase64(new MessageDigest(MessageDigest.DIGEST_SHA_256).digest(Math.random().toString(36).substr(2))).substr(0, 30);
    }

    var trackingObject = {
        email: trackingEmailId,
        order_id: trackingOrderId,
        price: trackingOrderTotal,
        product_id: trackingProductIdsArray,
        session_id: userSessionId
    };
    trackingObject = JSON.stringify(trackingObject);
    Logger.debug('Pixeltracking object : ' + trackingObject);
    try {
        var response = pixelTrackingService.orderPixelTracking.call(trackingObject)
        response = response && response.object ? response.object.text : response;
        Logger.debug('Pixeltracking | Response : {0}' , response);
    } catch (e) {
        Logger.error('Pixeltracking | Error tracking pixel : ' + e + 'trackingObject : ' + trackingObject); 
    }
    next();
});

module.exports = server.exports();
