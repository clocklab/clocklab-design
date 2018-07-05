$('#questions').hide();

$(document).on('click', 'a[href="#questions"]', function(event) {
    event.preventDefault();
	$('#questions').show();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

$(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});