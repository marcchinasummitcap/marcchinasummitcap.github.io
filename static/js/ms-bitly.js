/*! morgan-stanley-redesign 20-07-2021 */
var MSCOM=MSCOM||{};MSCOM.Modules=MSCOM.Modules||{},MSCOM.Modules.msBitly=function(){function a(a){var b=a.split("?",2);return{baseUrl:b[0],queryString:b[1]||""}}function b(a){var b=a.split("&").reduce(function(a,b){var c=b.split("="),d=c[1]?c[1]:"";return a[c[0]]=d,a},{});return b}function c(a){var b=Object.keys(a).reduce(function(b,c){var d=c+"="+a[c];return d=b.length>0?"&"+d:d,b+d},"");return b}function d(){if($("div.short-headline-homepagehero").length>0)var a=$(".short-headline-homepagehero").html().trim().replace(/\| Morgan Stanley$/,"");else var a=$(document).find("title").text().trim().replace(/\| Morgan Stanley$/,"");return"Morgan Stanley | "+a.trim()}function e(e,f){var g=a(e),h=b(g.queryString);h.url=f,h.text||(h.text=encodeURIComponent(d())),h.text=h.text+" - ";var i=g.baseUrl+"?"+c(h);window.open(i,"_blank","")}function f(e,f){var g=a(e),h=b(g.queryString);h.url=f,h.summary&&(h.summary+=" - "+f),h.title||(h.title=encodeURIComponent(d()));var i=g.baseUrl+"?"+c(h);window.open(i,"_blank","")}function g(d,e){var f=a(d),g=b(f.queryString);g.quote&&(g.quote+=" - "+e);var h=f.baseUrl+"?"+c(g);window.open(h,"_blank","")}function h(d,e){var f=a(d),g=b(f.queryString);g.body&&(g.body=g.body.replace(window.location.href,e));var h=f.baseUrl+"?"+c(g);window.location.href=h}function i(a,b){var c=$(a).attr("href"),d=$(a).attr("data-href");l.hasOwnProperty(d)?b(c,l[d]):$.ajax({url:"https://api-ssl.bitly.com/v3/shorten",data:{longUrl:d,access_token:"d6cc005b768aebeb1649727402ed08f079afabcd"},success:function(a){var e;200===a.status_code?(e=a.data.url,l[d]=e,b(c,e)):b(c,d)},error:function(){b(c,d)}})}function j(){var a={"icon-twitter":e,"icon-linkedin":f,"icon-facebook":g,"icon-email":h};Object.keys(a).forEach(function(b){var c="a[class*="+b+"]";$(".sharebar").delegate(c,"click",function(c){c.preventDefault?c.preventDefault():c.returnValue=!1,i(this,a[b])})})}function k(){j()}var l={};return{init:k}}();