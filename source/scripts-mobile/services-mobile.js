;
(function() {
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

	var itemTogglers = [].slice.call(document.querySelectorAll('.item-toggler'));
	var lists = [].slice.call(document.querySelectorAll('.inner-list'));
	var animationTime = 300;
	var toggleClass = 'active';


	function clickHandler()	{
		this.removeEventListener('click', clickHandler);
		var submenu = lists[itemTogglers.indexOf(this)];

		if (this.classList.contains(toggleClass)) {
			var wantedHeight = submenu.offsetHeight;

			animate((timePassed) => {
				submenu.style.height = `${wantedHeight - timePassed / (animationTime / wantedHeight)}px`;
			}, animationTime);

			setTimeout(() => {
				submenu.style.height = '';
				submenu.style.display = '';
				this.addEventListener('click', clickHandler);
			}, animationTime + 100);
		} else {
			submenu.style.display = 'block';
			var wantedHeight = submenu.offsetHeight;
			submenu.style.height = '0px';
		
			animate((timePassed) => {
				submenu.style.height = `${timePassed / (animationTime / wantedHeight)}px`
			}, animationTime);
		
			setTimeout(() => {
				submenu.style.height = '';
				this.addEventListener('click', clickHandler);
			}, animationTime + 100);
		}

		this.classList.toggle(toggleClass);
	}

	itemTogglers.forEach((itemToggler) => itemToggler.addEventListener('click', clickHandler));
})();