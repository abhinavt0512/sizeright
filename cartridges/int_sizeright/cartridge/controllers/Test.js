'use strict';

var server = require('server');

server.get('show',function(req,res,next){
    res.render('sizeRightTest2');
    // res.print('hii');
    next();
});

module.exports = server.exports();