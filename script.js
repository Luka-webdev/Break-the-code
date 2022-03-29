let welcomeBtn = document.querySelector('.welcomeScreen__btn')
let welcomeScreen = document.querySelector('.welcomeScreen')
let descriptionBtn = document.querySelector('.gameDescription__btn')
let gameDescription = document.querySelector('.gameDescription')

function closeWindow(arg) {
    arg.classList.add('visible')
}

welcomeBtn.addEventListener('click', () => {
    closeWindow(welcomeScreen)
})
descriptionBtn.addEventListener('click', () => {
    closeWindow(gameDescription)
})