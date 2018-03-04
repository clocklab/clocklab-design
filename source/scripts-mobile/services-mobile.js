//= include ./libraries/jquery-3.2.1.min.js

//= include ./libraries/wow.js

//= include ./components/menu.js

//= include ./components/scroll-menu.js

new WOW().init();

$('.toggle').click(function() {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
	} else {
		$(this).addClass('active');
	}
});