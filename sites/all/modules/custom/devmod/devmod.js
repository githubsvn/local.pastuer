/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);


(function($){ 
		$(document).ready(function() {
		try{
			message = $("#messages"); 
			if(message.html() && message.hasClass('hidden')) {
				if($(".messages").length){
					$("#messages h2").remove();
					$("#divShowError").html($("#messages").html());
					$("#comment-form").before($("#messages .messages"));
				}
				
			}
			}catch(e){}
			
			// loading
			var TheHub = TheHub || {};
			TheHub.loading = (function(){
				var loading = $('<div class="loading-wrapper"><div class="ajax-loading"><a class="close hidden"></a></div></div>').css({
					top: -1000,
					left: -1000,
					width: 35,
					height: 35,
					opacity: 0.5,
					position: 'fixed',
					background: 'white'
				}).appendTo(document.body);
				return function(options){
					if(options == 'close'){
						loading.find('.close').trigger('click');
					}
					else{
						loading.showPopup({
							zIndex: 100,
							overlayOpacity: 0,
							popupOpacity: 0.5,
							overlay: false,
							overlayDuration: 100,
							popupDuration: 100
						});
					}
				}
			})();
			
			// scrollBar
			$.fn.scrollBar = function(options){
				var defaults = {
					scrollContent: '.content',
					scroller: '.scroller',
					upBtn: '.upBtn',
					downBtn: '.downBtn',
					intervalTime: 30,
					scrollStep: 5
				};
				options = $.extend(defaults, options); 		
					
				return this.each(function(){
					var that = $(this);
					that.vars = {
						scrollContent: that.find(options.scrollContent),
						dragger: that.find(options.scroller),
						upBtn: that.find(options.upBtn),
						downBtn: that.find(options.downBtn),
						nameSpace: parseInt(Math.random() * 1000).toString(),
						isDragging: false,
						interval: null,
						maxOffsetY: 0,
						maxContentTop: 0,
						draggerTop: 0,
						mouseY: 0,
						curTop: 0
					};
					
					initScroll(that);
					initEvent(that);
					
				});
				
				function initScroll(that){
					if(that.vars.scrollContent.height() <= that.height()){
						that.vars.dragger.css('visibility', 'hidden');
						return;
					}else{
						that.vars.dragger.css({
							top: 0//,
							//height: parseInt(that.innerHeight() / that.vars.scrollContent.height() * that.vars.dragger.parent().innerHeight())
						});
					}
					that.vars.maxContentTop = -that.vars.scrollContent.parent().height() + that.vars.scrollContent.height();
					that.vars.maxOffsetY = that.vars.dragger.parent().innerHeight() - that.vars.dragger.height();
				}
				
				function initEvent(that){
					that.vars.dragger.unbind('mousedown.s').bind('mousedown.s', function(e){
						e.preventDefault();
						that.vars.isDragging = true;
						that.vars.mouseY = e.pageY;
						that.vars.draggerTop = that.vars.curTop;
						scrollStart(that);
					});
					
					that.unbind('mouseenter.s').bind('mouseenter.s', function(){
						$(document).data('curScrollBox', that);
					}).unbind('mouseleave.s').bind('mouseleave.s', function(){
						$(document).data('curScrollBox', null);
					});
					
					$(document).unbind('mouseup.s' + that.vars.nameSpace).bind('mouseup.s' + that.vars.nameSpace, function(){
						scrollEnd(that);
					}).unbind('keydown.s').bind('keydown.s', function(e){
						if(!$(this).data('curScrollBox')){
							return;
						}
						if(e.which == 38 && $(this).data('curScrollBox').vars.curTop != 0){
							e.preventDefault();
							$(this).data('curScrollBox').vars.upBtn.trigger('click.s');
						}
						if(e.which == 40 && $(this).data('curScrollBox').vars.curTop != $(this).data('curScrollBox').vars.maxOffsetY){
							e.preventDefault();
							$(this).data('curScrollBox').vars.downBtn.trigger('click.s');
						}
					});
					
					that.vars.upBtn.unbind('click.s').bind('click.s', function(e){
						e.preventDefault();
						clickScroll(-1, that);
					}).unbind('mousedown.s').bind('mousedown.s', function(e){
						e.preventDefault();
						holdScroll(-1, 500, that);
					}).unbind('mouseup.s mouseout.s').bind('mouseup.s mouseout.s', function(){
						endHoldScroll(that);
					});
					
					that.vars.downBtn.unbind('click.s').bind('click.s', function(e){
						e.preventDefault();
						clickScroll(1, that);
					}).unbind('mousedown.s').bind('mousedown.s', function(e){
						e.preventDefault();
						holdScroll(1, 500, that);
					}).unbind('mouseup.s mouseout.s').bind('mouseup.s mouseout.s', function(){
						endHoldScroll(that);
					});
					
					that.unbind('mousewheel.s').bind('mousewheel.s', function(e, delta, deltaX, deltaY) {
						if(delta < 0 && that.vars.curTop != that.vars.maxOffsetY){
							e.preventDefault();
							that.vars.downBtn.trigger('click.s');
						}
						if(delta > 0 && that.vars.curTop != 0){
							e.preventDefault();
							that.vars.upBtn.trigger('click.s');
						}
					});
				}
				
				function scroll(offsetY, that){
					offsetY = (offsetY < 0)?0:(offsetY > that.vars.maxOffsetY)?that.vars.maxOffsetY:offsetY;
					that.vars.curTop = offsetY;
					that.vars.dragger.css('top', offsetY);
					that.vars.scrollContent.css('margin-top', -parseInt(offsetY * that.vars.maxContentTop / that.vars.maxOffsetY));
					return offsetY;
				}
				
				function holdScroll(direction, delay, that){
					that.vars.hold = true;
					scroll(that.vars.curTop + direction * options.scrollStep, that);
					that.vars.interval = setTimeout(function(){
						holdScroll(direction, 0, that);
					}, options.intervalTime + delay);
				}
				
				function clickScroll(direction, that){
					if(that.vars.hold){
						return;
					}
					scroll(that.vars.curTop + direction * options.scrollStep, that);
				}
				
				function endHoldScroll(that){
					clearTimeout(that.vars.interval);
					setTimeout(function(){
						that.vars.hold = false;
					}, 1);
				}
				
				function scrollStart(that){
					$(document).unbind('mousemove.s' + that.vars.nameSpace).bind('mousemove.s' + that.vars.nameSpace, function(e){
						e.preventDefault();
						if(that.vars.isDragging){
							var offsetY = that.vars.draggerTop + e.pageY - that.vars.mouseY;
							scroll(offsetY, that);
						}
					});
				}
				
				function scrollEnd(that){
					that.vars.isDragging = false;
					that.vars.draggerTop = parseInt(that.vars.dragger.css('top'));
					clearInterval(that.vars.interval);
					$(document).unbind('mousemove.s');
				}
			};
			
			// showPopup			
			$.fn.showPopup = function(options){
				var defaults = {
					overlay: true,
					overlayOpacity: 0.3,
					overlayDuration: 300,
					clickToClose: false,
					background: 'black',
					widthFix: null,
					
					popupOpacity: 1,
					popupDuration: 500,
					zIndex: 9,
					autoClose: false,
					timeToClose: 2000,
					position: 'center',
					offset: null,
					closeBtn: '.close',
					
					confirm: true,
					confirmBtn: '.accept',
					cancelBtn: '.cancel',
					scrollToTop: false,
					scrollToBottom: false,
					
					beforeShow: null,
					afterShow: null,
					beforeHide: null,
					afterHide: null,
					beforeConfirm: null,
					afterConfirm: null,
					beforeCancel: null,
					afterCancel: null
				};
				options = $.extend(defaults, options);
				return this.each(function(){
					var that = $(this);
					var isiOS = (/iPad/i.test(navigator.userAgent)) || (/iPhone/i.test(navigator.userAgent));
					that.vars = {
						winHeight: ($(document.body).height()<$(window).height())?$(document.body).height():$(window).height(),
						winWidth: $(window).width(),
						scrollTop: $(window).scrollTop(),
						scrollLeft: $(window).scrollLeft(),
						popHeight: that.outerHeight(true),
						popWidth: (options.widthFix == null)?that.outerWidth(true):options.widthFix,
						rdNamespace: parseInt((Math.random() * 10000)).toString(),
						isiOS: isiOS
					};
					
					$(window).unbind('resize.pu' + that.vars.rdNamespace).bind('resize.pu' + that.vars.rdNamespace, function(){
						winResize(that);
					});
					$(window).unbind('scroll.pu' + that.vars.rdNamespace).bind('scroll.pu' + that.vars.rdNamespace, function(e){
						winScroll(that);
					});
					showUp(that);
					that.find(options.closeBtn).unbind('click.hide').bind('click.hide', function(e){
						e.preventDefault();
						hideDown(that);
					});
					if(options.autoClose){
						setTimeout(function(){
							hideDown(that);
						}, options.timeToClose);
					}
					if(options.clickToClose && options.overlay){
						that.vars.overlay.unbind('click.hide').bind('click.hide', function(){
							hideDown(that);
						});
					}
					if(options.confirm){
						if(options.confirmBtn){
							that.find(options.confirmBtn).unbind('click.conf').bind('click.conf', function(e){
								e.preventDefault();
								if(options.beforeConfirm){
									options.beforeConfirm();
								}
								hideDown(that);
								if(options.afterConfirm){
									options.afterConfirm();
								}
							});
						}
						if(options.cancelBtn){
							that.find(options.cancelBtn).unbind('click.cc').bind('click.cc', function(e){
								e.preventDefault();
								if(options.beforeCancel){
									options.beforeCancel();
								}
								hideDown(that);
								if(options.afterCancel){
									options.afterCancel();
								}
							});
						}
					}
					
				});
				function showUp(that){
					if(that.data('isShowing')){
						return;
					}
					var style = {
						position: 'fixed',
						display: 'block',
						zIndex: options.zIndex,
						opacity: 0
					};
					style = $.extend(style, updatePos(that)); 
					if($('body').outerHeight(true) < that.vars.popHeight){//ie ???
						style.top = 0;
						that.vars.tempElem = $('<div>anchor</div>').css({
							position: 'absolute',
							top: that.vars.popHeight,
							visibility: 'hidden'
						}).appendTo('body');
					}
					that.css(style);
					
					if(that.offset().top < 0){
						that.css('top', '0');
					}
					if(that.offset().top + that.vars.popHeight > $('body').height()){//ie ???
						that.css('top', that.vars.winHeight - that.vars.popHeight);
					}
					if(options.scrollToTop && that.vars.winHeight < that.vars.popHeight){
						that.vars.curTop = that.vars.scrollTop;
						$(window).scrollTop(that.vars.scrollTop + (that.vars.winHeight - that.vars.popHeight));
					}
					if(options.scrollToBottom && that.vars.winHeight < that.vars.popHeight){
						that.vars.curTop = that.vars.scrollTop;
						$(window).scrollTop(that.vars.scrollTop - (that.vars.winHeight - that.vars.popHeight));
						
					}
					if(options.overlay){
						var overlay = $('<div></div>').css({
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							opacity: 0,
							background: options.background,
							zIndex: options.zIndex - 1
						}).appendTo($('body'));
						if(that.vars.isiOS){
							overlay.css('height', $(document.body).height());
						}
						that.vars.overlay = overlay;
					}
					
					if(options.beforeShow){
						options.beforeShow();
					}
					if(options.overlay){
						that.vars.overlay.animate({
							opacity: options.overlayOpacity
						}, options.overlayDuration);
					}
					that.animate({
						opacity: options.popupOpacity
					}, options.popupDuration, function(){
						if(options.afterShow){
							options.afterShow();
						}
					});
					
					that.data('isShowing', true);
				};
				function hideDown(that){
					if(options.beforeHide){
						options.beforeHide();
					}
					that.animate({
						opacity: 0
					}, options.popupDuration, function(){
						that.css({
							top: -10000,
							left: -10000
						});
						if(options.afterHide){
							options.afterHide();
						}
					});
					if(options.overlay){
						that.vars.overlay.animate({
							opacity: 0
						}, options.overlayDuration, function(){
							$(this).remove();
						});
					}
					that.data('isShowing', false);
					if(that.vars.tempElem){
						that.vars.tempElem.remove();
					}
					if((options.scrollToTop || options.scrollToBottom) && that.vars.winHeight < that.vars.popHeight){
						$(window).scrollTop(that.vars.curTop);
					}
					$(window).unbind('scroll.pu' + that.vars.rdNamespace).unbind('resize.pu' + that.vars.rdNamespace);
				};
				function updatePos(that){
					var style = {
						left: (that.vars.winWidth - that.vars.popWidth) / 2,
						top: (that.vars.winHeight - that.vars.popHeight) / 2
					};
					that.data('curTop', that.vars.scrollTop);
					that.data('curWinHeight', that.vars.winHeight);
					return style;
				};
				function winResize(that){
					if(!that.vars.isiOS){
						that.vars.winHeight = $(window).height();
					}
					that.vars.winWidth = $(window).width();
					that.vars.scrollTop = $(window).scrollTop();
					that.vars.scrollLeft = $(window).scrollLeft();
					if(that.vars.winHeight < that.data('curWinHeight')){
						if(that.offset().top > 0){
							that.css(updatePos(that));
						}
					}else{
						if(that.vars.winHeight < that.vars.popHeight){
							if(that.offset().top <= that.vars.scrollTop){
							}
							if(that.offset().top + that.vars.popHeight < that.vars.scrollTop + that.vars.winHeight){
								that.css('top', parseInt(that.css('top')) + that.vars.winHeight - that.data('curWinHeight'));
							}
						}else{
							that.css(updatePos(that));
						}
					}
					that.data('curWinHeight', that.vars.winHeight);
				};
				function winScroll(that){
					that.vars.scrollTop = $(window).scrollTop();
					that.vars.scrollLeft = $(window).scrollLeft();
					if(that.vars.winHeight > that.vars.popHeight){
						return;
					}
					if(that.vars.scrollTop > that.data('curTop')){
						that.css({
							top: Math.max(parseInt(that.css('top')) - (-that.data('curTop') + that.vars.scrollTop), that.vars.winHeight - that.vars.popHeight)
						});
					}
					if(that.vars.scrollTop < that.data('curTop')){
						that.css({
							top: Math.min(parseInt(that.css('top')) + (that.data('curTop') - that.vars.scrollTop), 0)
						});
					}
					
					that.data('curTop', that.vars.scrollTop);
				};
			};	
			
			// viewAllTags
			$.fn.showAllTags = function(options){
				var tempPopup = '<div style="position: static;"id="popup-all-tags"class="popup"><div class="popup-wrapper width-popup-02"><span class="rnd top-left">&nbsp;</span><span class="rnd top-right">&nbsp;</span><span class="rnd bottom-left">&nbsp;</span><span class="rnd bottom-right">&nbsp;</span><span class="rnd top">&nbsp;</span><span class="rnd left">&nbsp;</span><span class="rnd right">&nbsp;</span><span class="rnd bottom">&nbsp;</span><a title="Close"class="btn-close"href="javascript:;"></a><div class="popup-inner"><h2 class="title-01">Talks tags</h2><div class="scroll-container"><div class="scroll-cont"style="margin-top: 0px;"><ul class="tags-lst"><li><dl><dt>A</dt><dd><a title="Aliquet lauda ntiaem (46)"href="#">Aliquet lauda ntiaem(46)</a></dd><dd><a title="Aperiaipsa quaeab (9)"href="#">Aperiaipsa quaeab(9)</a></dd><dd><a title="Aliquet lauda (60)"href="#">Aliquet lauda(60)</a></dd><dd><a title="Aem (21))"href="#">Aem(21)</a></dd><dd><a title="Aperiaipsa quaeab (9)"href="#">Aperiaipsa quaeab(9)</a></dd><dd><a title="Aliquet lauda (60)"href="#">Aliquet lauda(60)</a></dd><dd><a title="Aem (21))"href="#">Aem(21)</a></dd><dd><a title="Aperiaipsa quaeab (9)"href="#">Aperiaipsa quaeab(9)</a></dd><dd><a title="Aliquet lauda (60)"href="#">Aliquet lauda(60)</a></dd><dd><a title="Aem (21))"href="#">Aem(21)</a></dd><dd><a title="Aperiaipsa quaeab (9)"href="#">Aperiaipsa quaeab(9)</a></dd><dd><a title="Aliquet lauda (60)"href="#">Aliquet lauda(60)</a></dd><dd><a title="Aem (21))"href="#">Aem(21)</a></dd><dd><a title="Aperiaipsa quaeab (9)"href="#">Aperiaipsa quaeab(9)</a></dd><dd><a title="Aliquet lauda (60)"href="#">Aliquet lauda(60)</a></dd><dd><a title="Aem (21))"href="#">Aem(21)</a></dd><dd><a title="Aperiaipsa quaeab (9)"href="#">Aperiaipsa quaeab(9)</a></dd><dd><a title="Aliquet lauda (60)"href="#">Aliquet lauda(60)</a></dd><dd><a title="Aem (21))"href="#">Aem(21)</a></dd><dd><a title="Aperiaipsa quaeab (9)"href="#">Aperiaipsa quaeab(9)</a></dd><dd><a title="Aliquet lauda (60)"href="#">Aliquet lauda(60)</a></dd><dd><a title="Aem (21))"href="#">Aem(21)</a></dd><dd><a title="Aperiaipsa quaeab (9)"href="#">Aperiaipsa quaeab(9)</a></dd><dd><a title="Aliquet lauda (60)"href="#">Aliquet lauda(60)</a></dd><dd><a title="Aem (21))"href="#">Aem(21)</a></dd></dl></li><li><dl><dt>B</dt><dd><a title="Bquet lauda ntiaem (46)"href="#">Bquet lauda ntiaem(46)</a></dd><dd><a title="Briaipsa quaeab (9)"href="#">Briaipsa quaeab(9)</a></dd><dd><a title="Bquet (56)"href="#">Bquet(56)</a></dd><dd><a title="Bquet lauda ntiaem (46)"href="#">Bquet lauda ntiaem(46)</a></dd><dd><a title="Briaipsa quaeab (9)"href="#">Briaipsa quaeab(9)</a></dd><dd><a title="Bquet (56)"href="#">Bquet(56)</a></dd><dd><a title="Bquet lauda ntiaem (46)"href="#">Bquet lauda ntiaem(46)</a></dd><dd><a title="Briaipsa quaeab (9)"href="#">Briaipsa quaeab(9)</a></dd><dd><a title="Bquet (56)"href="#">Bquet(56)</a></dd></dl><dl><dt>C</dt><dd><a title="Cquet lauda ntiaem (46)"href="#">Cquet lauda ntiaem(46)</a></dd><dd><a title="Criaipsa quaeab (9)"href="#">Criaipsa quaeab(9)</a></dd><dd><a title="Cquet (56)"href="#">Cquet(56)</a></dd><dd><a title="Cquet lauda ntiaem (46)"href="#">Cquet lauda ntiaem(46)</a></dd><dd><a title="Criaipsa quaeab (9)"href="#">Criaipsa quaeab(9)</a></dd><dd><a title="Cquet (56)"href="#">Cquet(56)</a></dd><dd><a title="Cquet lauda ntiaem (46)"href="#">Cquet lauda ntiaem(46)</a></dd><dd><a title="Criaipsa quaeab (9)"href="#">Criaipsa quaeab(9)</a></dd><dd><a title="Cquet (56)"href="#">Cquet(56)</a></dd><dd><a title="Cquet lauda ntiaem (46)"href="#">Cquet lauda ntiaem(46)</a></dd><dd><a title="Criaipsa quaeab (9)"href="#">Criaipsa quaeab(9)</a></dd><dd><a title="Cquet (56)"href="#">Cquet(56)</a></dd><dd><a title="Cquet lauda ntiaem (46)"href="#">Cquet lauda ntiaem(46)</a></dd><dd><a title="Criaipsa quaeab (9)"href="#">Criaipsa quaeab(9)</a></dd><dd><a title="Cquet (56)"href="#">Cquet(56)</a></dd></dl><dl><dt>D</dt><dd><a title="Djfdsaldlfldsfs"href="#">Djfdsaldlfldsfs</a></dd><dd><a title="D  dk fdkfdj kfksjfs"href="#">D dk fdkfdj kfksjfs</a></dd></dl></li><li><dl><dt>G</dt><dd><a title="Guet lauda ntiaem (46)"href="#">Guet lauda ntiaem(46)</a></dd><dd><a title="Guaeab (12)"href="#">Guaeab(12)</a></dd></dl><dl><dt>H</dt><dd><a title="Hquet lauda ntiaem (46)"href="#">Hquet lauda ntiaem(46)</a></dd><dd><a title="Huet lauda (60)"href="#">Huet lauda(60)</a></dd><dd><a title="Hquet lauda ntiaem (46)"href="#">Hquet lauda ntiaem(46)</a></dd><dd><a title="Huet lauda (60)"href="#">Huet lauda(60)</a></dd><dd><a title="Hquet lauda ntiaem (46)"href="#">Hquet lauda ntiaem(46)</a></dd><dd><a title="Huet lauda (60)"href="#">Huet lauda(60)</a></dd><dd><a title="Hquet lauda ntiaem (46)"href="#">Hquet lauda ntiaem(46)</a></dd><dd><a title="Huet lauda (60)"href="#">Huet lauda(60)</a></dd><dd><a title="Hquet lauda ntiaem (46)"href="#">Hquet lauda ntiaem(46)</a></dd><dd><a title="Huet lauda (60)"href="#">Huet lauda(60)</a></dd><dd><a title="Hquet lauda ntiaem (46)"href="#">Hquet lauda ntiaem(46)</a></dd><dd><a title="Huet lauda (60)"href="#">Huet lauda(60)</a></dd><dd><a title="Hquet lauda ntiaem (46)"href="#">Hquet lauda ntiaem(46)</a></dd><dd><a title="Huet lauda (60)"href="#">Huet lauda(60)</a></dd><dd><a title="Hquet lauda ntiaem (46)"href="#">Hquet lauda ntiaem(46)</a></dd><dd><a title="Huet lauda (60)"href="#">Huet lauda(60)</a></dd></dl></li><li><dl><dt>I</dt><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd><dd><a title="I quet lauda ntiaem (46)"href="#">I quet lauda ntiaem(46)</a></dd><dd><a title="Iriaipsa quaeab (9)"href="#">Iriaipsa quaeab(9)</a></dd></dl></li><li><dl><dt>P</dt><dd><a title="Puet lauda ntiaem (46)"href="#">Puet lauda ntiaem(46)</a></dd><dd><a title="Priaipsa quaeab (9)"href="#">Priaipsa quaeab(9)</a></dd><dd><a title="Puet lauda ntiaem (46)"href="#">Puet lauda ntiaem(46)</a></dd><dd><a title="Priaipsa quaeab (9)"href="#">Priaipsa quaeab(9)</a></dd><dd><a title="Puet lauda ntiaem (46)"href="#">Puet lauda ntiaem(46)</a></dd><dd><a title="Priaipsa quaeab (9)"href="#">Priaipsa quaeab(9)</a></dd><dd><a title="Puet lauda ntiaem (46)"href="#">Puet lauda ntiaem(46)</a></dd><dd><a title="Priaipsa quaeab (9)"href="#">Priaipsa quaeab(9)</a></dd><dd><a title="Puet lauda ntiaem (46)"href="#">Puet lauda ntiaem(46)</a></dd><dd><a title="Priaipsa quaeab (9)"href="#">Priaipsa quaeab(9)</a></dd><dd><a title="Puet lauda ntiaem (46)"href="#">Puet lauda ntiaem(46)</a></dd><dd><a title="Priaipsa quaeab (9)"href="#">Priaipsa quaeab(9)</a></dd><dd><a title="Puet lauda ntiaem (46)"href="#">Puet lauda ntiaem(46)</a></dd><dd><a title="Priaipsa quaeab (9)"href="#">Priaipsa quaeab(9)</a></dd><dd><a title="Puet lauda ntiaem (46)"href="#">Puet lauda ntiaem(46)</a></dd><dd><a title="Priaipsa quaeab (9)"href="#">Priaipsa quaeab(9)</a></dd><dd><a title="Puet lauda ntiaem (46)"href="#">Puet lauda ntiaem(46)</a></dd><dd><a title="Priaipsa quaeab (9)"href="#">Priaipsa quaeab(9)</a></dd><dd><a title="Puet lauda ntiaem (46)"href="#">Puet lauda ntiaem(46)</a></dd><dd><a title="Priaipsa quaeab (9)"href="#">Priaipsa quaeab(9)</a></dd><dd><a title="Puet lauda ntiaem (46)"href="#">Puet lauda ntiaem(46)</a></dd><dd><a title="Priaipsa quaeab (9)"href="#">Priaipsa quaeab(9)</a></dd></dl></li></ul></div><div class="scroll-bar"><span id="btn-up">Up</span><span id="scroller"style="top: 362px;">&nbsp;</span><span id="btn-down">Down</span></div></div></div></div></div>';
				var popup = $(tempPopup).appendTo(document.body).css({
					position: 'absolute',
					left: '-10000px',
					top: '-10000px'
				});
				return this.each(function(){
					var that = $(this),
					viewAllTags = that.find('showpopup'),
					editFieldTagsUnd = that.find('#edit-field-tags-und');
					if(that.closest('#sidebar.disable').length){
						return;
					}
					// if(TheHub.isiOS){
						// popup.find('#scroller').remove();
						// var scrollbar = new iScroll(popup.find('.scroll-container')[0], {fadeScrollbar: true, hideScrollbar: false, scrollbarClass:'scroll-ios-'});
					// }
					//else{
						popup.find('.scroll-container').scrollBar({
							scrollContent: '.scroll-cont',
							scroller: '#scroller',
							upBtn: '#btn-up',
							downBtn: '#btn-down',
							scrollStep: 10
						});
					//}
					that.find('a').unbind('click.show').bind('click.show', function(e){
						var $this = $(this);
						e.preventDefault();
						$.ajax({
							url: $this.attr('rel'),
							beforeSend: function(){
								TheHub.loading();
							},
							success: function(res){
								TheHub.loading('close');
								popup.find('.popup-inner').replaceWith($(res));
								var checkbox = popup.find('.popup-inner').find(':checkbox');
								checkbox.each(function(){
									var val = $(this).val(),
									checked = false;
									editFieldTagsUnd.children().each(function(){
										if(val == $(this).val() && $(this).is(':selected')){
											checked = true;
											return false;
										}
									});
									if(checked){
										$(this).attr('checked', true);
									}
								});
								checkbox.unbind('click.checked').bind('click.checked', function(){
									var value = $(this).val(),
									checked = $(this).is(':checked');
									editFieldTagsUnd.children().each(function(){
										if(value == $(this).val()){
											$(this).attr('selected', checked);
											return false;
										}
									});
								});
								// if(TheHub.isiOS){
									// popup.find('#scroller').remove();
									// var scrollbar = new iScroll(popup.find('.scroll-container')[0], {fadeScrollbar: true, hideScrollbar: false, scrollbarClass:'scroll-ios-'});
								// }
								// else{
									popup.find('.scroll-container').scrollBar({
										scrollContent: '.scroll-cont',
										scroller: '#scroller',
										upBtn: '#btn-up',
										downBtn: '#btn-down',
										scrollStep: 10
									});
								//}
								popup.showPopup({
									closeBtn: '.btn-close',
									zIndex: 20
								});
							}
						});
						
					});
				});
			};		
			$('#edit-field-tags').length && $('#edit-field-tags').showAllTags();
		});
})(jQuery);