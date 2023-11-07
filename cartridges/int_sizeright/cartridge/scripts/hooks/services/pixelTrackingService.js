'use strict';

const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
const Site = require('dw/system/Site');
const UUIDUtils = require('dw/util/UUIDUtils');

const currentSite = Site.current;

var orderPixelTracking = LocalServiceRegistry.createService('int_fitgenius.pixeltracking', {
    createRequest: function (svc, param) {
        svc.addHeader('Content-Type', 'application/json');
        svc.setRequestMethod('POST');
        svc.setAuthentication('NONE');
        param = JSON.stringify(param);
        return param;
    },
    parseResponse: function (svc, result) {
        var c = 0;
        return result;
    },
    filterLogMessage: function (msg) {
        return msg;
    }
});

module.exports = {
    orderPixelTracking: orderPixelTracking
};