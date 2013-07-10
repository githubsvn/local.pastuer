/**
 * Global variables
 **/
/**
 * Global variables and functions
 */
 
var Pasteur = (function($, window, undefined){	 
	var privateVar = 1;
	
	function accordion(){
		if($('.block-type-2').length){			
			$('#ulContent').smAccordion({				
				clsActive: 'active',
				vertical:true
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
					window.location.href = this.originDL.val();
				},
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
		ulCtr.css({width: controls.len*iW});
		imgList.each(function(i){ i && $(this).css({display:'none'});});
		prev.css({display:'none'});

		next.click(function(){
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
			}
		});

		prev.click(function(){
			if(cur && notRun){
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
								'margin-left': '0px'
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
			} else if(nDis){next.fadeOut(300); nDis = false}
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
			} else if(pDis){prev.fadeOut(300); pDis = false}
		});
	};

	function scrollTop(){
		$('.top-page').click(function(){
			window.scroll(0,0);
		});
	};

	function extendContent(){
		var divMain = $('.inner-main'),
			sideContent = divMain.find('#sidebar-left'),
			innersideContent = sideContent.find('.inner-sidebar-left'),
			divContent = divMain.find('#content'),
			aTag = sideContent.find('#expandTag')
			oldWidth = divContent.children().outerWidth(true);
			sideContent.css('height', sideContent.outerHeight(true));
			aTag.unbind('click.extendContent').bind('click.extendContent', function(){				
				if($(this).hasClass('expand')){
					sideContent.animate({
						'margin-left': -234
					}, function(){					
						aTag.removeClass('expand').addClass('collaspe');
					});
					innersideContent.animate({'opacity': 0});
					divContent.animate({'width': 895});
				}else{
					sideContent.animate({
						'margin-left': 0
					}, function(){					
						aTag.removeClass('collaspe').addClass('expand');					
					});
					innersideContent.animate({'opacity': 1});					
					divContent.animate({'width': oldWidth});	
				}
				return false;
			});	
	};

	function googleMap(){
		if($('#map').length){
			var myOptions = {
			  zoom: 16,
			  center: new google.maps.LatLng(10.7865785, 106.6894179),
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById('map'), myOptions);
			var marker = new google.maps.Marker({
				position: map.getCenter(),
				map: map,
				title: 'Viện Pasteur TP.HCM'
			});
			var infoWindow = new google.maps.InfoWindow({
				position: map.getCenter(),
				map: map,
				content: '<div style="width:200px;height:30px">Viện Pasteur<br/>Thành Phố Hồ Chí Minh</div>'
			});
		}
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
		}
		
	};
})(jQuery, window);

/**
 * Website start here
 **/
jQuery(document).ready(function(){
	Pasteur.init();
});