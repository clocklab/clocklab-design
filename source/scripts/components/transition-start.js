document.addEventListener('DOMContentLoaded', () => {

    const links = document.querySelectorAll('.blog .post-info a')

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault()
            
            const position = link.parentElement.parentElement.querySelector('img').getBoundingClientRect()
            const href = link.getAttribute('href')

            console.log(typeof position)
            console.log(JSON.stringify(position))

            localStorage.setItem('position', JSON.stringify(
                {
                    'left': position.left,
                    'top': position.top,
                    'width': position.width,
                    'height': position.height
                }
            ))

            document.location.href = href
        })
    })
})