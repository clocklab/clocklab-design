// ~~~~~~~~~~~~ Mobile Questions ~~~~~~~~~~~~
;(function() {
    const animate = (draw, duration) => {
		const start = performance.now();
	  
		requestAnimationFrame(function animate(time) {
			let timePassed = time - start;
		
			timePassed = timePassed > duration
			? duration
			: timePassed
		
			draw(timePassed);
		
			timePassed < duration &&
			requestAnimationFrame(animate)
		});
    }

    var btns = [].slice.call(document.querySelectorAll('.content-title'));
    var texts = [].slice.call(document.querySelectorAll('.text'));
    var animationTime = 300;
	var toggleClass = 'active';

    function openCloseText() {
        this.removeEventListener('click', openCloseText);
		var text = texts[btns.indexOf(this)];

		if (this.classList.contains(toggleClass)) {
			var wantedHeight = text.offsetHeight;

			animate((timePassed) => {
				text.style.height = `${wantedHeight - timePassed / (animationTime / wantedHeight)}px`;
			}, animationTime);

			setTimeout(() => {
				text.style.height = '';
				text.style.display = '';
				this.addEventListener('click', openCloseText);
			}, animationTime + 100);
		} else {
			text.style.display = 'block';
			var wantedHeight = text.offsetHeight;
			text.style.height = '0px';
		
			animate((timePassed) => {
				text.style.height = `${timePassed / (animationTime / wantedHeight)}px`
			}, animationTime);
		
			setTimeout(() => {
				text.style.height = '';
				this.addEventListener('click', openCloseText);
			}, animationTime + 100);
		}

		this.classList.toggle(toggleClass);
    }

    btns.forEach(btn => btn.addEventListener('click', openCloseText));
})();