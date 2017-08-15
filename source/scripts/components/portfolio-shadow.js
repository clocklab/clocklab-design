document.addEventListener('DOMContentLoaded', () => {
    const backgroundText = document.querySelector('.portfolio .clock')
    const xPos = document.documentElement.offsetWidth / 2
    const yPos = document.documentElement.offsetHeight / 2
    const koef = 40
    const maxSize = yPos / koef

    document.addEventListener('mousemove', event => {
        const newXPos = (event.clientX - xPos) / koef
        const newYPos = (event.clientY - yPos) / koef
        const newSize = newYPos / koef

        backgroundText.style.textShadow = `${newXPos}px ${newYPos}px ${newSize}px #000`
    })
})