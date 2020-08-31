$(document).ready(function(){
	var slider = $('.block-5 .reviews');
	var sliderWrapper = slider.find('.reviews-wrapper');
	var arrows = slider.find('.arrow-left, .arrow-right');
	var pane = slider.find('.reviews-pane');
	var slides = slider.find('.review');
	var currentSlide = 0;

	sliderWrapper.css('height', calculateSliderParams(sliderWrapper, slides, pane) + 42 + 'px');
	pane.css('height', calculateSliderParams(sliderWrapper, slides, pane) + 'px');
	slides.css('height', '100%');
	
	calculateSliderParams(sliderWrapper, slides, pane);

	
	$(window).resize(function(){
		calculateSliderParams(sliderWrapper, slides, pane);
		slides.css('height', 'auto');
		sliderWrapper.css('height', calculateSliderParams(sliderWrapper, slides, pane) + 42 + 'px');
		pane.css('height', calculateSliderParams(sliderWrapper, slides, pane) + 'px');
		slides.css('height', '100%');
	});

	setInterval(function(){
		(currentSlide + 1) > slides.length - 1 ? currentSlide = 0 : currentSlide++;
		slideTo(currentSlide, pane, sliderWrapper);
	}, 8000);

	arrows.on('click', function(){
		var targetSlide;
		if ($(this).hasClass('arrow-left')){
			(currentSlide - 1) < 0 ? currentSlide = slides.length - 1 : currentSlide--;
		} else if($(this).hasClass('arrow-right')){
			(currentSlide + 1) > slides.length - 1 ? currentSlide = 0 : currentSlide++;
		} 
		slideTo(currentSlide, pane, sliderWrapper);
	});

	//popup
	var popup = $('.popup.fader');
	var closePopup = popup.find('#close-popup');
	closePopup.on('click', function(){
		popup.fadeOut(200);
	});

	$('*[data-action="open-popup"]').on('click', function(e){
		e.preventDefault();
		popup.fadeIn(200);
	});

	
});



function calculateSliderParams(sliderWrapper, slides, pane){
	var wrapperWidth = sliderWrapper.outerWidth();
	slides.css('width', wrapperWidth - 50 + 'px');
	pane.css('width', slides.length * wrapperWidth + 'px');
	var maxHeight = 0;
	$.each(slides, function(key, slide){
		
		maxHeight = Math.max($(slide).outerHeight(), $(slides[key - 1]).outerHeight() );
	});
	return maxHeight;
}

function slideTo(currentSlide, pane, sliderWrapper){
	pane.animate({
		left: sliderWrapper.outerWidth() * currentSlide * (-1)
	}, 400);
}
