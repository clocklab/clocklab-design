document.addEventListener('DOMContentLoaded', () => {
    const openButtons = document.querySelectorAll('.open-long-text')
    const closeButtons = document.querySelectorAll('.close-long-text')

    openButtons.forEach(openButton => {
        openButton.addEventListener('click', () => {
            openButton.parentElement.classList.add('open')
        })
    })

    closeButtons.forEach(closeButton => {
        closeButton.addEventListener('click', () => {
            closeButton.parentElement.parentElement.classList.remove('open')
            closeButton.parentElement.parentElement.parentElement.parentElement.classList.remove('open')
        })
    })
})