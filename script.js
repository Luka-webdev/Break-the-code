let welcomeBtn = document.querySelector('.welcomeScreen__btn')
let welcomeScreen = document.querySelector('.welcomeScreen')
let descriptionBtn = document.querySelector('.gameDescription__btn')
let gameDescription = document.querySelector('.gameDescription')
let city = document.querySelector('.gameBoard__city')

let xCoordinatesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
let yCoordinatesArray = ['A', 'B', 'C', 'D', 'E', 'F']
let numberOfBoxes = xCoordinatesArray.length * yCoordinatesArray.length

function createCityBoxes() {
    let counter = 1
    while (counter <= numberOfBoxes) {
        let box = document.createElement('div')
        box.setAttribute('id', counter)
        box.setAttribute('class', 'gameBoard__cityBox')
        counter++;
        city.appendChild(box)
    }
}

function closeWindow(arg) {
    arg.classList.add('visible')
}

welcomeBtn.addEventListener('click', () => {
    closeWindow(welcomeScreen)
})
descriptionBtn.addEventListener('click', () => {
    closeWindow(gameDescription)
})

createCityBoxes()