/*! morgan-stanley-redesign 20-07-2021 */
var MSCOM=MSCOM||{};MSCOM.Modules=MSCOM.Modules||{},MSCOM.Modules.oneUpCarousel=function(){function a(){function a(){$(".video-carousel #videoMain.video").each(function(a){if($(".video-carousel #videoMain.video > div").hasClass("vjs-playing")){var b=$(".video-carousel #videoMain.video > div video"),c=document.getElementById(b[a].id);c.pause()}})}b.slick(b.hasClass("value-carousel")?{slide:"div",slidesToShow:1,infinite:!1,dots:!0,accessibility:!1,nextArrow:".slick-next",prevArrow:".slick-prev",onInit:function(){$(".oneup-carousel .slick-list .slick-track").find("div").not(".slick-active").attr("tabindex","-1"),$(".oneup-carousel .slick-list .slick-track").find("div").hasClass("slick-active")&&$(".oneup-carousel .slick-list .slick-track").find("div.slick-active").attr("tabindex","0"),$(".oneup-carousel .slick-dots li").find("button").attr("tabindex","-1"),$(".oneup-carousel .slick-prev").hasClass("slick-disabled")?$(".oneup-carousel .slick-prev").attr("tabindex","-1"):$(".oneup-carousel .slick-prev").attr("tabindex","0"),$(".oneup-carousel .slick-next").hasClass("slick-disabled")?$(".oneup-carousel .slick-next").attr("tabindex","-1"):$(".oneup-carousel .slick-next").attr("tabindex","0")},onAfterChange:function(){$(".oneup-carousel .slick-list .slick-track").find("div").not(".slick-active").attr("tabindex","-1"),$(".oneup-carousel .slick-list .slick-track").find("div").hasClass("slick-active")&&$(".oneup-carousel .slick-list .slick-track").find("div.slick-active").attr("tabindex","0"),$(".oneup-carousel .slick-prev").hasClass("slick-disabled")?($(".oneup-carousel .slick-prev").attr("tabindex","-1"),$(".oneup-carousel .slick-next").focus()):$(".oneup-carousel .slick-prev").attr("tabindex","0"),$(".oneup-carousel .slick-next").hasClass("slick-disabled")?($(".oneup-carousel .slick-next").attr("tabindex","-1"),$(".oneup-carousel .slick-prev").focus()):$(".oneup-carousel .slick-next").attr("tabindex","0")}}:{slide:"div",slidesToShow:1,dots:!0,accessibility:!1,nextArrow:".slick-next",prevArrow:".slick-prev",onInit:function(){$(".oneup-carousel .slick-list .slick-track").find("div").not(".slick-active").attr("tabindex","-1"),$(".oneup-carousel .slick-list .slick-track").find("div").hasClass("slick-active")&&$(".oneup-carousel .slick-list .slick-track").find("div.slick-active").attr("tabindex","0"),$(".oneup-carousel .slick-dots li").find("button").attr("tabindex","-1")},onAfterChange:function(){$(".oneup-carousel .slick-list .slick-track").find("div").not(".slick-active").attr("tabindex","-1"),$(".oneup-carousel .slick-list .slick-track").find("div").hasClass("slick-active")&&$(".oneup-carousel .slick-list .slick-track").find("div.slick-active").attr("tabindex","0")}}),$(".has-nav .slick-prev, .has-nav .slick-next, .has-nav .slick-dots li").on("click",function(){a()}),$(".video-carousel .oneup-carousel .slick-prev,.slick-next,.slick-dots>li>button").attr("data-analytics-micro-conversion","video-carousel-click"),$(".facts .oneup-carousel .slick-next,.slick-prev,.slick-dots>li>button").attr("data-analytics-micro-conversion","facts-carousel-click")}var b=$(".oneup-carousel"),c={init:a};return c}();