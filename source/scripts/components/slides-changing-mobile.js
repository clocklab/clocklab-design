document.addEventListener('DOMContentLoaded', () => {
    const blocks = Array.prototype.slice.call(document.querySelectorAll('.screen-block'))
    const pageHeight = document.body.offsetHeight
    const dif = 0

    const scrollCheck = () => {
        const blocksTopPos = blocks.map(block => block.getBoundingClientRect().top)

        blocksTopPos.forEach((topPos, index) => {
            topPos < (pageHeight + dif) &&
            blocks[index].classList.add('current-slide')
        })
    }

    document.addEventListener('scroll', scrollCheck)

    scrollCheck()
})