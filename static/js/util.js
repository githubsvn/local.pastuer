/**
 * @class: Util
 * @description: Defines Util functions
 * @author: len.nguyenvan
 * @version: 1.0
 **/

 ;(function($, window, undefined){
	var pluginName = 'smSlider';
	function Plugin(element, options){
		this.element = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.control = options.control;
		this.desLayer = options.desLayer;
		this.imageWidth = options.imageSize[0];
		this.autoScroll = options.autoScroll;
		this.timeScroll = options.timeScroll;
		this.init();
	};
	
	Plugin.prototype = {
		init: function(){
			var control = this.control;
			var slider = this.element;
			var len = slider.children().length;
			if(len < 2) return;
			var w = this.imageWidth;
			var des = this.desLayer;
			var current = 0;
			var rate = 0;
			var temp =0;
			var time = 900;
			var notAnimate = true;
			var desc = this.desLayer.find('.decription-inner p').css({display:'none'});
			var timeScroll = this.timeScroll;
			var autoScroll = this.autoScroll;
			var timer;
			var dir = 1;

			control.find('li').detach();
			slider.css({width: w * len});
			slider.find('li').each(function(){
				control.append('<li><img src="images/transparent.png" alt="Image" class="ui-icon init-icon-4" /></li>');
			});


			desc.eq(current).css({display:'block'});
			control.children().eq(current).addClass('current');

			control.find('li').each(function(i){
				$(this).click(function(){
					if(i!=current && notAnimate){
						clearTimeout(timer);
						notAnimate = false;
						i == len - 1 && (dir = -1);
						i == 0 && (dir = 1);
						rate = current - i;
						des.stop().animate({
							'margin-left': '-300px'
						}, 250 ,function(){
							slider.stop().animate({
								'margin-left': '+=' + w * rate + 'px'
							}, time * (Math.abs(rate) > 2? 2: Math.abs(rate)), function(){
								des.stop().animate({
									'margin-left': '0px'
								}, 250, function(){
									notAnimate = true;
									autoScroll && nextTimer();
								});
							});
						});
						desc.eq(current).css({display:'none'});
						desc.eq(i).css({display:'block'});
						control.children().eq(current).removeClass('current');
						control.children().eq(i).addClass('current');
						current = i;
					}
				});
			});
			function nextTimer(){
				clearTimeout(timer);
				timer = setTimeout(function(){
					if(notAnimate){
						notAnimate = false;
						temp = current + dir;
						temp == len - 1 && (dir = -1);
						temp == 0 && (dir = 1);
						rate = current - temp;
						des.stop().animate({
							'margin-left': '-300px'
						}, 250 ,function(){
							slider.stop().animate({
								'margin-left': '+=' + w * rate + 'px'
							}, time * (Math.abs(rate) > 2? 2: Math.abs(rate)), function(){
								des.stop().animate({
									'margin-left': '0px'
								}, 250, function(){
									notAnimate = true;
									nextTimer();
								});
							});
						});
						desc.eq(current).css({display:'none'});
						desc.eq(temp).css({display:'block'});
						control.children().eq(current).removeClass('current');
						control.children().eq(temp).addClass('current');
						current = temp;	
					}
				}, timeScroll);
			};
			this.autoScroll && nextTimer();
		},
		destroy: function(){
			
		}
	};
	
	$.fn[pluginName] = function(options, params){
		return this.each(function(){
			var instance = $.data(this, pluginName);
			if (!instance) {
				$.data(this, pluginName, new Plugin(this, options));
			} else if (instance[options]) {
				instance[options](params);
			} else {
				console && console.warn('This method does not exists in ' + pluginName);
			}
		});
	};
	
	$.fn[pluginName].defaults = {
		
	};
}(jQuery, window));
 
/**
 * @name smPlugin
 * @description description
 * @version 1.0
 * @options
 *		option
 * @events
 *		event
 * @methods
 *		init
 *		publicMethod
 *		destroy
 */
