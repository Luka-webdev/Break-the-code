let welcomeBtn = document.querySelector('.welcomeScreen__btn')
let welcomeScreen = document.querySelector('.welcomeScreen')
let descriptionBtn = document.querySelector('.gameDescription__btn')
let gameDescription = document.querySelector('.gameDescription')
let city = document.querySelector('.gameBoard__city')
let coordinates = document.querySelector('.gameBoard__target')

let xCoordinatesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
let yCoordinatesArray = ['A', 'B', 'C', 'D', 'E', 'F']
let numberOfBoxes = xCoordinatesArray.length * yCoordinatesArray.length
let mainCounter = 0;
let enemyNumbers = []

function createCityBoxes() {
    let counter = 1
    let counterX = 0
    let counterY = 0
    while (counter <= numberOfBoxes) {
        let box = document.createElement('div')
        box.setAttribute('id', counter)
        counter++;
        box.setAttribute('class', 'gameBoard__cityBox active')
        box.setAttribute('coordinate', yCoordinatesArray[counterY] + xCoordinatesArray[counterX])
        counterX++;
        if (counterX == 14) {
            counterY++;
            counterX = 0;
        }
        city.appendChild(box)
    }
}

createCityBoxes()
choiceEnemyCoordinate()

function choiceEnemyCoordinate() {
    num = (Math.floor(Math.random() * numberOfBoxes + 1))
    for (let i = 0; i < enemyNumbers.length; i++) {
        if (num === enemyNumbers[i]) {
            return choiceEnemyCoordinate()
        }
    }
    enemyNumbers.push(num)
    let targetBox = document.getElementById(num)
    coordinates.textContent = targetBox.getAttribute('coordinate')
}

function getEnemyBoxId(item) {
    if (mainCounter < numberOfBoxes / 2) {
        boxId = parseInt(item.getAttribute('id'))
        item.classList.remove('active')
        item.classList.add('clicked')
        if (num == boxId) {} else {

        }
        choiceEnemyCoordinate()
        mainCounter++;
    }
}

let boxes = document.querySelectorAll('.active')
boxes.forEach(box => {
    box.addEventListener('click', () => getEnemyBoxId(box))
})

function closeWindow(arg) {
    arg.classList.add('visible')
}

welcomeBtn.addEventListener('click', () => {
    closeWindow(welcomeScreen)
})
descriptionBtn.addEventListener('click', () => {
    closeWindow(gameDescription)
})