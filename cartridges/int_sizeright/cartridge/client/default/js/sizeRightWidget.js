$(document).ready(function(){
    var sizeRightScript = document.createElement("script");
    sizeRightScript.setAttribute("src", "https://s3.amazonaws.com/aetrex-fit-genius-widgets/size-right/sizeright_widget.js");
    sizeRightScript.async = true;
    $("head")[0].appendChild(sizeRightScript);
   });
   
$('.myButton').on('click', function () {
    
  $("body")[0].innerHTML=""
  var div = document.createElement("div");
  div.setAttribute("style", "width:100%; height:1000px");
  var skuId = $("#productId")[0].value;
  var userSessionId = $("#userSessionId")[0].value;
  var gender = $("#gender")[0].value;
        var StyleLink = document.createElement("LINK");
        StyleLink.setAttribute("rel", "stylesheet");
        StyleLink.setAttribute("href", "https://s3.amazonaws.com/aetrex-fit-genius-widgets/size-right/styles.css");
        var sizeRight = document.createElement("size-right");
        sizeRight.setAttribute("session_id", userSessionId);
        sizeRight.setAttribute("name", "aetrex.com");
        sizeRight.setAttribute("sku", skuId);
        sizeRight.setAttribute("gender", gender);
        sizeRight.setAttribute("email", "cdb60869498b592a39a3ae44f17cd80e11184942e989128149139fd7ccbba331");
        var jquery = document.createElement("script");
        jquery.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js");
        div.appendChild(StyleLink);
        div.appendChild(jquery);

        div.appendChild(sizeRight);
        var button1Script = document.createElement("script");
        var button2Script = document.createElement("script");
        button1Script.innerText = `$('body').on('click', 'button[mat-dialog-close=exit], .resultCloseBtn, .sendmailBtn', function () { window.location.reload();});`
        button2Script.innerText = `function afterLoaded(){ $('.Recycle').click(); $('div.sizerighttext').find('div.Header').click();} setTimeout(afterLoaded,1000) `
        div.appendChild(button1Script);
        div.appendChild(button2Script);
        var style = document.createElement("style");
        style.innerText = `div size-right .flex-container{display:none !important;}`
        div.append(style);
       
        $("body")[0].appendChild(div);

});

$("#medianShowSize").on("click",function(){
  $('body').css("overflow", "hidden");
  $("#myModal")[0].style.display = "block";
})
$(".close").on("click", function(){
  $('body').css("overflow", "auto");
  $("#myModal")[0].style.display = "none";
})
$("#Measurements").on("click", function() {

  $('body').css("overflow", "hidden");
  $("#myModal1")[0].style.display = "block";
})
$(".close1").on("click", function() {
  $('body').css("overflow", "auto");
  $("#myModal1")[0].style.display = "none";
})