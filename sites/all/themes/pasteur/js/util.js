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
				control.append('<li><span  class="ui-icon init-icon-4"></span></li>');
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

;(function($, window, undefined){
	var pluginName = 'smSelect';
	
	function createlistDL(){
		var that = this,
			ul = '',
			li = '',
			allOption = that.originDL.find('option'),
			eachOption = null,
			originDLName = that.originDL.attr('name');
		if(!$('#' + originDLName + '-list').length){
			for(var i = 0, len = allOption.length; i < len; i++){
				eachOption = allOption.eq(i);
				li += that.liTemplate
					.replace(/{value}/gi, eachOption.attr('value'))
					.replace(/{text}/gi, eachOption.text());
			}
			ul = '<ul>' + li + '</ul>';					
			return $(ul).appendTo(document.body).attr('id', originDLName + '-list');					
		}
		else{
			return $('#' + originDLName + '-list');						
		}
	}
	
	function Plugin(element, options){
		this.originDL = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.init();
	};
	
	Plugin.prototype = {
		init: function(){
			var that = this,
				listDL = null,
				triggerDL = null,
				outputDL = null,
				originDL = that.originDL,				
				hoverIndex = null,
				options = that.options,
				timeout = options.timeout,
				enable = options.enable,
				initClass = options.initClass,
				hoverClass = options.hoverClass,
				onChange = options.onChange,
				index = options.index,
				autoRenderWrapper = options.autoRenderWrapper,
				wrapperClass = options.wrapperClass,
				wrapperSelector = null,
				useDefaultDropdown = options.useDefaultDropdown,
				originDLName = originDL.attr('name'),				
				currentSelectText = null;
			that.liTemplate = options.liTemplate;
			that.triggerDL = triggerDL = options.triggerSelector;
			that.outputDL = outputDL = options.outputSelector;
			that.lockHover = false;
			that.opened = false;
			if(autoRenderWrapper){
				originDL.wrap('<div class="' + wrapperClass + '"/>');
				wrapperSelector = originDL.closest('.' + wrapperClass);
				wrapperSelector
					.prepend('<a href="javascript:void(0);" title=""/>')
					.prepend('<span/>');
				that.triggerDL = triggerDL = wrapperSelector;
				that.outputDL = outputDL = wrapperSelector.children('span');					
			}			
			that.enable(enable);
			if(!useDefaultDropdown){
				listDL = that.listDL = createlistDL.call(that);
				listDL.addClass(initClass);
				originDL.css('display', 'none');
				listDL
					.css({
						'position': 'absolute',
						'z-index': 171985,
						'max-height': options.height,
						'overflow': 'auto',
						'display': 'none'
					})				
					.off('click.smSelect hover', 'li')
					.on({
						'click.smSelect': function(evt){
							var allLi = listDL.find('li');
							if(that.enableToggle){
								that.select(allLi.index(this));
								evt.preventDefault();
							}
						},
						'hover': function(evt){
							var currentHover = listDL.find('.' + hoverClass);
							if(that.lockHover == false){
								if(evt.type == 'mouseenter'){
									currentHover.removeClass(hoverClass);
									$(this).addClass(hoverClass);
								}
								if(evt.type == 'mouseleave'){
									$(this).removeClass(hoverClass);
								}								
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
				triggerDL
					.off('click.smSelect mouseenter.smSelect mouseleave.smSelect')
					.on({
						'click.smSelect': function(){
							listDL.is(":hidden") ? that.open() : that.close();
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
						var hoverClass = options.hoverClass,
							allLi = listDL.find('li'),
							minCount = 0,
							maxCount = allLi.length - 1,							
							currentHover = listDL.find('.' + hoverClass),
							hoverIndex = allLi.index(currentHover),
							hoverIndexTop = allLi.eq(hoverIndex).position().top,
							liHeight = allLi.eq(hoverIndex).height(),
							maxScrollTop = allLi.eq(maxCount).position().top,
							listDLScrollTop = listDL.scrollTop(),
							listDLHeight = listDL.height(),
							stepScroll = options.stepScroll;
						if(that.opened == true){
							that.lockHover = true;
							clearTimeout(that.clearLockHover);
							that.clearLockHover = setTimeout(function(){
								that.lockHover = false;
							}, timeout);
							switch(evt.which){
								case 38:
									(hoverIndex >= minCount) && hoverIndex--;
									(hoverIndex < minCount) && (hoverIndex = maxCount);
									if(hoverIndexTop < liHeight){
										listDL.scrollTop(listDLScrollTop - stepScroll * liHeight);
									}
									if(hoverIndex == maxCount){
										listDL.scrollTop(maxScrollTop);
									}
									currentHover.removeClass(hoverClass);
									allLi.eq(hoverIndex).addClass(hoverClass);								
									evt.preventDefault();
								break;
								case 40:
									(hoverIndex <= maxCount) && hoverIndex++;
									(hoverIndex > maxCount) && (hoverIndex = minCount);
									if(hoverIndexTop > (listDLHeight - liHeight)){
										listDL.scrollTop(listDLScrollTop + stepScroll * liHeight);
									}
									if(hoverIndex == minCount){
										listDL.scrollTop(0);
									}
									currentHover.removeClass(hoverClass);
									allLi.eq(hoverIndex).addClass(hoverClass);								
									evt.preventDefault();
								break;
								case 13:
									that.select(hoverIndex);								
									evt.preventDefault();								
								break;
								case 32:								
									evt.preventDefault();								
								break;
							}
						}
					});
				$(window)
					.off('resize.smSelect' + originDLName)
					.on('resize.smSelect' + originDLName, function(){
						that.reposition.call(that);
					});					
			}
			originDL
				.off('change.smSelect')
				.on('change.smSelect', function(){
					currentSelectText = originDL.find('option:selected').text();
					if(that.enableToggle){
						if(outputDL.is('input')){
							outputDL.val(currentSelectText);
						}
						else{
							outputDL.text(currentSelectText);
						}
						$.isFunction(onChange) && onChange.call(that);
					}						
				});
			if(that.enableToggle){				
				originDL.prop('selectedIndex', index);
				currentSelectText = originDL.find('option:selected').text();
				if(outputDL.is('input')){
					outputDL.val(currentSelectText);
				}
				else{
					outputDL.text(currentSelectText);
				}
			}						
		},
		reposition: function(left, width){
			var that = this,
				options = that.options,			
				originDL = that.originDL,
				listDL = that.listDL,
				triggerDL = that.triggerDL,
				wrapperClass = options.wrapperClass,				
				wrapperDL = originDL.closest('.' + wrapperClass),
				outputDL = that.outputDL,
				deltaTop = options.deltaTop,
				deltaLeft = options.deltaLeft,
				deltaWidth = options.deltaWidth;
			listDL
				.css({
					'top': wrapperDL.offset().top + wrapperDL.outerHeight(true) + deltaTop,
					'left':  wrapperDL.offset().left + deltaLeft,
                    'width': wrapperDL.outerWidth(true) + deltaWidth
				});
		},
		update: function(params){
			var that = this,
				li = '',
				listDL = that.listDL,
				allOption = null,
				eachOption = null;
			that.originDL.html(params.option);
			allOption = that.originDL.find('option');
			for(var i = 0, len = allOption.length; i < len; i++){
				eachOption = allOption.eq(i);
				li += params.liTemplate
					.replace(/{value}/gi, eachOption.attr('value'))
					.replace(/{text}/gi, eachOption.text());
			}
			listDL.html(li);
		},	
		enable: function(option){
			var that = this,
				triggerDL = that.triggerDL,
				disableClass = that.options.disableClass;	
			that.enableToggle = option;
			if(!that.enableToggle){
				triggerDL.addClass(disableClass);
			}
			else{
				triggerDL.removeClass(disableClass);
			}
		},		
		open: function(){
			var that = this,
				listDL = that.listDL,
				options = that.options,
				beforeOpen = options.onBeforeOpen,
				disableAnimation = options.disableAnimation,
				openDuration = options.openDuration,
				onAfterOpen = options.onAfterOpen,
				listDLTop = null,
				listDLHeight = null,
				triggerDLHeight = that.triggerDL.outerHeight(),
				windowHeight = $(window).height(),
				windowScrollTop = $(window).scrollTop();
			if(that.enableToggle){
				that.reposition();
				(that.opened == false) && $.isFunction(beforeOpen) && beforeOpen.call(that);
				if(!disableAnimation){
					listDL.slideDown(openDuration, function(){
						listDLTop = listDL.offset().top;
						listDLHeight = listDL.outerHeight();							
						if(listDLTop + listDLHeight > (windowHeight + windowScrollTop)){
							listDL.css({
								'top': '-=' + (listDLHeight + triggerDLHeight)
							});
						}
						(that.opened == false) && $.isFunction(onAfterOpen) && onAfterOpen.call(that);
						that.opened = true;
					});				
				}
				else{
					listDL.css({
						'display': 'block'
					});
					listDLTop = listDL.offset().top;
					listDLHeight = listDL.outerHeight();					
					if(listDLTop + listDLHeight > (windowHeight + windowScrollTop)){
						listDL.css({
							'top': '-=' + (listDLHeight + triggerDLHeight)
						});
					}
					(that.opened == false) && $.isFunction(onAfterOpen) && onAfterOpen.call(that);
					that.opened = true;
				}				
			}
		},		
		close: function(){
			var that = this,
				listDL = that.listDL,
				options = that.options,
				hoverClass = options.hoverClass,
				onBeforeClose = options.onBeforeClose,
				onAfterClose = options.onAfterClose,
				closeDuration = options.closeDuration,
				disableAnimation = options.disableAnimation;
			if(that.enableToggle){				
				listDL.find('.' + hoverClass).removeClass(hoverClass);
				(that.opened == true) && $.isFunction(onBeforeClose) && onBeforeClose.call(that);				
				if(!disableAnimation){
					listDL.slideUp(closeDuration, function(){
						(that.opened == true) && $.isFunction(onAfterClose) && onAfterClose.call(that);
						that.opened = false;
					});				
				}
				else{
					listDL.css('display', 'none');
					(that.opened == true) && $.isFunction(onAfterClose) && onAfterClose.call(that);
					that.opened = false;
				}			
			}
		},
		select: function(index){
			var that = this,
				listDL = that.listDL,
				originDL = that.originDL,
				currentIndex = originDL.prop('selectedIndex'),
				activeClass = that.options.activeClass
				onSelect = that.options.onSelect;
			if(that.enableToggle){
				listDL.find('.' + activeClass).removeClass(activeClass);
				listDL.find('li').eq(index).addClass(activeClass);				
				$.isFunction(onSelect) && onSelect.call(that, index);
				if(index != currentIndex){
					originDL
						.prop('selectedIndex', index)
						.trigger('change.smSelect');							
				}
				that.close();
			}
		},
		reset: function(){
			var that = this,
				listDL = that.listDL,
				originDL = that.originDL,
				outputDL = that.outputDL,
				options = that.options,
				hoverClass = options.hoverClass,
				activeClass	= options.activeClass;
			that.select(0);
			originDL.find('.' + hoverClass).removeClass(hoverClass);
			originDL.find('.' + activeClass).removeClass(activeClass);			
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
			if(!instance){
				$.data(this, pluginName, new Plugin(this, options));
			}
			else if(instance[options]){
				instance[options](params);
			}
			else{
				console && console.warn('This method does not exists in ' + pluginName);
			}
		});
	};	
	$.fn[pluginName].defaults = {
		liTemplate: '<li value="{value}"><a href="#">{text}</a></li>',
		autoRenderWrapper: false,
		stepScroll: 5,
		wrapperClass: 'type-combobox',
		outputSelector: null,
		triggerSelector: null,
		timeout: 500,
		enable: true,
		index: 0,
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

;(function($, window, undefined){
	var pluginName = 'smValidator';
	var allowCharFn = {
		number: function(keyCode){
			if($.inArray(keyCode, [8, 9, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 110, 188, 190]) === -1){
				return false;
			}
		}
	};
	var validateFn = {
		ckeditor: function(el){
			var that = this,
				ckeId = $(el).attr('id'),
				ckeData = CKEDITOR.instances[ckeId].getData();
			CKEDITOR.instances[ckeId].on('blur', function(){
				 validEl.call(that, el);
			});
			if(!ckeData.length){			
				return false;
			}		
		},
		uploadExt: function(el, allowExt){
			var ext = el.val().split('.').pop().toLowerCase();
			if(ext.length && $.inArray(ext, allowExt) == -1) {
				return false;
			}
		},
		required: function(el){
			var name = chooseName(el);
			if(!/\w/i.test($.trim(el.val())) || $.trim(el.val()) == this.options.rules[name].init){
				return false;
			}	
		},
		checked: function(el){				
			if(!el.is(':checked')){
				return false;
			}
		},
		selected: function(el){
			if(!el.prop('selectedIndex')){
				return false;
			}
		},						
		minLen: function(el, len){				
			if($.trim(el.val()).length < len){
				return false;
			}
		},
		email: function(el, pattern){
			if(pattern === true){
				if(!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test($.trim(el.val()))){
					return false;
				}
			}
			else{
				if(!pattern.test($.trim(el.val()))){
					return false;
				}
			}
		},
		phone: function(el, pattern){
			if(pattern === true){
				if(!/^[0-9]{10,11}$/i.test($.trim(el.val()))){
					return false;
				}					
			}
			else{
				if(!pattern.test($.trim(el.val()))){
					return false;
				}
			}
				
		},
		custom: function(el, customPattern){
			if($.isFunction(customPattern)){
				return customPattern.call(el);
			}
			else{
				return customPattern.test($.trim(el.val()));
			}
		},
		equalTo: function(el, equalTo){
			var that = this,
				equalToEle =  chooseEl.call(that, equalTo);
			if($.trim(el.val()) != $.trim($(equalToEle).val())){
				return false;
			}
		}
	};

	function resetFrm(frmEl){
		var that = this,
			options = that.options,
			rules = options.rules,
			name = null,
			frmInput = frmEl.find('input,textarea,select');
		$.each(frmInput, function(){
			var frmInputType = $(this).prop('type');
			name = chooseName($(this));
			switch(frmInputType){
				case 'password':
				case 'text':
				case 'textarea':
					if(rules[name] && rules[name].init){
						$(this).val(rules[name].init);
					}
					else{
						$(this).val('');
					}				
				break;
				case 'checkbox':
				case 'radio':
					$(this).prop('checked', false);
				break;
				case 'select-one':
				case 'select':
					$(this).prop('selectedIndex', 0);
				break;
			}			
		});	
	};
	
	function validEl(el){
		var that = this,
			options = that.options,
			passed = true,				
			errorInputClass = options.errorInputClass,
			errorMsg = el.siblings('.' + options.errorMsgClass),
			name = chooseName(el),
			rule = options.rules[name],
			valid = rule.valid,
			message = rule.message,
			eachMessage = null;
		$.each(valid, function(key, eachValidParam){
			if(validateFn[key].call(that, el, eachValidParam) === false){
				eachMessage = message[key];
				if(jQuery.isNumeric(eachValidParam) && eachMessage.indexOf('{num}') != -1){
					eachMessage = message[key].replace(/{num}/gi, eachValidParam);
				}
				showErrorMsg.call(that, el, eachMessage);
				passed = false;
			}
			if(passed){
				if(valid.ckeditor){
					el.siblings('#cke_' + el.attr('id')).removeClass(errorInputClass);
				}
				el.removeClass(errorInputClass);
				errorMsg.css('display', 'none');	
			}
			else{
				return false;	
			}						
		});
		return passed;		
	};
	
	function showErrorMsg(el, message){
		var that = this,
			options = that.options,
			option = options.errorOption,
			errorInputClass = options.errorInputClass,
			errorMsgClass = options.errorMsgClass,
			errorTotalClass = options.errorTotalClass,
			name= chooseName(el),
			rule = options.rules[name],
			duration = rule.duration ? rule.duration : options.duration,		
			errorMsg = null;
		if(rule.valid.ckeditor){
			el = el.siblings('#cke_' + el.attr('id'));
		}
		if(option == 1 || option == 3){
			if((el.is(':checkbox') || el.is(':radio')) && el.length > 1){					
				el = el.first();
			}
		}				
		if(option == 2){
			if((el.is(':checkbox') || el.is(':radio')) && el.length > 1){					
				el = el.last();
			}
		}
		errorMsg = el.siblings('.' + errorMsgClass).length ?
			el.siblings('.' + errorMsgClass).css('display', 'block').text(message) :
			$('<label class="' + errorMsgClass + '" for="' + el.attr('id') + '">' + message + '</label>').insertAfter(el);
		that.error += '<li><label class="' + errorTotalClass + '">' + message + '</label></li>';
		el.addClass(errorInputClass);
		errorMsg.css({
			'width': 'auto',
			'z-index': 171985
		});
		if(option == 1){
			errorMsg
				.css({
					'top': el.offset().top + el.outerHeight(),
					'left': el.offset().left
				})
				.data('option', 1);					
				setTimeout(function(){
					errorMsg.remove();
				}, duration);
		}
		if(option == 2){
			errorMsg
				.css({
					'top': el.offset().top,
					'left': el.offset().left + el.outerWidth()
				})
				.data('option', 2);				
		}
		if(option == 3){
			errorMsg
				.css({
					'top': el.offset().top + el.outerHeight(),
					'left': el.offset().left
				})
				.data('option', 3);					
		}
	};
	
	function chooseEl(name){
		var that = this,
			formVL = that.formVL;
		if(formVL.find('[name="' + name + '"]').length){
			return formVL.find('[name="' + name + '"]');
		}
		if(formVL.find('#' + name).length){
			return formVL.find('#' + name);
		}
	};
	
	function chooseName(el){
		if(el.attr('name')){
			return el.attr('name');
		}
		if(el.attr('id')){
			return el.attr('id');
		}		
	};
	
	function Plugin(element, options){
		this.formVL = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.init();
	};
	
	Plugin.prototype = {
		init: function(){
			var that = this,
				options = that.options,
				submitSelector = options.submitSelector,
				resetSelector = options.resetSelector,
				errorMsgClass = options.errorMsgClass,
				errorInputClass = options.errorInputClass,
				errorContainer = options.errorContainer,
				rules = options.rules,
				formVL = that.formVL,
				formId = formVL.attr('id');
			if(submitSelector.length){
				submitSelector
					.off('click.validate')
					.on('click.validate', function(evt){
						formVL.submit();
						evt.preventDefault();
					});
			}
			if(resetSelector.length){
				resetSelector
					.off('click.validate')
					.on('click.validate', function(evt){
						formVL.get(0).reset();
						evt.preventDefault();
					});
			}
			$.each(rules, function(name, rule){				
				var el = chooseEl.call(that, name);
				el
					.val(function(index, value){
						if(!$(this).is('input[type="file"]')){
							if(rule.init){
								return rule.init;
							}
							else{
								return value;
							}							
						}
					});				
			});			
			$(window)
				.off('resize.validate' + formId)
				.on('resize.validate' + formId, function(){
					var errorMsg = formVL.find('.' + errorMsgClass),
						eachErrorMsg = null,
						el = null;
					for(var i = 0, len = errorMsg.length; i < len; i++){
						eachErrorMsg = errorMsg.eq(i);						
						el = eachErrorMsg.siblings('.' + errorInputClass);
						if(eachErrorMsg.is(':visible')){
							if(eachErrorMsg.data('option') == 1 || eachErrorMsg.data('option') == 3){
								eachErrorMsg.css({
									'top': el.offset().top + el.outerHeight(),
									'left': el.offset().left
								});							
							}
							if(eachErrorMsg.data('option') == 2){
								eachErrorMsg.css({
									'top': el.offset().top,
									'left': el.offset().left + el.outerWidth()
								});							
							}							
						}
					}					
				});
			formVL
				.off('focus.validate blur.validate keydown.validate keyup.validate change.validate', 'input[type="text"], input[type="password"], textarea')
				.on({
					'focus.validate' : function(){
						var val = $(this).val(),
							name = chooseName($(this)),
							rule = options.rules[name];							
						rule && rule.init && ($.trim(val) == rule.init) && $(this).val('');			
					},
					'blur.validate' : function(){
						var val = $(this).val(),
							name = chooseName($(this)),
							rule = options.rules[name];
						if(rule){
							rule.init && ($.trim(val) == '') && $(this).val(rule.init);						
							validEl.call(that, $(this));
						}						
					},
					'keyup.validate change.validate' : function(evt){
						var name = chooseName($(this)),
							rule = options.rules[name];							
						rule && validEl.call(that, $(this));
					},					
					'keydown.validate': function(evt){
						var name = chooseName($(this)),
							rule = options.rules[name];
						if(rule && rule.allowChar){
							if(allowCharFn[rule.allowChar].call(this, evt.which) === false){
								evt.preventDefault();
							}
						}
					}					
				}, 'input[type="text"], input[type="password"], textarea')
				.off('click.validate', 'input[type="radio"], input[type="checkbox"]')
				.on('click.validate', 'input[type="radio"], input[type="checkbox"]', function(){				
					var name = chooseName($(this)),
						rule = options.rules[name],
						el = chooseEl.call(that, name);
					rule && validEl.call(that, el);
				})				
				.off('change.validate', 'select')
				.on('change.validate', 'select', function(){				
					var name = chooseName($(this)),
						rule = options.rules[name];
					rule && validEl.call(that, $(this));
				})			
				.off('submit.validate reset.validate')
				.on({
					'submit.validate': function(evt){
						var eachIsValid = true,						
							allIsValid = true,
							el = null,
							options = that.options,
							option = options.errorOption,
							errorInputClass = options.errorInputClass,			
							errorContainer = options.errorContainer;
						that.error = '';
						$.each(rules, function(name, rule){							
							el = chooseEl.call(that, name);							
							if(el.length > 1 && el.is('input[type="text"]')){
								$.each(el, function(index, eachEl){
									eachIsValid = validEl.call(that, $(eachEl));
									allIsValid = allIsValid && eachIsValid;									
								});
							}
							else{
								eachIsValid = validEl.call(that, el);
								allIsValid = allIsValid && eachIsValid;							
							}
							if(option == 4){
								errorContainer.html(that.error).wrapInner('<ol/>');
							}
							if(option == 1 && !eachIsValid){
								return false;
							}							
						});
						formVL.find('.' + errorInputClass).first().focus();
						if(allIsValid){							
							return options.onSubmit.call(that);										
						}
						else{
							return false;	
						}			
					},
					'reset.validate': function(evt){
						var el = null;
						$.each(rules, function(name, rule){
							el = chooseEl.call(that, name);
							el.removeClass(errorInputClass);
							formVL.find('.' + errorMsgClass).css('display', 'none');
							formVL.find('.' + errorInputClass).removeClass(errorInputClass);
							errorContainer.html('');							
						});
						resetFrm.call(that, formVL);
						evt.preventDefault();
					}
				});		
		},
		addRule: function(options){
			var that = this,
				el = null,
				addRules = options.rules,
				rules = that.options.rules;
			$.each(addRules, function(name, rule){			
				el = chooseEl.call(that, name);
				if(rules[name]){
					$.extend(true, rules[name], rule);
				}
				else{
					rules[name] = rule;
				}
				el.val(rule.init);				
			});
		},
		removeRule: function(options){
			var that = this,
				removeRules = options.rules,
				rules = that.options.rules;
			$.each(removeRules, function(name, rule){
				$.each(rule.valid, function(key, value){
					delete rules[name].valid[key];
					delete rules[name].message[key];					
				});
			});	
		},
		destroy: function(){
			var that = this,
				options = that.options,
				errorMsgClass = options.errorMsgClass,
				errorInputClass = options.errorInputClass,
				formVL = that.formVL,
				el = null,
				rules = options.rules,
				rule = null;
			formVL.off('.validate', 'input, textarea, select');
			formVL.off('.validate');			
			$(window).off('.validate');
			formVL.find('.' + errorMsgClass).remove();
			$.each(rules, function(name, rule){
				el = chooseEl.call(that, name);
				el.removeClass(errorInputClass);
				el.data('option') && el.removeData('option');				
			});			
			options.errorContainer.html('');
			formVL.removeData(pluginName);
			formVL.get(0).reset();
		}
	};
	$.fn[pluginName] = function(options, params){
		return this.each(function(){
			var instance = $.data(this, pluginName);
			if(!instance){
				$.data(this, pluginName, new Plugin(this, options));
			}
			else if(instance[options]){
				instance[options](params);
			}
			else{
				console.warn(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
			}
		});
	};
	$.fn[pluginName].defaults = {
		onSubmit: function(){
			return true;
		},
		rules: false,
		submitSelector: false,
		resetSelector: false,
		duration: 2000,
		errorOption: 4,
		errorContainer: $('#errorContainer'),
		errorTotalClass: 'alert-total',
		errorMsgClass: 'alert-layer',
		errorInputClass: 'error'
	};
}(jQuery, window));

;(function($, window, undefined) {
	var pluginName = 'smAccordion';
	var privateVar = null;
	var privateMethod = function() {

	};

	function Plugin(element, options) {
		this.element = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.init();
	};

	Plugin.prototype = {
		init: function() {
			var that = this,
				options = this.options,
				elementid = $(that.element).attr('id'),
				allDivs = $(that.element).children(),
				iCurrent = options.currentcounter,
				currentDiv = allDivs[iCurrent];		
			that.alldivs_array = [];				
			$(that.element).addClass('accordionWrapper');
			$(that.element).css({overflow:"hidden"});
			
			if(options.autodelay > 0){				
				$('#'+ elementid +' > div').unbind('mouseover.'+pluginName).bind('mouseover.'+pluginName, function(){						
					that.pause(options);
			    });
				$('#'+ elementid +' > div').unbind('mouseout.'+pluginName).bind('mouseout.'+pluginName, function(){					
					that.startPlay(options, that);
				});
			}
			
			allDivs.each(function(current) {
				var _iCurrent = current,
					sTitleID = elementid+'_msTitle_'+(_iCurrent),
					sContentID = sTitleID+'_msContent_'+(_iCurrent),					
					totalChild = currentDiv.childNodes.length,
					titleDiv = $(that.element).find(allDivs[_iCurrent]).find('div.title'),
					contentDiv = $(that.element).find(allDivs[_iCurrent]).find('div.content');
				titleDiv.attr('id', sTitleID);
				contentDiv.attr('id', sContentID);
				that.alldivs_array.push(sTitleID);				
				$(that.element).find('#'+sTitleID).unbind(options.event+'.'+pluginName).bind(options.event+'.'+pluginName, function(){
					if($(this).next().css('display') == 'block'){						
						that.closeMe(sContentID, options);
					}					
					that.pause(options);
					that.openMe(sTitleID, options, that);
				});
			});			
			if(options.vertical) {
				that.makeVertical(elementid);
			};
			if(options.defaultid){			
				that.openMe(elementid+'_msTitle_' + options.defaultid, options, that);
			}
			if(options.autodelay > 0) {
				that.startPlay(options, that);
			};			
		},	
		openMe: function(id, options, that) {
			var sTitleID = id,
				_iCurrent = sTitleID.split('_')[sTitleID.split('_').length-1];				
			that.iCurrent = _iCurrent;			
			var sContentID = id+'_msContent_'+_iCurrent;			
			if($(that.element).find('#'+sContentID).css('display')=='none') {
				if(options.previousDiv!='') {
					that.closeMe(options.previousDiv, options);
				};
				if(options.vertical) {					
					$('#'+sTitleID).find('.btn-expand').addClass(options.clsActive).attr('title',L10N.valid.close);
					$('#'+sContentID).stop(true).slideDown('slow');
				} else {
					$('#'+sContentID).stop(true).show('slow');
				}
				options.currentDiv = sContentID;
				options.previousDiv = options.currentDiv;
			};
			
		},
		closeMe: function(div, options) {
			if(options.vertical) {				
				$('#'+div).stop(true).slideUp('slow');
				$('#'+div).prev().find('.btn-expand').removeClass(options.clsActive).attr('title',L10N.valid.open);
			} else {
				$('#'+div).stop(true).hide('slow');
			};
		},
		makeVertical: function(elementid) {
			$('#'+elementid +' > div').css({display:'block', float:'none', clear:'both'});
			$('#'+elementid +' > div > div.title').css({display:'block', float:'none', clear:'both'});
			$('#'+elementid +' > div > div.content').css({clear:'both'});
		},
		startPlay: function(options, that) {
			options.intervalid = setInterval(function(){
				that.play(options, that);
			}, options.autodelay*1000);
		},
		play: function (options, that) {
			var sTitleId = that.alldivs_array[that.iCurrent];
			that.openMe(sTitleId, options, that);
			that.iCurrent++;
			if(that.iCurrent==that.alldivs_array.length) that.iCurrent = 0;
		},
		pause: function (options) {
			clearInterval(options.intervalid);
		},
		publicMethod: function(param) {

		}
	};

	$.fn[pluginName] = function(options, params) {
		return this.each(function() {
			var instance = $.data(this, pluginName);
			if (!instance) {
				$.data(this, pluginName, new Plugin(this, options));
			} else if (instance[options]) {
				instance[options](params);
			} else {
				console.warn(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
			}
		});
	};

	$.fn[pluginName].defaults = {		
		currentDiv:'number',
		previousDiv:'',
		vertical: false,
		defaultid:0,
		currentcounter:0,
		intervalid:0,
		clsActive:'string',
		autodelay:0,
		event:'click',
		alldivs_array:new Array(),
		event1: function() {},
		event2: function() {},
		event3: function() {}
	};
}(jQuery, window));

;(function($, window, undefined) {
	var pluginName = 'smLayer';
	
	function Plugin(element, options) {
		this.element = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.init();
	}

	Plugin.prototype = {
		init: function() {
			var that = this,
				options = this.options;

			if (options.overlay) {
				that.overlay = $('<div>').appendTo('body').css({
					'display': 'none',
					'position': 'fixed',
					'width': '100%',
					'height': '100%',
					'background': options.background,
					'top': 0,
					'left': 0,
					'z-index': options.zIndex - 1
				});
				that.overlay.bind('click.' + pluginName, function() {
					that.close();
					return false;
				});
			}
			if (that.element.find(options.closeButtons).length) {
				that.element.delegate(options.closeButtons, 'click.' + pluginName, function() {
					that.close();
					return false;
				});
			}
			if (options.autoOpen) {
				that.open();
			}
		},
		open: function(callback) {
			if (this.isOpen) {
				return;
			}
			var that = this;
			var options = this.options;
			var position = that.element.outerHeight() > $(window).height() ? 'absolute' : 'fixed';
			
			options.duration = !options.animation ? 0 : options.duration;

			that.element.css({
				'top': '50%',
				'left': '50%',
				'margin-top': position === 'fixed' ? -that.element.outerHeight() / 2 : 0,
				'margin-left': -that.element.outerWidth() / 2,
				'position': that.element.outerHeight() > $(window).height() ? 'absolute' : 'fixed',
				'display': 'block',
				'opacity': 0,
				'zIndex': options.zIndex
			});
			
			options.overlay && this.overlay.fadeTo(options.duration, options.opacity, options.easing);

			this.element.fadeTo(options.duration, 1, options.easing, function() {
				$.isFunction(options.open) && options.open.call(that.element);
				$.isFunction(callback) && callback.call(that.element);
				that.isOpen = true;
			});
		},
		close: function(callback) {
			if (!this.isOpen) {
				return;
			}
			var that = this;
			var options = this.options;
			options.duration = !options.animation ? 0 : options.duration;

			options.overlay && this.overlay.fadeOut(options.duration, options.easing);
			this.element.fadeOut(options.duration, options.easing, function() {
				$.isFunction(options.close) && options.close.call(that.element);
				$.isFunction(callback) && callback.call(that.element);
				that.isOpen = false;
			});
		},
		destroy: function() {
			this.overlay.remove();
			if (this.element.find(this.options.closeButtons).length) {
				this.element.undelegate(this.options.closeButtons, 'click.' + pluginName);
			}
			$.removeData(this.element, pluginName);
		}
	};

	$.fn[pluginName] = function(options, params) {
		return this.each(function() {
			var instance = $.data(this, pluginName);
			if (!instance) {
				$.data(this, pluginName, new Plugin(this, options));
			} else if (instance[options]) {
				instance[options](params);
			} else {
				console.warn(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
			}
		});
	};

	$.fn[pluginName].defaults = {
		animation: true,
		autoOpen: true,
		removeOnClose: false,
		closeButtons: '.close',
		background: '#000',
		opacity: 0.5,
		duration: 400,
		easing: 'linear',
		zIndex: 1000,
		open: function() {},
		close: function() {}
	};
}(jQuery, window));

