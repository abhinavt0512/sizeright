
// const dispatchEvent = require('./dispatcher').dispatchEvent;
$(document).ready(function(){
    $('.sizerighttext').on('myevent', function(e, data) {
        alert(e);
        alert(JSON.stringify(data));
    });
})
