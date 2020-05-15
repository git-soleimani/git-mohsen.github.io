$(document).ready(function(){
	
	$('.modal').modal();
    $('.tooltipped').tooltip();
	$('.datepicker').datepicker();
	$('.tabs').tabs();
	
	$('select').formSelect();
	$('.datepicker').datepicker({
		'container':'body',
		'format':'dd.mm.yyyy'
	});
	AOS.init();
	
	$('#cookie-btn').on('click',function(){
        $('#cookie-div').fadeOut(1000);
		
		exdays = 365;
		cname = 'mtbag_cookie_allowed';
		cvalue = '1';
		
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    });
});