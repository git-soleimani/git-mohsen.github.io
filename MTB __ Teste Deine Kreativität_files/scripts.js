$(document).ready(function(){
	
	setTimeout("$('.poster-div #poster-h1').fadeIn(1000)",800);
	setTimeout("$('.poster-div #poster-span').fadeIn(1000)",2000);
	setTimeout("$('.poster-div #poster-a').fadeIn(1000)",1200);
	
	$('.tabs-fuhrun').tabs({
		'onShow':function() {
			if($("#tabs-furungsstil a.active").attr('id')=='link-erwartungen') {
				$('.pushpin-erwa').each(function() {
					var $h6title = $(this);
					var $targetdiv = $('#' + $h6title.attr('data-target'));
					
					offsetTop=($h6title.offset().top-$('#erwartungen .subcat-title').offset().top) + ($('.masthead').height() + $('#tabs-furungsstil').height());
					
					$h6title.pushpin({
					  'top': offsetTop - 40,
					  'bottom': offsetTop + $targetdiv.outerHeight() - $h6title.height() - 20,
					  'offset':48
					});
				  });
			}
		}
	});
	
	
	$('.pushpin-parent-nav').pushpin({
		'top':126,
		'onPositionChange':function(){
			if($('.pushpin-parent-nav').hasClass("pinned"))
				$('.tab-content-div').css('margin-top','70px');
			else
				$('.tab-content-div').css('margin-top','20px');
		}
	});
	$('.pushpin-sub-nav').pushpin({
		'top':174,
		'offset':48
	});
	
	
	$('#x-btn-navbar').on('click',function(){
        $("#x-nav-wrap-mobile").slideToggle();
    });
	
	
	$('.email-invite').on('click',function() {
		$("#modal-invite").find('#txtcat').val($(this).attr('data-link'));
        $("#modal-invite").modal('open');
    });
	
	
	$('#reg-user').click(function(){
		$('#div-which').slideUp();
		$('#div-berater').slideUp();
		$('#div-user').slideDown();
	});	
	
	
	$('#reg-berater').click(function(){
		$('#div-which').slideUp();
		$('#div-user').slideUp();
		$('#div-berater').slideDown();
	});

	
	$('.back-which').click(function(){
		$('#div-berater').slideUp();
		$('#div-user').slideUp();
		$('#div-which').slideDown();
	});
	
	
	$('.reguser-nextback').click(function(){
		
		var checker = $(this).attr('data-check');
		if (typeof checker !== typeof undefined && checker !== false) {
			if(checker=='emailandname') {
				vorname = $('form#div-user input#name').val();
				email = $('form#div-user input#email').val();
				
				var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				
				if(vorname.length<1) {
					M.toast({html: 'Bitte geben Sie Ihren Namen ein!', classes: 'tab-tooltip', displayLength:1500});
					return;
				}
				if(email.length<1) {
					M.toast({html: 'Bitte geben Sie Ihre E-Mail Adresse ein!', classes: 'tab-tooltip', displayLength:1500});
					return;
				}
				if(!regexEmail.test(email)) {
					M.toast({html: 'E-Mail Adresse ist nicht Korrekt!', classes: 'tab-tooltip', displayLength:1500});
					return;
				}
			}
		}
		
		$('#'+$(this).attr('data-current')).slideUp();
		$('#'+$(this).attr('data-tab')).slideDown();
	});
	
	/*
	// scroll to next question
	$('.home-container label').click(function() {
		if(($(this).find("input[type='checkbox']").length == 0))
			$("html, body").animate({scrollTop: $(this).offset().top}, 500);  
	});
	*/
	
	
	$('#get-start-btn').on('click',function(){
		$('html, body').animate({
            scrollTop: $('#login-section').offset().top
        }, 1000);
	});
	
	
	
	// Disabled LetsGo CAQ button if no category select
	$(".chbox-anfang").on('change',function() {
		disabled=true;
		$(".chbox-anfang").each(function(){
			if($(this).prop('checked')==true) {
				$('#caq-start-btn').removeClass('disabled');
				disabled=false;
			}
		});
		if(disabled)
			$('#caq-start-btn').addClass('disabled');
	});
	
	$(".finish-btn-modal").click(function(event) {
		
		if(checkAllAnswered($(this))) {
			var instance = M.Modal.getInstance($("#modal-email"));
			instance.open();
		}
	});
	
	$(".finish-btn").click(function(event) {
		
		if(checkAllAnswered($(this))) {
			$('#questoins-form').submit();
		}
	});
	
	$(".nexttab-btn").click(function() {
				
		if(checkAllAnswered($(this))) {
			
			parentTab= $('#'+$(this).attr('data-parenttab'));
			activeTab= parentTab.find('.active');
			
			parentTab.tabs('select', activeTab.parent().nextAll('li').not('.disabled').first().attr('data-tabid'));
			$('html, body').animate({
				scrollTop: 0
			}, 200);	
			
			
			// IN CAQ IF NO NEXT TAB, SHOW FINISH BUTTON
			$('#tab-main-caq .finish').addClass('hide');
			$('#tab-main-caq .nexttab-btn').addClass('hide');
			
			activatedTabId = activeTab.parent().nextAll('li').not('.disabled').first().attr('data-tabid');
			activatedTab = $('li[data-tabid='+activatedTabId+'] a');
			nextTab = activatedTab.parent().nextAll('li').not('.disabled').first().attr('data-tabid');
			if(typeof nextTab == typeof undefined) {
				$('#tab-main-caq .finish').removeClass('hide');
			} else {
				$('#tab-main-caq .nexttab-btn').removeClass('hide');
			}
		}
	});
	$(".prevtab-btn").click(function() {
		parentTab= $('#'+$(this).attr('data-parenttab'));
		activeTab= parentTab.find('.active');
		parentTab.tabs('select', activeTab.parent().prevAll('li').not('.disabled').first().attr('data-tabid'));
		$('html, body').animate({
            scrollTop: 0
        }, 200);
	});
	
	
	$(".goto-caq").on('click',function(){
		$('.parent-tabs').tabs('select', 'tab-main-caq');
		$('html, body').animate({
            scrollTop: 0
        }, 200);
	});	
	
	$(".goto-furungsstil").on('click',function(){
		$('.parent-tabs').tabs('select', 'tab-main-furungsstil');
		$('html, body').animate({
            scrollTop: 0
        }, 200);
	});	
	
	$(".goto-coi").on('click',function(){
		$('.parent-tabs').tabs('select', 'tab-main-coi');
		$('html, body').animate({
            scrollTop: 0
        }, 200);
	});	
	
	$(".goto-innovation").on('click',function(){
		$('.parent-tabs').tabs('select', 'tab-main-innovation');
		$('html, body').animate({
            scrollTop: 0
        }, 200);
	});	
	
	$('.chbox-anfang').on('change',function(){
		key = $(this).attr('data-key');
		$("#tabs-caq").find("[data-tabid='"+key+"']").toggleClass('disabled');
	});
	
	$('#favcaq_selall').on('change',function(){
		$('.chbox-anfang').prop('checked',$(this).prop('checked'));
		$('input[name=favcaq_last]').prop('checked',true);
		if($(this).prop('checked')) {
			$("#tabs-caq li").not("[data-tabid=anfang]").removeClass('disabled');
		} else {
			$("#tabs-caq li").not("[data-tabid=anfang]").addClass('disabled');
		}
		
		$("#tabs-caq").find("[data-tabid='last']").removeClass('disabled');
	});
	
	
	$('#check-agree').click(function(){
		$('#user-submit').attr('disabled', !$(this).prop('checked'));
	});
	
	
	$('.copy-icon').on('click',function(){
		var link = $(this).prev();
		$('body').append('<input type="text" value="'+link.html()+'" id="copy-link" />');
		$('#copy-link').select();
		document.execCommand("copy");
		$('#copy-link').remove();
		
		M.toast({html: 'Kopiert!', displayLength:500});
	});	
	
	
	// PDF EXPORT
	$('#exportpdf').click(function(event) {
		
		var instance = M.Modal.getInstance($('#modal-pdf'));
		instance.open();
		
		setTimeout(function(){
			aomoChart = document.getElementById('canvas-aomo').toDataURL('image/png');
			$('#input-aomo').val(aomoChart);
			
			aoMoNoGridChart = document.getElementsByClassName('canvas-aomo-nogrid')[0].toDataURL('image/png');
			$('#input-aomo-nogrid').val(aoMoNoGridChart);
			
			
			aufgabenChart = document.getElementById('canvas-Aufgaben').toDataURL('image/png');
			$('#input-Aufgaben').val(aufgabenChart);
			
			mitarbeiterChart = document.getElementById('canvas-Mitarbeiter').toDataURL('image/png');
			$('#input-Mitarbeiter').val(mitarbeiterChart);
			
			kollegenChart = document.getElementById('canvas-Kollegen').toDataURL('image/png');
			$('#input-Kollegen').val(kollegenChart);
			
			vorgesetzteChart = document.getElementById('canvas-Vorgesetzte').toDataURL('image/png');
			$('#input-Vorgesetzte').val(vorgesetzteChart);
			
			organizationChart = document.getElementById('canvas-Organization').toDataURL('image/png');
			$('#input-Organization').val(organizationChart);
			
			$('#print-form').submit();
			
			instance.close();
		}, 3000);
	});
	
	$('.archive-btn').on('click',function(){
		if(confirm('Bist du sicher?')) {
			$(this).parent().submit();
		}
	});
	
});

function checkAllAnswered(elem) {

	className = elem.attr('data-tabname');
	if(typeof className !== 'undefined')
		className="."+className;
	else {
		return true;
	}
	
	var names = {};
	$(className).each(function() {
		names[$(this).attr('name')] = true;
	});
	var count = 0;
	$.each(names, function() { 
		count++;
	});
	if ($(className+':checked').length === count) {
		return true;

	} else {
		
		cookies = document.cookie;
		cookies=cookies.split(';');
		ln = "DE";
		console.log(jQuery.inArray(" mtb_l=EN", cookies));
		if(jQuery.inArray(" mtb_l=EN", cookies) > 0)
			ln="EN";
		
		var toastHTML = '<span>Beantworten Sie bitte alle Fragen!</span>';
		if(ln=='EN')
			var toastHTML = '<span>Please answer all questions!</span>';
		M.toast({html: toastHTML, classes: 'tab-tooltip'});
	}
}

function parseDate(input) {
 var datecomp= input.split('.');
  return new Date(datecomp[2], datecomp[1]-1, datecomp[0]);
}