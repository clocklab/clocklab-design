// ~~~~~~ OPEN MENU ~~~~~~
;(function() {
    const menu = document.querySelector('#menu');
    const menuSwitcher = document.querySelector('#menu-switcher');
    const languages = document.querySelector('#languages');

    function changeMenu(e) {
        if (e.target === this ) {
            menu.removeEventListener('transitionend', changeMenu);
            window.pageYOffset && menu.classList.add('scrolled');
            document.body.removeAttribute('style');
            menuSwitcher.addEventListener('click', toggleMenu);
        }
    }

    function addListener(e) {
        languages.removeEventListener('transitionend', addListener);
        menuSwitcher.addEventListener('click', toggleMenu);
    }

    function openMenu() {
        document.body.style.overflow = 'hidden';
        menu.classList.add('opened');
        menu.classList.remove('scrolled');
        languages.addEventListener('transitionend', addListener);
    }

    function closeMenu() {
        menu.classList.remove('opened');
        menu.addEventListener('transitionend', changeMenu);
    }

    function toggleMenu() {
        menuSwitcher.removeEventListener('click', toggleMenu);
        menu.matches('.opened') ? closeMenu() : openMenu();
    }

    menuSwitcher.addEventListener('click', toggleMenu);
})();
// ~~~~~~ OPEN MENU ~~~~~~


// ~~~~~~ MENU AND LOGO CHANGE COLOR ~~~~~~
;(function() {
    const logo = document.querySelector('#logo');
    const menu = document.querySelector('#menu');
    const blocks = document.querySelectorAll('[data-top-panel-bg]');
    const DELTA = 20;

    const addClasses = (arr, wantedClass) => {
        arr.forEach(el => {
            !el.matches(`.${wantedClass}`) && el.classList.add(wantedClass);
        });
    }

    const removeClasses = (arr, unwantedClass) => {
        arr.forEach(el => {
            el.matches(`.${unwantedClass}`) && el.classList.remove(unwantedClass);
        });
    }

    const checkCurrentBlockBackground = () => {
        blocks.forEach(block => {
            if (block.getBoundingClientRect().top <= DELTA && block.getBoundingClientRect().bottom >= DELTA) {
                block.dataset.topPanelBg === 'light'
                ? addClasses([logo, menu], 'light')
                : removeClasses([logo, menu], 'light');
            }
        })
    }

    const checkWindowTopPos = () => {
        window.pageYOffset
        ? addClasses([logo, menu], 'scrolled')
        : removeClasses([logo, menu], 'scrolled');
    }

    if (blocks.length > 1) {
        window.addEventListener('scroll', checkCurrentBlockBackground);
        window.addEventListener('resize', checkCurrentBlockBackground);
    }

    window.addEventListener('scroll', checkWindowTopPos);

    checkCurrentBlockBackground();
})();
// ~~~~~~ MENU AND LOGO CHANGE COLOR ~~~~~~


// ~~~~~~ SCROLL TO TOP ~~~~~~
;(function() {
    const btn = document.querySelector('#scroll-to-top');

    btn && btn.addEventListener('click', () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    })
})();
// ~~~~~~ SCROLL TO TOP ~~~~~~


// ~~~~~~ OPEN FORM ~~~~~~
;(function() {
    const openBtn = document.querySelector('#open-form');

    if (openBtn) {
        const form = document.querySelector('#form');
        const closeBtn = form.querySelector('#close-form');
        const inputs = form.querySelectorAll('.form__field');


        function openForm() {
            form.classList.add('opened');
            document.body.style.overflow = 'hidden';
        }

        function closeForm() {
            form.classList.remove('opened');
            document.body.removeAttribute('style');
        }

        function checkInput() {
            this.value.trim()
            ? this.classList.add('filled')
            : this.classList.remove('filled');
        }


        inputs.forEach(input => input.addEventListener('blur', checkInput));
        openBtn.addEventListener('click', openForm);
        closeBtn.addEventListener('click', closeForm);
    }
})();
// ~~~~~~ OPEN FORM ~~~~~~


// ~~~~~~ OPEN QUESTIONS ~~~~~~
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

    btns.length && btns.forEach(btn => btn.addEventListener('click', openCloseText));
})();
// ~~~~~~ OPEN QUESTIONS ~~~~~~