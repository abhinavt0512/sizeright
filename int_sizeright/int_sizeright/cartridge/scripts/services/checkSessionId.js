var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var sendSessionInfo = LocalServiceRegistry.createService('int_sizeright.checksession.http.rest', {
    createRequest: function (svc, args) {
        var url = svc.configuration.credential.URL;
        svc.setRequestMethod('POST');
        svc.addHeader('Content-Type', 'application/json');
        return args;
    },
    parseResponse: function (svc, httpClient) {
        var result;
        try {
            result = JSON.parse(httpClient.text);
        } catch (e) {
            result = httpClient.text;
        }
        return result;
    },
    filterLogMessage: function filterLogMessage(msg) {
        return msg;
    },
    getRequestLogMessage: function (request) {
        return request;
    },
    getResponseLogMessage: function (response) {
        return response;
    }
});

module.exports = {
  sendSessionInfo: sendSessionInfo
};

