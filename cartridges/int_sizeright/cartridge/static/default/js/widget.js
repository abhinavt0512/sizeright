!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){function n(){$(".Recycle").click(),$("div.sizerighttext").find("div.Header").click(),o()}function o(){var e=document.getElementsByClassName("desktopContainer");if(window.outerWidth<600)for(let t=0;t<e.length;t++)e[t].setAttribute("style","display: none;");else for(let t=0;t<e.length;t++)e[t].setAttribute("style","display: flex;")}$(document).ready((function(){window.addEventListener("load",n,!1),window.addEventListener("load",selectSize,!1),window.addEventListener("resize",o)})),$("body").on("click",".first-page-closeBtn, .stepCloseBtn, .video-page-closeBtn",e=>{$("body").css("display","none"),history.back()}),$("#aetrex_foot_profile_container").on("DOMSubtreeModified",(function(){console.log("changed");var e=$("#aetrex_foot_profile_container").find("span.size").html();console.log(e)}))}]);