;(function($, window, undefined){
	var pluginName = 'smSelect';
	
	function getPosition(){
		return {
			top: this.offset().top,
			left: this.offset().left,
			width: this.width(),
			outerWidth: this.outerWidth(true),
			height: this.height(),
			outerHeight: this.outerHeight(true)
		};
	}

	function createlistDL(){
		var that = this,
			customDL = null,
			originDLName = that.originDL.attr('name');
		if(!$('#' + originDLName + '-list').length){
			customDL = '<ul>';
			$('option', that.originDL).each(function(){
				customDL += '<li value="' + $(this).attr('value') + '"><a href="#" title="">' + $(this).text() + '</a></li>';
			});
			customDL += '</ul>';					
			that.listDL = $(customDL).appendTo(document.body).attr('id', originDLName + '-list');					
		}
		else{
			that.listDL = $('#' + originDLName + '-list');						
		}
		that.listDL.addClass(that.options.initClass);
	}
	
	function Plugin(element, options){
		this.originDL = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.init();
	};
	
	Plugin.prototype = {
		init: function(){
			var that = this,
				timeout = 500,
				hoverIndex = null,
				outputSelector = that.options.outputSelector,
				optionLabel = that.options.optionLabel,
				triggerSelector = that.options.triggerSelector,
				enable = that.options.enable,
				hoverClass = that.options.hoverClass,
				index = that.options.index,
				useDefaultDropdown = that.options.useDefaultDropdown,
				originDLName = that.originDL.attr('name'),
				autoCompleteArray = [],
				matchArray = [],
				count = 0;
			that.triggerDL = triggerSelector;
			that.outputDL = outputSelector;
			that.enable(enable);
			createlistDL.call(that);
			$(window)
				.off('resize.smSelect' + originDLName)
				.on('resize.smSelect' + originDLName, function(){
					that.reposition.call(that);
				});
			if(that.enableToggle){
				if((index == 0) && optionLabel){
					outputSelector.is('input') && outputSelector.val(optionLabel);
					!outputSelector.is('input') && outputSelector.text(optionLabel);
					that.originDL.prop('selectedIndex', 1);
				}
				else{
					that.select(index);
				}				
			}			
			if(!useDefaultDropdown){
				that.originDL.css('display', 'none');
				that.listDL
					.css({
						'position': 'absolute',
						'z-index': 171985,
						'max-height': that.options.height,
						'overflow': 'auto',
						'display': 'none'
					})				
					.off('click.smSelect hover', 'li')
					.on({
						'click.smSelect': function(evt){
							if(that.enableToggle){
								that.select($('li', that.listDL).index(this));
								evt.preventDefault();
							}						
						},
						'hover': function(evt){
							if(evt.type == 'mouseenter'){
								$(this).addClass(hoverClass);
							}
							if(evt.type == 'mouseleave'){
								$(this).removeClass(hoverClass);
							}							
						}
					}, 'li')
					.off('mouseenter.smSelect mouseleave.smSelect')
					.on({
						'mouseenter.smSelect': function(){
							clearTimeout(that.timeout);
						},
						'mouseleave.smSelect': function(){
							clearTimeout(that.timeout);
							that.timeout = setTimeout(function(){
								that.enableToggle && that.opened && that.close();
							}, timeout);
						}						
					});				
				that.triggerDL
					.off('click.smSelect mouseenter.smSelect mouseleave.smSelect')
					.on({
						'click.smSelect': function(){
							that.listDL.is(":hidden") ? that.open() : that.close();
						},
						'mouseenter.smSelect': function(){
							clearTimeout(that.timeout);
						},
						'mouseleave.smSelect': function(){
							clearTimeout(that.timeout);
							that.timeout = setTimeout(function(){
								that.enableToggle && that.opened && that.close();
							}, timeout);
						}						
					});			
				$(document)
					.off('keydown.' + originDLName)
					.on('keydown.' + originDLName, function(evt){
						var minCount = null,
							maxCount = null,
							hoverClass = that.options.hoverClass,
							hoverIndex = $('li', that.listDL).index($('.' + hoverClass, that.listDL));						
						if(that.opened == true){
							if(evt.which == 38 || evt.which == 40){												
								minCount = 0;
								maxCount = $('li', that.listDL).length - 1;								
								if(evt.which == 38){
									(hoverIndex >= minCount) && hoverIndex--;
									(hoverIndex < minCount) && (hoverIndex = maxCount);
									if($('li', that.listDL).eq(hoverIndex).position().top <= $(that.listDL).scrollTop()){
										$(that.listDL).scrollTop($(that.listDL).scrollTop() - 8 * $('li', that.listDL).eq(hoverIndex).height());
									}						
									$('.' + hoverClass, that.listDL).removeClass(hoverClass);
									$('li', that.listDL).eq(hoverIndex).addClass(hoverClass);
								}
								if(evt.which == 40){
									(hoverIndex <= maxCount) && hoverIndex++;
									(hoverIndex > maxCount) && (hoverIndex = minCount);
									if($('li', that.listDL).eq(hoverIndex).position().top >= $(that.listDL).scrollTop() + that.listDL.height()){
										$(that.listDL).scrollTop($(that.listDL).scrollTop() + 8 * $('li', that.listDL).eq(hoverIndex).height());
									}
									$('.' + hoverClass, that.listDL).removeClass(hoverClass);
									$('li', that.listDL).eq(hoverIndex).addClass(hoverClass);
								}
								evt.preventDefault();
							}
							else if(evt.which == 13){
								that.select(hoverIndex);								
								evt.preventDefault();
							}
							else if(evt.which == 32){
								evt.preventDefault();
							}
							else{
								var autoComplete = String.fromCharCode(evt.which).toLowerCase();
								autoCompleteArray.push(autoComplete);
								clearTimeout(autoCompleteClear);
								var autoCompleteClear = setTimeout(function(){
									autoCompleteArray = [];
									matchArray = [];
								}, 2000);
								$.each($('li > a', that.listDL), function(index, value){
									var autoCompleteRegExp = new RegExp('^' + autoCompleteArray.join(''), 'gi');
									var filter = autoCompleteRegExp.exec($(this).text());
									if(filter){
										matchArray.push(this);
									}
								});
								var uniq = $.unique(matchArray);
								(count == $(uniq).length) && (count = 0);
								$('.' + hoverClass).removeClass(hoverClass);
								$(uniq).eq(count).closest('li').addClass(hoverClass);
								if($(uniq).eq(count).closest('li').hasClass(hoverClass)){									
									count++;									
								}
							}
						}
					});
			}
			else{
				that.triggerDL.off('.smSelect');
				that.listDL.css('display', 'none');
			}
			that.originDL
				.off('change.smSelect')
				.on('change.smSelect', function(){
					var outputSelector = that.options.outputSelector,
						change = that.options.onChange;
					if(that.enableToggle){
						outputSelector.is('input') && outputSelector.val(that.originDL.find('option:selected').text());
						!outputSelector.is('input') && outputSelector.text(that.originDL.find('option:selected').text());
						$.isFunction(change) && change.call(that);
					}						
				});
		},
		reposition: function(){
			var that = this,
				triggerDLInfo = getPosition.call(that.triggerDL),
				deltaTop = that.options.deltaTop,
				deltaLeft = that.options.deltaLeft,
				deltaWidth = that.options.deltaWidth;
			that.listDL
				.css({
					'top': triggerDLInfo.top + triggerDLInfo.outerHeight + deltaTop,
					'left': triggerDLInfo.left + deltaLeft,
                    'width': triggerDLInfo.outerWidth + deltaWidth
				});
		},
		refresh: function(htmlOption, htmlLi){
			var that = this,
				li = '';
			that.originDL.html(htmlOption);
			$('option', that.originDL).each(function(){
				li += htmlLi.replace('{title}', $(this).text());
			});
			that.listDL.html(li);
		},	
		enable: function(option){
			var that = this,
				disableClass = that.options.disableClass;	
			that.enableToggle = option;
			if(!that.enableToggle){
				that.triggerDL.addClass(disableClass);
			}
			else{
				that.triggerDL.removeClass(disableClass);
			}
		},		
		open: function(){
			var that = this,
				beforeOpen = that.options.onBeforeOpen,
				disableAnimation = that.options.disableAnimation,
				openDuration = that.options.openDuration,
				afterOpen = that.options.onAfterOpen,
				listDLTop = null,
				listDLHeight = null,
				triggerDLHeight = that.triggerDL.outerHeight(),
				windowHeight = $(window).height(),
				windowScrollTop = $(window).scrollTop();
				that.opened = true;
			that.reposition();
			if(that.enableToggle){
				$.isFunction(beforeOpen) && beforeOpen.call(that);
				if(!disableAnimation){
					that.listDL.slideDown(openDuration, function(){
						listDLTop = that.listDL.offset().top;
						listDLHeight = that.listDL.outerHeight();							
						if(listDLTop + listDLHeight > (windowHeight + windowScrollTop)){
							that.listDL.css({
								'top': '-=' + (listDLHeight + triggerDLHeight)
							});
						}
						$.isFunction(afterOpen) && afterOpen.call(that);
					});				
				}
				else{
					that.listDL.css({
						'display': 'block'
					});
					listDLTop = that.listDL.offset().top;
					listDLHeight = that.listDL.outerHeight();					
					if(listDLTop + listDLHeight > (windowHeight + windowScrollTop)){
						that.listDL.css({
							'top': '-=' + (listDLHeight + triggerDLHeight)
						});
					}
					$.isFunction(afterOpen) && afterOpen.call(that);					
				}				
			}
		},		
		close: function(){
			var that = this,
				hoverClass = that.options.hoverClass,
				beforeClose = that.options.onBeforeClose,
				afterClose = that.options.onAfterClose,
				closeDuration = that.options.closeDuration,
				disableAnimation = that.options.disableAnimation;
			that.opened = false;
			$('.' + hoverClass, that.listDL).removeClass(hoverClass);
			if(that.enableToggle){
				$.isFunction(beforeClose) && beforeClose.call(that);				
				if(!disableAnimation){
					that.listDL.slideUp(closeDuration, function(){
						$.isFunction(afterClose) && afterClose.call(that);
					});				
				}
				else{
					that.listDL.css({
						'display': 'none'
					});
					$.isFunction(afterClose) && afterClose.call(that);					
				}			
			}
		},
		select: function(index){
			var that = this,
				currentIndex = that.originDL.prop('selectedIndex'),
				activeClass = that.options.activeClass
				select = that.options.onSelect;
			$('.' + activeClass, that.listDL).removeClass(activeClass);
			$('li', that.listDL).eq(index).addClass(activeClass);				
			if(that.enableToggle && (index != currentIndex)){
				that.originDL
					.prop('selectedIndex', index)
					.trigger('change.smSelect');							
			}
			that.enableToggle && $.isFunction(select) && select.call(that, index);	
			that.close();
		},
		destroy: function(){
			var that = this;
			if(that.enableToggle){
				$(document).off('keydown.' + that.originDL.attr('name'));
				that.triggerDL.off('.smSelect');
				that.listDL.off('.smSelect').remove();
				that.originDL.removeData('plugin_smSelect');
			}
		}
	};
	
	$.fn[pluginName] = function(options, params){
		return this.each(function(){
			var instance = $.data(this, pluginName);
			if (!instance) {
				$.data(this, pluginName, new Plugin(this, options));
			} else if (instance[options]) {
				instance[options](params);
			} else {
				console && console.warn('This method does not exists in ' + pluginName);
			}
		});
	};
	
	$.fn[pluginName].defaults = {
		outputSelector: null,
		triggerSelector: null,
		enable: true,
		index: -1,
		optionLabel: 'Select An Option',
		deltaTop: 0,
		deltaLeft: 0,
        deltaWidth: 0,
		height: 300,
		disableAnimation: false,
		useDefaultDropdown: null,
		initClass: 'dropdown-list',
		hoverClass: 'hover',
		activeClass: 'active',
		disableClass: 'disable',
		openDuration: 300,
		closeDuration: 300,
		onBeforeOpen: null,
		onAfterOpen: null,		
		onBeforeClose: null,
		onAfterClose: null,
		onChange: null,
		onSelect: null	
	};
}(jQuery, window));
//instance: this.originDL: origin dropdownlist, this.listDL: custom dropdownlist, this.outputDL: ouput text or value, this.triggerDL: click to show dropdowlist
//view start.js line 63 for detail