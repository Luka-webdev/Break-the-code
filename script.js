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

function createCityBoxes() {
    let counter = 1
    let counterX = 0
    let counterY = 0
    while (counter <= numberOfBoxes) {
        let box = document.createElement('div')
        box.setAttribute('id', counter)
        counter++;
        box.setAttribute('class', 'gameBoard__cityBox')
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
    let targetBox = document.getElementById(num)
    coordinates.textContent = targetBox.getAttribute('coordinate')
}

function getEnemyBoxId(item) {
    if (mainCounter < numberOfBoxes / 2) {
        boxId = parseInt(item.getAttribute('id'))
        if (num == boxId) {
            console.log('ok')
            choiceEnemyCoordinate()
        } else {
            console.log('błąd')
        }
        mainCounter++;
        console.log(mainCounter)
    }
}

let boxes = document.querySelectorAll('.gameBoard__cityBox')
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