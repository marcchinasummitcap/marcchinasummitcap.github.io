/*! morgan-stanley-redesign 20-07-2021 */
var MSCOM=MSCOM||{};MSCOM.Modules=MSCOM.Modules||{},MSCOM.Modules.mainNav=function(){function a(){l=$("html"),x.bind({blur:function(){$(this);l.hasClass(o)&&y.deactivate()},mouseover:function(){l.hasClass(o)&&(y.add(A).deactivate(),$(this).next(y).activate())},mouseout:function(){l.hasClass(o)&&(y.deactivate(),A.deactivate())},click:function(a){var c=$(this);if(l.hasClass(p)||c.parent().hasClass("first")||(a.preventDefault(),c.parent().activate()),!l.hasClass(o)&&c.next().is(y)){var d=y;b(a,c,d)}}}),y.bind({mouseover:function(){l.hasClass(o)&&$(this).activate()},mouseout:function(){l.hasClass(o)&&($(this).deactivate(),A.deactivate())}}),z.bind({blur:function(){l.hasClass(o)&&$(this).parents("ul, li").deactivate()},mouseover:function(){var a=$(this),b=a.parent().siblings();l.hasClass(o)&&($(A,b).deactivate(),$(this).next(A).activate())},click:function(a){var c=$(this);if(l.hasClass(p)||c.next("ul").length&&(a.preventDefault(),c.parent().activate()),!l.hasClass(o)&&c.next().is(A)){var d=A;b(a,c,d)}}}),A.bind({mouseover:function(){l.hasClass(o)&&$(this).activate()},mouseout:function(){l.hasClass(o)&&$(this).deactivate()}}),B.bind({focus:function(){$(this).parents("ul, li").activate()},blur:function(){$(this).parents("ul, li").deactivate()}})}function b(a,b,c){a.preventDefault(),a.stopPropagation(),b.next().hasClass(n)?(b.next().deactivate(),b.parent().deactivate()):(b.parent().siblings().deactivate(),c.deactivate(),b.parent().activate(),b.next().activate())}function c(){$(document).click(function(){l.hasClass(o)&&m.deactivate()})}function d(a){l.toggleClass(q),l.hasClass(r)&&toggleSearch(a)}function e(a){l.removeClass(q),m.deactivate(),l.hasClass(r)&&toggleSearch(a)}function f(){$("#toggle-menu").on("click",d),$(".menu-overlay button").on("click",e)}function g(){return t==window.pageYOffset?(window.requestAnimationFrame(g),!1):(t=window.pageYOffset,h(),void window.requestAnimationFrame(g))}function h(){var a,b=s.outerHeight()+5,c=k.scrollTop(),d=u-c;c>0?s.addClass("header-scrolling"):s.removeClass("header-scrolling"),a=-b>v+d?-b:v+d>0?0:v+d,s.css("transform","translate3d(0,"+a+"px,0)"),s.attr("data-translated",a),clearTimeout($.data(this,"scrollTimer")),$.data(this,"scrollTimer",setTimeout(function(){u=c,v=parseFloat(s.attr("data-translated"))},250))}function i(){$(".nav-item").each(function(){var a=$(this).find(".featured-content-container");$(this).removeClass("__right"),a[0]&&a[0].getBoundingClientRect()&&window.innerWidth-a[0].getBoundingClientRect().left<a.innerWidth()&&$(this).addClass("__right")})}function j(){var a="navitem--hovered",b=MSCOM.utilities.debounce(function(){$(this).removeClass(a)},250),c=MSCOM.utilities.debounce(function(){$(this).hasClass(a)||($("."+a).removeClass(a),$(this).addClass(a))},250),d=function(b){$(this).hasClass(a)||(b.preventDefault(),$("."+a).removeClass(a),$(this).addClass(a))},e=function(b){if(l.hasClass(o)){b.preventDefault();var c=$(this).parent(),d=c.hasClass(a);$("."+a).removeClass(a),d||c.addClass(a)}};$(".nav-item.--with-featured-content").on("mouseout",b),$(".nav-item.--with-featured-content").on("mouseover",c),$(".nav-item.--with-featured-content>a").on("touchstart",e),$(".nav-item.--with-featured-content").on("click",d)}var k=$(window),l=$("html"),m=$(".main-nav *"),n="is-active",o="large",p="no-touch",q="_mobile-open",r="_search-open",s=$(".site-wrap > header"),t=-1,u=0,v=0,w=$(".first-level"),x=w.find("> li > a"),y=$(".second-level"),z=y.find("> li > a"),A=$(".third-level"),B=A.find("> li > a");$.fn.activate=function(){$(this).addClass(n)},$.fn.deactivate=function(){$(this).removeClass(n)},$.fn.toggleActivate=function(){$(this).toggleClass(n)},k.on("resize",function(){$(this).width()>999&&(l.removeClass(q),m.deactivate(),i())}).trigger("resize");var C={init:function(){a(),i(),j(),c(),f(),g()}};return C}();