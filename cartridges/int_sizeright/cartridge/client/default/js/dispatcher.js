$(document).ready(function(){
    $('body').on('click', '.sizerighttext', (event) => {
        alert('clicked');
        $('.sizerighttext').trigger('myevent', {dataKEY: 'dataVALUE'});
    })
})