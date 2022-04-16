let welcomeBtn = document.querySelector('.welcomeScreen__btn')
let welcomeScreen = document.querySelector('.welcomeScreen')
let startGameBtn = document.querySelector('.gameDescription__btn')
let gameDescription = document.querySelector('.gameDescription')
let city = document.querySelector('.gameBoard__city')
let coordinates = document.querySelector('.gameBoard__target')
let armyOfPlayer = document.querySelector('.gameBoard__armyOfPlayer')
let armyOfEnemy = document.querySelector('.gameBoard__armyOfEnemy')
let basicMode = document.querySelector('.gameDescription__basic')
let expandMode = document.querySelector('.gameDescription__expand')
let summaryGame = document.querySelector('.gameBoard__message')

let xCoordinatesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
let yCoordinatesArray = ['A', 'B', 'C', 'D', 'E']
let numberOfBoxes = xCoordinatesArray.length * yCoordinatesArray.length
let mainCounter = 0;
let enemyNumbers = []
let clickedBox = []
let startWidthOfArmy = parseInt(getComputedStyle(armyOfPlayer).width)
let oneUnitOfArmy = startWidthOfArmy / ((xCoordinatesArray.length * yCoordinatesArray.length) / 2)

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
        if (counterX == 12) {
            counterY++;
            counterX = 0;
        }
        city.appendChild(box)
    }
}

createCityBoxes()
choiceEnemyCoordinate()

function choiceEnemyCoordinate() {
    numOfEnemy = (Math.floor(Math.random() * numberOfBoxes + 1))
    for (let i = 0; i < enemyNumbers.length; i++) {
        if (numOfEnemy === enemyNumbers[i]) {
            return choiceEnemyCoordinate()
        }
    }
    for (let i = 0; i < clickedBox.length; i++) {
        if (numOfEnemy === clickedBox[i]) {
            return choiceEnemyCoordinate()
        }
    }
    enemyNumbers.push(numOfEnemy)
    let targetBox = document.getElementById(numOfEnemy)
    let coordinatesOfEnemy = targetBox.getAttribute('coordinate')
    console.log(coordinatesOfEnemy)
    hidingCoordinates(coordinatesOfEnemy)
}

function hidingCoordinates(arg) {
    num = Math.round(Math.random())
    if (expandMode.classList.contains('choiced')) {
        if (num == 0) {
            coordinates.textContent = arg[0] + "?"
        } else if (num == 1) {
            if (arg.length == 2) {
                coordinates.textContent = "?" + arg[1]
            } else if (arg.length == 3) {
                coordinates.textContent = "?" + arg.slice(1, 3)
            }
        }
    } else {
        if (arg.length == 2) {
            coordinates.textContent = "?" + arg[1]
        } else if (arg.length == 3) {
            coordinates.textContent = "?" + arg.slice(1, 3)
        }
    }
}

function getEnemyBoxId(item) {
    if (mainCounter < numberOfBoxes / 2 && item.classList.contains('clicked') == false) {
        boxId = parseInt(item.getAttribute('id'))
        clickedBox.push(boxId)
        item.classList.add('clicked')
        if (numOfEnemy == boxId) {
            chanegWidthElement(armyOfEnemy)
        } else {
            chanegWidthElement(armyOfPlayer)
        }
        choiceEnemyCoordinate()
    }
    mainCounter++;
    if (mainCounter == numberOfBoxes / 2) {
        summaryGame.classList.remove('visible')
    }
}

function chanegWidthElement(arg) {
    let actualWidth = parseInt(getComputedStyle(arg).width)
    arg.style.width = (actualWidth - oneUnitOfArmy) + "px"
    console.log(actualWidth)
}

let boxes = document.querySelectorAll('.gameBoard__cityBox')
boxes.forEach(box => {
    box.addEventListener('click', () => getEnemyBoxId(box))
})

function choicedMode(arg1, arg2) {
    if (arg2.classList.contains('choiced') == false) {
        arg1.classList.add('choiced')
    }
    startGameBtn.classList.remove('visible')
}
basicMode.addEventListener('click', () => {
    choicedMode(basicMode, expandMode)
})

expandMode.addEventListener('click', () => {
    choicedMode(expandMode, basicMode)
})

function closeWindow(arg) {
    arg.classList.add('visible')
}

welcomeBtn.addEventListener('click', () => {
    closeWindow(welcomeScreen)
})
startGameBtn.addEventListener('click', () => {
    closeWindow(gameDescription)
})