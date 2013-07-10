/**
 * @name smAccordion
 * @description description
 * @version 1.0
 * @this.options
 *		option
 * @events
 *		event
 * @methods
 *		init
 *		publicMethod
 *		destroy
 */
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
					$('#'+sTitleID).find('.btn-expand').addClass(options.clsActive);
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
				$('#'+div).prev().find('.btn-expand').removeClass(options.clsActive);
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
