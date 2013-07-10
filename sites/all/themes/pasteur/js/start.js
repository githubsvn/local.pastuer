/**
 * Global variables
 **/
var indexPaging = 0; 
var Pasteur = (function($, window, undefined){	 
	
	function accordion(){
		if($('.block-type-2').length){			
			$('#ulContent').smAccordion({				
				clsActive: 'active',
				vertical: true
			});
		}
	};
	
	function banner(){
		if($('#slider').length){
			$('#slider').smSlider({
				control: $('#slider-control'),
				desLayer: $('#slider-description'),
				imageSize: [689, 277],
				animateTime: 900,
				autoScroll: true,
				timeScroll: 6000
			});
		}
	};
	
	function customSelect(){
		if($('#lienketsite').length){
			$('#lienketsite').smSelect({
				outputSelector: $('#sidebar-left .select-type-01 span:first'),
				triggerSelector: $('#sidebar-left .select-type-01'),
				enable: true,
				index: 0,
				optionLabel: '--- Liên kết website ---',
				deltaTop: 0,
				deltaLeft: 0,
		        deltaWidth: 0,
				height: 300,
				disableAnimation: false,
				useDefaultDropdown: true,
				initClass: null,
				hoverClass: 'hover',
				activeClass: 'active',
				disableClass: 'disable',
				openDuration: 300,
				closeDuration: 300,
				onBeforeOpen: null,
				onAfterOpen: null,		
				onBeforeClose: null,
				onAfterClose: null,
				onChange: function(){
					if(this.originDL.val()!="")
					window.open(this.originDL.val(),'_blank');
				},
				onSelect: null	
			})
			.hover(function(){
				$(this).css('cursor', 'pointer');
			}, function(){
			});
		}
		if($('#contact-form').length){
			$('#contact-form .select-type-03 select').smSelect({
				outputSelector: $('#contact-form .select-type-03 span:first'),
				triggerSelector: $('#contact-form .select-type-03'),
				wrapperClass: 'select-type-03',
				enable: true,
				index: 0,
				optionLabel: '--- Liên kết website ---',
				deltaTop: 0,
				deltaLeft: 0,
		        deltaWidth: 0,
				height: 300,
				disableAnimation: false,
				useDefaultDropdown: true,
				initClass: null,
				hoverClass: 'hover',
				activeClass: 'active',
				disableClass: 'disable',
				openDuration: 300,
				closeDuration: 300,
				onBeforeOpen: null,
				onAfterOpen: null,		
				onBeforeClose: null,
				onAfterClose: null,
				onSelect: null	
			});
		}
	};
	
	function gallery(){
		var imgList = $('#image-gallery .slide-inner-01 ul:first').find('li').css({position:'absolute'});
		if(!imgList.length) return;
		var len = imgList.length;
		
		var ulCtr = $('#image-gallery .thumb-content ul:first');
		var controls = ulCtr.find('li');
		var cur = 0;
		var iW = 95;
		var rate;
		var notRun = true;
		var cLen = len < 4 ? len: 4;
		$('#image-gallery .slide-thumb').css({width: cLen*iW + 51});
		$('#image-gallery .thumb-content').css({width: cLen*iW - 7});

		var aniTime = 1000;
		var next = $('#image-gallery .prev').first();
		var prev = $('#image-gallery .next').first();
		var disPrev = false;
		var disNext = true;

		if(len < 2) {
			prev.css({display:'none'});
			next.css({display:'none'});
			return;
		}
		ulCtr.css({width: controls.len*iW, 'margin-left': 0});
		imgList.each(function(i){ i && $(this).css({display:'none'});});
		prev.css({display:'none'});


		var timer = setInterval(function(){
			if((cur < len - 1) && notRun){
				if(!disPrev){prev.stop().fadeIn(aniTime);disPrev = true;};
				if(disNext && cur == len - 2){next.stop().fadeOut(aniTime);disNext = false;}
				notRun = false;
				controls.eq(cur).removeClass('current');
				controls.eq(cur + 1).addClass('current');
				imgList.eq(cur).fadeOut(aniTime);
				imgList.eq(cur + 1).fadeIn(aniTime);
				if(Math.abs(parseInt(ulCtr.css('margin-left'))) < (len - cLen)*iW){
					ulCtr.stop().animate({
						'margin-left': '+=' + -iW
					}, aniTime, function(){notRun = true;});
				} else notRun = true;
				cur +=1;
			} else if(cur == len - 1){
				if(cur && notRun){
					if(disPrev){prev.stop().fadeOut(aniTime);disPrev = false;}
					if(!disNext){next.stop().fadeIn(aniTime);disNext = true;}
					notRun = false;
					controls.eq(cur).removeClass('current');
					controls.eq(0).addClass('current');
					imgList.eq(cur).fadeOut(aniTime);
					imgList.eq(0).fadeIn(aniTime);
					if(Math.abs(parseInt(ulCtr.css('margin-left'))) > 0){
						ulCtr.stop().animate({
							'margin-left': '+=' + iW
						}, aniTime, function(){notRun = true;});
					} else notRun = true;
					cur = 0;
				}
			}
		}, 5000);

		next.click(function(){
			if((cur < len - 1) && notRun){
				clearTimeout(timer);
				timer = setInterval(function(){
					if((cur < len - 1) && notRun){
						if(!disPrev){prev.stop().fadeIn(aniTime);disPrev = true;};
						if(disNext && cur == len - 2){next.stop().fadeOut(aniTime);disNext = false;}
						notRun = false;
						controls.eq(cur).removeClass('current');
						controls.eq(cur + 1).addClass('current');
						imgList.eq(cur).fadeOut(aniTime);
						imgList.eq(cur + 1).fadeIn(aniTime);
						if(Math.abs(parseInt(ulCtr.css('margin-left'))) < (len - cLen)*iW){
							ulCtr.stop().animate({
								'margin-left': '+=' + -iW
							}, aniTime, function(){notRun = true;});
						} else notRun = true;
						cur +=1;
					} else if(cur == len - 1){
						if(cur && notRun){
							if(disPrev){prev.stop().fadeOut(aniTime);disPrev = false;}
							if(!disNext){next.stop().fadeIn(aniTime);disNext = true;}
							notRun = false;
							controls.eq(cur).removeClass('current');
							controls.eq(0).addClass('current');
							imgList.eq(cur).fadeOut(aniTime);
							imgList.eq(0).fadeIn(aniTime);
							if(Math.abs(parseInt(ulCtr.css('margin-left'))) > 0){
								ulCtr.stop().animate({
									'margin-left': '+=' + iW
								}, aniTime, function(){notRun = true;});
							} else notRun = true;
							cur = 0;
						}
					}
				}, 5000);
				if(!disPrev){prev.stop().fadeIn(aniTime);disPrev = true;};
				if(disNext && cur == len - 2){next.stop().fadeOut(aniTime);disNext = false;}
				notRun = false;
				controls.eq(cur).removeClass('current');
				controls.eq(cur + 1).addClass('current');
				imgList.eq(cur).fadeOut(aniTime);
				imgList.eq(cur + 1).fadeIn(aniTime);
				if(Math.abs(parseInt(ulCtr.css('margin-left'))) < (len - cLen)*iW){
					ulCtr.stop().animate({
						'margin-left': '+=' + -iW
					}, aniTime, function(){notRun = true;});
				} else notRun = true;
				cur +=1;
			}
		});

		prev.click(function(){
			if(cur && notRun){
				clearTimeout(timer);
				timer = setInterval(function(){
					if((cur < len - 1) && notRun){
						if(!disPrev){prev.stop().fadeIn(aniTime);disPrev = true;};
						if(disNext && cur == len - 2){next.stop().fadeOut(aniTime);disNext = false;}
						notRun = false;
						controls.eq(cur).removeClass('current');
						controls.eq(cur + 1).addClass('current');
						imgList.eq(cur).fadeOut(aniTime);
						imgList.eq(cur + 1).fadeIn(aniTime);
						if(Math.abs(parseInt(ulCtr.css('margin-left'))) < (len - cLen)*iW){
							ulCtr.stop().animate({
								'margin-left': '+=' + -iW
							}, aniTime, function(){notRun = true;});
						} else notRun = true;
						cur +=1;
					} else if(cur == len - 1){
						if(cur && notRun){
							if(disPrev){prev.stop().fadeOut(aniTime);disPrev = false;}
							if(!disNext){next.stop().fadeIn(aniTime);disNext = true;}
							notRun = false;
							controls.eq(cur).removeClass('current');
							controls.eq(0).addClass('current');
							imgList.eq(cur).fadeOut(aniTime);
							imgList.eq(0).fadeIn(aniTime);
							if(Math.abs(parseInt(ulCtr.css('margin-left'))) > 0){
								ulCtr.stop().animate({
									'margin-left': '+=' + iW
								}, aniTime, function(){notRun = true;});
							} else notRun = true;
							cur = 0;
						}
					}
				}, 5000);
				if(disPrev && cur == 1){prev.stop().fadeOut(aniTime);disPrev = false;}
				if(!disNext){next.stop().fadeIn(aniTime);disNext = true;}
				notRun = false;
				controls.eq(cur).removeClass('current');
				controls.eq(cur - 1).addClass('current');
				imgList.eq(cur).fadeOut(aniTime);
				imgList.eq(cur - 1).fadeIn(aniTime);
				if(Math.abs(parseInt(ulCtr.css('margin-left'))) > 0){
					ulCtr.stop().animate({
						'margin-left': '+=' + iW
					}, aniTime, function(){notRun = true;});
				} else notRun = true;
				cur -=1;
			}
		});

		controls.each(function(i){
			$(this).click(function(){
				if(i != cur && notRun){
					if(!disPrev){prev.stop().fadeIn(aniTime);disPrev = true;};
					if(disNext && i == len - 1){next.stop().fadeOut(aniTime);disNext = false;}
					rate = cur - i;
					notRun = false;
					$(this).addClass('current');
					controls.eq(cur).removeClass('current');
					imgList.eq(cur).fadeOut(aniTime);
					imgList.eq(i).fadeIn(aniTime);
					if(i > cur){
						if(i < len - cLen){
							ulCtr.stop().animate({
								'margin-left': '+=' + rate*iW
							}, aniTime, function(){notRun = true;});
						}
						else {
							ulCtr.stop().animate({
								'margin-left': + (cLen - len)*iW
							}, aniTime, function(){notRun = true;});
						}
					}
					else {
						if(disPrev && !i){prev.stop().fadeOut(aniTime);disPrev = false;}
						if(!disNext){next.stop().fadeIn(aniTime);disNext = true;}
						if(i >= cLen - 1){
							ulCtr.stop().animate({
								'margin-left': '+=' + rate*iW
							}, aniTime, function(){notRun = true;});
						}
						else {
							ulCtr.stop().animate({
								'margin-Left': '0px'
							}, aniTime, function(){notRun = true;});
						}
					}
					cur = i;;
				}
			});
		});
	};
	
	function treeView(){
		var menu = $('.tree-menu');
		menu.find('ul').css({display: 'none'});
		menu.children().each(function(){
			processTree($(this));
		});
		function processTree(node){
			var sub = node.find('>ul');
			if(sub.length){
				node.find('>a').removeClass('expand-type-1').addClass('collaspe-type-1');
				node.find('>a').click(function(e){
					if(sub.css('display') == 'none'){
						node.find('>a').removeClass('collaspe-type-1').addClass('expand-type-1');
						sub.css({display: 'block'});
					} else {
						node.find('>a').removeClass('expand-type-1').addClass('collaspe-type-1');
						sub.css({display: 'none'});
					}
					return false;
				});
				sub.find('>li').each(function(){
					processTree($(this));
				});
			} else {
				node.find('>a').removeClass('expand-type-1 collaspe-type-1');
			}
		};
	};

	function imageSlider(){
		var layer = $('.caption-content');
		var ulCon = layer.find('>ul');
		var listCon = ulCon.find('>li');
		var next = layer.find('.next:first');
		var prev = layer.find('.previous:first');
		var cW = 242;
		var len = listCon.length;
		var cur = 0;
		var aniT = 500;
		var nDis = true;
		var pDis = false;

		if(len < 2) {
			next.hide();
			prev.hide();
			return;
		}
		ulCon.css({width: cW*len});

		listCon.each(function(i){
			i && $(this).find('p').hide();
		});
		prev.hide();

		next.click(function(e){
			e.preventDefault();
			if(cur < len - 1){
				if(!pDis){prev.fadeIn(300); pDis = true}
				listCon.eq(cur).find('>p').fadeOut(300);
				listCon.eq(cur + 1).find('>p').show();
				ulCon.stop().animate({
					'margin-left': '-' + (cur + 1)*cW
				}, aniT);
				cur = cur + 1;
				if(cur == len -1){next.fadeOut(300); nDis = false;}
			}
		});

		prev.click(function(e){
			e.preventDefault();
			if(cur >= 1){
				if(!nDis){next.fadeIn(300); nDis = true}
				listCon.eq(cur).find('>p').fadeOut(300);
				listCon.eq(cur - 1).find('>p').show();
				ulCon.stop().animate({
					'margin-left': '-' + (cur - 1)*cW
				}, aniT);
				cur = cur - 1;
				if(cur == 0){prev.fadeOut(300); pDis = false;}
			}
		});
	};

	function scrollTop(){
		//$('.top-page').hide();
		if($(document).innerHeight < $(window).innerHeight()*2){
			$('.top-page').hide();
			return;
		}

		$('.top-page').unbind('click.scrollTop').bind('click.scrollTop', function(){			
			$('html,body').animate({
				scrollTop: 0
			}, 1500);
			return false;
		});
	};

	function extendContent(){
		$('#expandTag').attr('title', L10N.expand);
		var divMain = $('.inner-main'),
			sideContent = divMain.find('#sidebar-left'),
			innersideContent = sideContent.find('.inner-sidebar-left'),
			divContent = divMain.find('#content'),
			newsContent = divContent.find('.news-content'),
			ulBlock = null,
			pagingBlock = null,
			aTag = sideContent.find('#expandTag'),
			oldWidth = null;			
			if(divContent.children().length){	
				oldWidth = divContent.children().outerWidth(true);
			}else{				
				oldWidth = divContent.width();
			}
			aTag.unbind('click.extendContent').bind('click.extendContent', function(){				
				ulBlock = newsContent.find('ul:first');
				pagingBlock = divContent.find('.paging-1');
				if($(this).hasClass('expand')){
					initAjaxLoad(newsContent);
					sideContent.animate({
						'margin-left': -234
					}, function(){					
						aTag.removeClass('expand').addClass('collaspe');
					});
					if($.browser.msie && $.browser.version < 9){						
						innersideContent.css('display', 'none');
					}
					innersideContent.animate({'opacity': 0});
					divContent.animate({'width': 900}, function(){
						$('#expandTag').attr('title', L10N.un_expand);
						if(aTag.attr('data-url')){
							$.ajax({
								'url': aTag.attr('data-url')+'?page='+indexPaging,
								'type': 'GET',
								success: function(result){
									if(isJson(result))			
									{
										result = $.parseJSON(result);
									}
									if ($.browser.msie && parseInt($.browser.version) < 8){
										result = $.parseJSON(result);									
									}												
									if($(result).length>=1){																				
										$(ulBlock).replaceWith(result.datablocks);
										removeAjaxLoad(newsContent);
										pagingBlock.replaceWith(result.pagingblocks);
										aTag.attr('data-url', result.url);
										pagingContent();	
									}else{
										removeAjaxLoad(newsContent);
									}
								}
							});
						}
					});
				}else{
					initAjaxLoad(newsContent);
					/*var cl = $('.news-content').find('ul>li');
					cl.eq(0).hide();
					cl.eq(1).hide();*/
					sideContent.animate({
						'margin-left': 0
					}, function(){					
						aTag.removeClass('collaspe').addClass('expand');					
					});
					if($.browser.msie && $.browser.version < 9){
						innersideContent.css('display', 'block');
					}
					innersideContent.animate({'opacity': 1});				
					divContent.animate({'width': oldWidth}, function(){
						$('#expandTag').attr('title', L10N.expand);
						if(aTag.attr('data-url')){
							$.ajax({
								'url': aTag.attr('data-url')+'?page='+indexPaging,
								'type': 'GET',
								success: function(res){
									if(isJson(res))			
									{
										res = $.parseJSON(res);
									}
									if ($.browser.msie && parseInt($.browser.version) < 8){
										res = $.parseJSON(res);
									}
									if($(res).length>=1){
										ulBlock.replaceWith(res.datablocks);
										removeAjaxLoad(newsContent);
										pagingBlock.replaceWith(res.pagingblocks);
										aTag.attr('data-url',res.url);
										pagingContent();
									}else{
										removeAjaxLoad(newsContent);
									}	
								}
							});
						}
					});	
				}				
				return false;
			});	
	};
	
	function pagingContent(){
		if($('#noPagingAjax').length){
			return false;
		}else{		
		var divMain = $('.inner-main'),
			divContent = divMain.find('#content'),
			newsContent = divContent.find('.news-content'),
			ulBlock = newsContent.find('ul:first'),
			pagingBlock = divContent.find('.paging-1'),
			ulPaging = pagingBlock.find('ul:first'),
			liTags = ulPaging.children();	
			liTags.each(function(idx){
				var liTag = $(this);				
				liTag.unbind('click.pagingContent').bind('click.pagingContent', function(){					
					if(liTag.hasClass('current')){
						return false;
					}
					if(liTag.hasClass('btnPrevious')){
						$.ajax({
							'url': $(this).find('a:first').attr('href'),
							'type': 'GET',
							beforeSend: function(){
								initAjaxLoad(newsContent);
							},
							success: function(res){
								if(isJson(res))			
								{
									res = $.parseJSON(res);
								}
								if ($.browser.msie && parseInt($.browser.version) < 8){
									res = $.parseJSON(res);
								}
								indexPaging = res.page;
								ulBlock.replaceWith(res.datablocks);
								removeAjaxLoad(newsContent);
								pagingBlock.replaceWith(res.pagingblocks);							
								pagingContent();	
							}
						});
						return false;
					}
					if(liTag.hasClass('btnNext')){
						$.ajax({
							'url': $(this).find('a:first').attr('href'),
							'type': 'GET',
							beforeSend: function(){
								initAjaxLoad(newsContent);
							},
							success: function(res){
								if(isJson(res))			
								{
									res = $.parseJSON(res);
								}
								if ($.browser.msie && parseInt($.browser.version) < 8){
									res = $.parseJSON(res);
								}
								indexPaging = res.page;
								ulBlock.replaceWith(res.datablocks);
								removeAjaxLoad(newsContent);
								pagingBlock.replaceWith(res.pagingblocks);							
								pagingContent();	
							}
						});
						return false;
					}
					$.ajax({
						'url': $(this).find('a:first').attr('href'),
						'type': 'GET',
						beforeSend: function(){
							initAjaxLoad(newsContent);
						},
						success: function(res){
							if(isJson(res))			
							{
								res = $.parseJSON(res);
							}
							if ($.browser.msie && parseInt($.browser.version) < 8){
								res = $.parseJSON(res);
							}
							indexPaging = res.page;
							ulBlock.replaceWith(res.datablocks);
							removeAjaxLoad(newsContent);
							pagingBlock.replaceWith(res.pagingblocks);							
							pagingContent();	
						}
					});
					return false;
				});
			});
			}
	};
	
	function initAjaxLoad(ele) {	
		var jcontainer = $(ele),
			divLoading = $('<div class="loading-page"></div>').appendTo(jcontainer);		
	};
	
	function removeAjaxLoad (ele) {
		var jcontainer = $(ele);
			jcontainer.find('.loading-page').animate({
				'opacity': 0
			}, 1000, function(){
				$(this).remove();
			})
	};
	
	function isJson (json){
		try {
			JSON.parse(json);
		} catch (e) {
			return false;
		}
		return true;
	};
	
	function googleMap(){
		if($('.map').length){
			var myOptions = {
			  zoom: 16,
			  center: new google.maps.LatLng(latitude || L10N.location.la, longitude || L10N.location.lo),
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map($('.map:first')[0], myOptions);
			var marker = new google.maps.Marker({
				position: map.getCenter(),
				map: map,
				title: title
			});

			/*var infoWindow = new google.maps.InfoWindow({
				position: map.getCenter(),
				map: map,
				content: '<div style="width:200px;height:30px">Viện Pasteur<br/>Thành Phố Hồ Chí Minh</div>'
			});*/
		}
	};
	
	function formValidate(){
		var form1 = $('#contact-form');
		var form2 = $('#recruitment-form');
		var form3 = $('#search-block-form');
		
		form1.smValidator({
			rules: {
				'name': {
					valid: {
						required: true
					},								
					duration: 1000,
					message: {
						required: L10N.required.name
					}
				},
				'email': {
					valid: {
						required: true,
						email: true
					},								
					duration: 1000,
					message: {
						required: L10N.required.email,
						email: L10N.valid.email
					}
				},
				'message': {
					valid: {
						required: true
					},								
					duration: 1000,
					message: {
						required: L10N.required.contactInfo
					}
				}							
			},
			errorOption: 1
		});

		form2.smValidator({
			rules: {
				'full_name': {
					valid: {
						required: true
					},								
					duration: 1000,
					message: {
						required: L10N.required.name
					}
				},
				'mail': {
					valid: {
						required: true,
						email: true
					},								
					duration: 1000,
					message: {
						required: L10N.required.email,
						email: L10N.valid.email
					}
				},
				'telephone': {
					allowChar: 'number',
					valid: {
						required: true						
					},								
					duration: 1000,
					message: {
						required: L10N.required.phone
					}
				},
				'files[file_application_letter]': {
					valid: {
						required: true
					},								
					duration: 1000,
					message: {
						required: L10N.required.person
					}
				},
				'files[file_application_cv]': {
					valid: {
						required: true
					},								
					duration: 1000,
					message: {
						required: L10N.required.cv
					}
				},
				'captcha_response': {
					valid: {
						required: true
					},								
					duration: 1000,
					message: {
						required: L10N.required.capcha
					}
				}										
			},
			errorOption: 1
		});

		form3.smValidator({
			rules: {
				'search_block_form': {
					init: L10N.search,
					valid: {
						required: true,
						minLen: 3
					},								
					duration: 1000,
					message: {
						required: L10N.required.search,
						minLen: L10N.valid.search
					}
				}							
			},
			errorOption: 1
		});

		$('.btn-send').bind('click',function(evt){
			form1.submit();
			evt.preventDefault();
		});

		$('.btn-upload').bind('click',function(evt){
			form2.submit();
			evt.preventDefault();
		});
		$('.btn-reset').bind('click',function(evt){
			form1.get(0).reset();
			$('[name="select-vacxin"]').closest('.select-type-03').find('span:first').text(form1.find('option:eq(0)').text());
			evt.preventDefault();
		});
		$('.btn-search').bind('click', function(evt){
			form3.submit();
			evt.preventDefault();
		});

		if($('#popup-alert').length){
			$('#popup-alert').prepend('<a href="#" title="'+ L10N.close +'" class="lnk-close">x</a>').smLayer({
				position: 'center',
				animation: true,
				autoOpen: true,
				removeOnClose: false,
				closeButtons: '.lnk-close',
				overlay: 'sm-overlay',
				opacity: 0.5,
				duration: 400,
				easing: 'linear',
				zIndex: 1000
			});
			//$('#popup-alert').smLayer('open');
		};
	};

	function printProcess(){
		$('#m-print').bind('click', function(){
			print();
		});
	};
	
	return {		
		init: function(){
			banner();
			customSelect();
			gallery();
			treeView();
			accordion();
			imageSlider(); 
			scrollTop();
			extendContent();
			googleMap();
			pagingContent();
			formValidate();
			printProcess();
		}
		
	};
})(jQuery, window);

/**
 * Website start here
 **/
jQuery(document).ready(function(){
	Pasteur.init();
});