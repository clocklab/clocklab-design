//=include ./../components/questions.js

//=include ./../components/open-form.js

//=include ./../components/scroll-menu.js

new WOW().init();

// complex-time.js
const watch = document.querySelector('.complex .watch'),
      watchSectors = Array.prototype.slice.call(document.querySelectorAll('.watch-sectors .sector')),
      watchTicks = Array.prototype.slice.call(document.querySelectorAll('.watch-ticks .watch__tick')),
      watchInfos = Array.prototype.slice.call(document.querySelectorAll('.complex-time p')),
      watchCore = document.querySelector('.complex .watch-core')

let watchSizes = {}
let cursorPos = {}

const classToggler = arr => {
    arr.forEach(el => el && el.classList.toggle('current'))
}

const checkDocumentScroll = () => {
    setWatchSizes()
    getSector(false, true)
}

const setWatchSizes = () => {
    watchSizes.top = watch.getBoundingClientRect().top
    watchSizes.left = watch.getBoundingClientRect().left
    watchSizes.width = watch.getBoundingClientRect().width
    watchSizes.height = watch.getBoundingClientRect().height
}

function openInfo() {
    const currentSector = document.querySelector('.watch-sectors .current'),
          index = watchSectors.indexOf(currentSector),
          currentInfo = document.querySelector('.complex-time p.current')

    let nextInfo = 0;

    switch (index) {
        case 0:
            nextInfo = watchInfos[0]
            break;
        case 1:
            nextInfo = watchInfos[2]
            break;
        case 2:
            nextInfo = watchInfos[1]
            break;
        case 3:
            nextInfo = watchInfos[3]
            break;
    }

    if (currentInfo !== nextInfo) {
        currentInfo && classToggler([currentInfo])
        classToggler([nextInfo])
    }
}

function getSector(event, scroll) {
    if (!scroll) {
        cursorPos.x = event && event.clientX,
        cursorPos.y = event && event.clientY
    }

    const currentSector = document.querySelector('.watch-sectors .current')
    const currentTicks = document.querySelectorAll('.watch-ticks .current')

    currentSector && classToggler([...currentTicks, currentSector])

    if (cursorPos.y < watchSizes.top + watchSizes.height / 2) {
        cursorPos.x < watchSizes.left + watchSizes.width / 2
        ? classToggler([watchSectors[0], ...watchTicks.slice(45, 60), watchTicks[0]])
        : classToggler([watchSectors[1], ...watchTicks.slice(0, 16)])
    } else {
        cursorPos.x < watchSizes.left + watchSizes.width / 2
        ? classToggler([watchSectors[2], ...watchTicks.slice(30, 46)])
        : classToggler([watchSectors[3], ...watchTicks.slice(15, 31)])
    }
}

watch.addEventListener('mouseenter', () => {
    document.addEventListener('scroll', checkDocumentScroll)
    watch.addEventListener('click', openInfo)
    watch.addEventListener('mousemove', getSector)
    watch.addEventListener('mouseleave', () => {
        document.removeEventListener('scroll', checkDocumentScroll)
        watch.removeEventListener('click', openInfo)
        watch.removeEventListener('mousemove', getSector)
        watchCore.classList.remove('disabled')

        const currentSector = document.querySelector('.watch-sectors .current')
        const currentTicks = document.querySelectorAll('.watch-ticks .current')
        const currentInfo = document.querySelector('.complex-time p.current')

        currentInfo && classToggler([currentInfo])
        classToggler([...currentTicks, currentSector])
    })

    watchCore.classList.add('disabled')

    setWatchSizes()
    
    getSector()
})