document.addEventListener('DOMContentLoaded', () => {
    const bigGallerySlides = document.querySelectorAll('.alta-capital .image-container img'),
          nextGallerySlides = document.querySelectorAll('.alta-capital .slide-controls--next-slide img'),
          previousGallerySlides = document.querySelectorAll('.alta-capital .slide-controls--previous-slide img')

    const currentSlideText = document.querySelector('.alta-capital .indicators .current-slide'),
          startSlideIndex = 0

    const btnRight = document.querySelector('.alta-capital .slide-controls--next-slide'),
          btnLeft = document.querySelector('.alta-capital .slide-controls--previous-slide')

    const setSlide = (index, direction) => {
        const currentSlides = document.querySelectorAll('.alta-capital img.current'),
              nextGallerySlide = nextGallerySlides[index + 1] || nextGallerySlides[0]
              previousGallerySlide = previousGallerySlides[index - 1] || previousGallerySlides[previousGallerySlides.length - 1]

        currentSlideText.innerText = `${index + 1}`

        currentSlides.forEach(slide => slide.classList.remove('current', 'left', 'right'))

        bigGallerySlides[index].classList.add('current');
        nextGallerySlide.classList.add('current');
        previousGallerySlide.classList.add('current');

        if (direction) {
            const apearDirection = direction === 'right'
            ? 'right'
            : 'left'

            bigGallerySlides[index].classList.add(apearDirection);
            nextGallerySlide.classList.add(apearDirection);
            previousGallerySlide.classList.add(apearDirection);
        }
    }

    setSlide(startSlideIndex)

    btnRight.addEventListener('click', () => {
        const currentIndex = parseInt(document.querySelector('.alta-capital .indicators .current-slide').innerText) - 1,
              newIndex = bigGallerySlides[currentIndex + 1]
              ? currentIndex + 1
              : 0

        bigGallerySlides[0].classList.contains('loaded') &&
        bigGallerySlides.forEach(slide => slide.classList.remove('loaded'))

        setSlide(newIndex, 'right') 
    })

    btnLeft.addEventListener('click', () => {
        const currentIndex = parseInt(document.querySelector('.alta-capital .indicators .current-slide').innerText) - 1,
              newIndex = bigGallerySlides[currentIndex - 1]
              ? currentIndex - 1
              : bigGallerySlides.length - 1

        bigGallerySlides[0].classList.contains('loaded') &&
        bigGallerySlides.forEach(slide => slide.classList.remove('loaded'))

        setSlide(newIndex, 'left') 
    })
});