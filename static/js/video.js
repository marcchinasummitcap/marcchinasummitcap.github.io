/*! morgan-stanley-redesign 20-07-2021 */
var MSCOM=MSCOM||{};MSCOM.Modules=MSCOM.Modules||{},MSCOM.Modules.video=function(){function a(a){var b=Math.floor(a/3600),c=Math.floor((a-3600*b)/60),d=Math.ceil(a-3600*b-60*c),e="";return b>0&&(e+=b+":"),e+=(b&&10>c?"0"+c:c)+":",e+=10>d?"0"+d:d}function b(){var b=$(".video-meta");b.size()>0&&b.each(function(){var b=$(this);if(!b.hasClass("__processed")){var c=window.location.pathname.replace(".html",""),d=c+"/video.dynadata_brightcove_video_info-results.json?videoId="+b.data("video-id");$.ajax({url:d,type:"GET",dataType:"json"}).done(function(c){$(".video__time",b).html(a(c.length/1e3)),$(".video__title",b).html(c.name),b.addClass("__processed")})}})}function c(){$(".hero-bg-video[data-container]").each(function(){var a,b,c=$(this),d=$(c.data("container"));d&&(a=d.width(),b=d.height(),b/a>=.5625?(c.css("height","100%"),c.css("width","auto")):(c.css("height","auto"),c.css("width","100%")))})}function d(){$(".video-bg").each(function(){var a=this,b=$(this).data("video-id"),d=window.location.pathname.replace(".html",""),e=d+"/video.dynadata_brightcove_video_info-results.json?videoId="+b,f=encodeURI(e);$.ajax({url:f,dataType:"json",success:function(b){var d=$('<video class="hero-bg-video" src="'+b.FLVURL+'" poster="'+b.videoStillURL+'"autoplay loop muted></video>');$(a).attr("data-container")&&(d.attr("data-container",$(a).attr("data-container")),d.on("loadedmetadata",function(){c()})),$(a).after(d),d[0].play(),$(a).remove(),Modernizr.on("videoautoplay",function(a){a||b.videoStillURL||$(".hero-video-bg").hide()})}})})}function e(){var a=$("html"),b=$(".modal-open");b.length>0&&b.each(function(a){var b=$(this),c=$(this).data("videoid"),d="modal-"+c+"-"+a;b.addClass(d),b.removeClass("modal-open"),$(this).modal({trigger:"."+d,olay:"div.video-overlay",modals:"div.modal",animationEffect:"fadeIn",animationSpeed:400,moveModalSpeed:"fast",background:"000000",opacity:.8,openOnLoad:!1,docClose:!0,closeByEscape:!0,moveOnScroll:!1,resizeWindow:!0,close:".closeBtn",videoClass:"video-modal",bcVideoId:c,bcAccount:"4J96MDb3l",bcPlayer:"644391012001"})}),b.on("click",function(b){if(a.hasClass("touch")){b.preventDefault();var c=$(this).data("videoid"),d=window.location.pathname.replace(".html",""),e=d+"/video.dynadata_brightcove_video_info-results.json?videoId="+c;$.ajax({url:e,dataType:"json",success:function(a){window.location.replace(a.FLVURL)}})}})}function f(){d(),b(),e()}function g(){f(),$(".vjs-control-bar").attr("aria-label","video-player"),$(window).on("resize",c),$(window).on("infinite-scroll:article-added",f)}return{init:g}}(),$(document).ready(function(){function a(a){var b,c=window.location.href,d=c.split("/"),e="/"+d[3],f=window.location.origin,g="";g="auth"===d[3]||"pub"===d[3]?f+e+"/video.dynadata_brightcove_video_info-results.json?videoId="+a:f+"/video.dynadata_brightcove_video_info-results.json?videoId="+a,$.ajax({headers:{Accept:pk="BCpkADawqM3r0KvGIw4rs9HAekOj_Tbekd80mVyJKY1Nb33Wv6n1XYYlJNx5yPbqm2VOS41Tu0RcWm1YgQ-VoqHH0b4OWjGYlOOhm7-uJVDx79VGDBYlWGcsjbs"},contentType:"application/json",url:g,async:!1,dataType:"json",success:function(c){b=c;var d=JSON.parse(JSON.stringify(b)),e=d.length,f=Math.floor(e/6e4),g=(e%6e4/1e3).toFixed(0),h="PT"+f+"M"+(10>g?"0":"")+g+"S",i='"@context": "https://schema.org",\n"@type": "VideoObject",\n"name": "'+d.name+'",\n"description": "'+d.description+'",\n"thumbnailUrl": "'+d.thumbnail+'",\n"uploadDate": "'+d.publishedDate+'",\n"duration": "'+h+'",\n"publisher": \n 	{\n	"@type": "Organization",\n	"name": "Morgan Stanley",\n	"logo": \n		{ \n		"@type": "ImageObject",\n		"@url": "https://www.morganstanley.com/etc/designs/msdotcom/image/mstile-310x310.png",\n		"width": 310,\n		"height": 310 \n 		}\n	},\n"embedUrl": "http://players.brightcove.net/644391012001/5xC7AvkxM_default/index.html?videoId='+a+'",\n"transcript": "'+$(".long-video-transcript_"+a).text()+'"';$(".long-video-id_"+a).text("{ \n"+i+" \n }")}})}function b(a){var b,c=window.location.href,d=c.split("/"),e="/"+d[3],f=window.location.origin,g="";g="auth"===d[3]||"pub"===d[3]?f+e+"/video.dynadata_brightcove_video_info-results.json?videoId="+a:f+"/video.dynadata_brightcove_video_info-results.json?videoId="+a,$.ajax({headers:{Accept:pk="BCpkADawqM3r0KvGIw4rs9HAekOj_Tbekd80mVyJKY1Nb33Wv6n1XYYlJNx5yPbqm2VOS41Tu0RcWm1YgQ-VoqHH0b4OWjGYlOOhm7-uJVDx79VGDBYlWGcsjbs"},contentType:"application/json",url:g,async:!1,dataType:"json",success:function(c){b=c;var d=JSON.parse(JSON.stringify(b)),e=d.length,f=Math.floor(e/6e4),g=(e%6e4/1e3).toFixed(0),h="PT"+f+"M"+(10>g?"0":"")+g+"S",i='"@context": "https://schema.org",\n"@type": "VideoObject",\n"name": "'+d.name+'",\n"description": "'+d.description+'",\n"thumbnailUrl": "'+d.thumbnail+'",\n"uploadDate": "'+d.publishedDate+'",\n"duration": "'+h+'",\n"publisher": \n 	{\n	"@type": "Organization",\n	"name": "Morgan Stanley",\n	"logo": \n		{ \n		"@type": "ImageObject",\n		"@url": "https://www.morganstanley.com/etc/designs/msdotcom/image/mstile-310x310.png",\n		"width": 310,\n		"height": 310 \n 		}\n	},\n"embedUrl": "http://players.brightcove.net/644391012001/5xC7AvkxM_default/index.html?videoId='+a+'",\n"transcript": "'+$(".short-video-transcript_"+a).text()+'"';$(".short-video-id_"+a).text("{ \n"+i+" \n }")}})}function c(a){var b,c=window.location.href,e=c.split("/"),f="/"+e[3],g=window.location.origin,h="";h="auth"===e[3]||"pub"===e[3]?g+f+"/video.dynadata_brightcove_video_info-results.json?videoId="+a:g+"/video.dynadata_brightcove_video_info-results.json?videoId="+a;var i=encodeURI(h);$.ajax({headers:{Accept:pk="BCpkADawqM3r0KvGIw4rs9HAekOj_Tbekd80mVyJKY1Nb33Wv6n1XYYlJNx5yPbqm2VOS41Tu0RcWm1YgQ-VoqHH0b4OWjGYlOOhm7-uJVDx79VGDBYlWGcsjbs"},contentType:"application/json",url:i,async:!1,dataType:"json",success:function(c){b=c,d(b,a)}})}function d(a,b){var c=JSON.parse(JSON.stringify(a)),d=c.length,e=Math.floor(d/6e4),f=(d%6e4/1e3).toFixed(0),g="T"+e+"M"+(10>f?"0":"")+f+"S",h='"@context": "https://schema.org",\n"@type": "AudioObject",\n"contentUrl": "https://players.brightcove.net/644391012001/txURfH068_default/index.html?videoId='+b+'",\n"description": "'+c.description+'",\n"duration": "'+g+'",\n"encodingFormat": "audio/mpeg",\n"name": "'+c.name+'",\n"transcript": "'+$(".podcast_transcript_"+b).text()+'"';$(".podcast-video_"+b).text("{ \n"+h+" \n }")}var e=$(".artPod_contain").attr("data-video-id"),f=$(".video-meta").attr("data-video-id"),g=$(".video-js").attr("short-videoid");null!=e&&""!=e&&void 0!=e?c(e):null!=f&&""!=f&&void 0!=f&&a(f),null!=g&&""!=g&&void 0!=g&&b(g);var h=!0;$(".togglePlay").on("click",function(){0==h?(videojs.players.myPlayerID.play(),$(this).find("span").addClass("pause-video"),$(this).find("span").removeClass("play-video"),$(this).attr("aria-label","Pause"),h=!0):(videojs.players.myPlayerID.pause(),$(this).find("span").addClass("play-video"),$(this).find("span").removeClass("pause-video"),$(this).attr("aria-label","Play"),h=!1)});var i;$(".icon-play-link, .hero-image").click(function(){i=$(this),i.hasClass("podcast")||setTimeout(function(){$(".vjs-play-control").focus(),$(".vjs-fullscreen-control").on("keydown",function(a){var b=a.keyCode||a.which;9!=b||a.shiftKey||(a.preventDefault(),$(".closeBtn").focus()),9==b&&a.shiftKey&&(a.preventDefault(),$(".vjs-picture-in-picture-control").focus())}),$(".closeBtn").on("keydown",function(a){var b=a.keyCode||a.which;9==b&&a.shiftKey&&(a.preventDefault(),$(".vjs-fullscreen-control").focus()),(13==b||27==a.keyCode)&&($(".closeBtn").click(),i.focus())}),$(".modal, .vjs-play-control, .vjs-mute-control, .vjs-volume-bar, .vjs-progress-holder, .vjs-share-control, .vjs-subs-caps-button,.vjs-picture-in-picture-control,.vjs-fullscreen-control").on("keydown",function(a){var b=a.keyCode||a.which;27===b&&(a.preventDefault(),i.focus())})},2e3)})});