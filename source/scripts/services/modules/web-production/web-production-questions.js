const questions = Array.prototype.slice.call(document.querySelectorAll('.answers .question > button')),
      answers = Array.prototype.slice.call(document.querySelectorAll('.answers .answer'))

questions.forEach(question => {
    question.addEventListener('click', () => {
        if (!question.parentElement.classList.contains('current')) {
            const currentQuestion = document.querySelector('.answers .question.current'),
                  currentAnswer = document.querySelector('.answers .answer.current')

            const previousQuestion = document.querySelector('.answers .question.previous'),
                  previousAnswer = document.querySelector('.answers .answer.previous')
                  
            previousQuestion && previousQuestion.classList.remove('previous')
            previousAnswer && previousAnswer.classList.remove('previous')

            currentQuestion.classList.remove('current')
            currentAnswer.classList.remove('current')

            currentQuestion.classList.add('previous')
            currentAnswer.classList.add('previous')

            question.parentElement.classList.add('current')
            answers[questions.indexOf(question)].classList.add('current')
        }
    })
})

