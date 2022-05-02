// import {
//     makeCityPlan
// } from '/cityPlan.js'

// makeCityPlan()

//Get an access to various elements 

let welcomeScreenLoad = document.querySelector('.welcomeScreen__load')
let loadingLine = document.querySelector('.welcomeScreen__line')
let welcomeScreen = document.querySelector('.welcomeScreen')
let startGameBtn = document.querySelector('.gameDescription__startGame')
let gameDescription = document.querySelector('.gameDescription')
let city = document.querySelector('.gameBoard__city')
let coordinates = document.querySelector('.gameBoard__target')
let armyOfPlayer = document.querySelector('.gameBoard__armyOfPlayer')
let armyOfEnemy = document.querySelector('.gameBoard__armyOfEnemy')
let basicMode = document.querySelector('.gameDescription__basic')
let expandMode = document.querySelector('.gameDescription__expand')
let summaryGame = document.querySelector('.gameBoard__message')
let gameResult = document.querySelector('.gameBoard__result')
let newGame = document.querySelector('.gameBoard__newGame')
let label = document.querySelector('.gameBoard__label')
let checkMode = document.querySelector('input')

// initialization of variables used in the code

startGameBtn.disabled = true;
let xCoordinatesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
let yCoordinatesArray = ['A', 'B', 'C', 'D', 'E']
let numberOfBoxes = xCoordinatesArray.length * yCoordinatesArray.length
let mainCounter = 0;
let enemyNumbers = []
let clickedBox = []
let newMode;
let startWidthOfArmy = parseInt(getComputedStyle(armyOfPlayer).width)
let oneUnitOfArmy = startWidthOfArmy / ((xCoordinatesArray.length * yCoordinatesArray.length) / 2)
let widthOfCity = parseInt(getComputedStyle(city).width)
let heightOfCity = parseInt(getComputedStyle(city).height)
let actualWidthOfTheCity;
let actualHeightOfTheCity;
let flag = false;

let armyLabels = document.querySelectorAll('.gameBoard__army>div>div')
armyLabels.forEach(label => {
    label.style.width = startWidthOfArmy + 'px'
})

// creating elements that will create the main map of the game

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
closeWelcomeScreen()
createCityBoxes()

// selecting the coordinates of items representing the player's enemy

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
    hidingCoordinates(coordinatesOfEnemy)
}

// hiding part of the enemy's coordinates

function hidingCoordinates(arg) {
    num = Math.round(Math.random())
    console.log(num)
    if (expandMode.classList.contains('choiced') || (checkMode.checked && newMode == 'podstawowy')) {
        console.log('Rozszerzony')
        if (num == 0) {
            coordinates.textContent = arg[0] + "?"
        } else if (num == 1) {
            if (arg.length == 2) {
                coordinates.textContent = "?" + arg[1]
            } else if (arg.length == 3) {
                coordinates.textContent = "?" + arg.slice(1, 3)
            }
        }
    } else if (basicMode.classList.contains('choiced') || (checkMode.checked && newMode == 'rozszerzony')) {
        console.log('podstawowy')
        if (arg.length == 2) {
            coordinates.textContent = "?" + arg[1]
        } else if (arg.length == 3) {
            coordinates.textContent = "?" + arg.slice(1, 3)
        }
    }
}

// determining what is to happen after clicking on one of the elements that create the map

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
        mainCounter++;
    }
    if (mainCounter == numberOfBoxes / 2) {
        summaryGame.classList.remove('visible')
        let finalArmyPlayerWidth = parseInt(getComputedStyle(armyOfPlayer).width)
        let finalArmyEnemyWidth = parseInt(getComputedStyle(armyOfEnemy).width)
        if (finalArmyPlayerWidth > finalArmyEnemyWidth) {
            gameResult.textContent = "Gratulacje !!!! Wygrałeś"
        } else if (finalArmyPlayerWidth < finalArmyEnemyWidth) {
            gameResult.textContent = "Niestety. Przegrałeś"
        } else {
            gameResult.textContent = "Remis."
        }
        checkMode.checked = false
        label.textContent = "Zmień tryb na " + newMode
    }
}

// changing the width of the bar informing about the strength of the player and enemy

function chanegWidthElement(arg) {
    let actualWidth = parseInt(getComputedStyle(arg).width)
    arg.style.width = (actualWidth - oneUnitOfArmy) + "px"
}

// add event listener for each element that create the map

let boxes = document.querySelectorAll('.gameBoard__cityBox')
boxes.forEach(box => {
    box.addEventListener('click', () => getEnemyBoxId(box))
})

// choice of game mode when the game is started for the first time

function choicedMode(arg1, arg2, arg3) {
    if (arg2.classList.contains('choiced')) {
        arg2.classList.remove('choiced')
    }
    arg1.classList.add('choiced')
    newMode = arg3
    startGameBtn.disabled = false;
}

basicMode.addEventListener('click', () => {
    choicedMode(basicMode, expandMode, "rozszerzony")
    console.log('tryb podstawowy')
})

expandMode.addEventListener('click', () => {
    choicedMode(expandMode, basicMode, "podstawowy")
    console.log('tryb rozszrzony')
})

// function to restart game

function beginNewGame() {
    summaryGame.classList.add('visible')
    mainCounter = 0;
    enemyNumbers = []
    clickedBox = []
    armyOfPlayer.style.width = startWidthOfArmy + 'px'
    armyOfEnemy.style.width = startWidthOfArmy + 'px'
    boxes.forEach(box => {
        box.classList.remove('clicked')
    })
    choiceEnemyCoordinate()
}

function closeWindow(arg) {
    arg.classList.add('visible')
}

startGameBtn.addEventListener('click', () => {
    closeWindow(gameDescription)
    choiceEnemyCoordinate()
})
newGame.addEventListener('click', beginNewGame)

//allow to select a game mode after restarting

checkMode.addEventListener('change', () => {
    basicMode.classList.remove('choiced')
    expandMode.classList.remove('choiced')
    if (newMode == "podstawowy") {
        basicMode.classList.add('choiced')
        newMode = "rozszerzony"
        console.log('zmiana trybu na podstawowy')
    } else if (newMode == "rozszerzony") {
        expandMode.classList.add('choiced')
        newMode = "podstawowy"
        console.log('zmiana trybu na rozszerzony')
    }
})

// the behavior of the loading bar at the beginning of the game

function closeWelcomeScreen() {
    let progress = 1
    let finallyWidth = parseInt(getComputedStyle(welcomeScreenLoad).width)
    let loading = setInterval(() => {
        let actualLoadWidth = parseInt(getComputedStyle(loadingLine).width)
        if (actualLoadWidth < finallyWidth) {
            loadingLine.style.width = actualLoadWidth + progress + "px"
        } else {
            clearInterval(loading)
            closeWindow(welcomeScreen)
        }
    }, 1)
}

// functions to creating and moving viewfinder

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = widthOfCity
canvas.height = heightOfCity

window.addEventListener('resize', function (event) {
    flag = true;
    actualWidthOfTheCity = parseInt(getComputedStyle(city).width)
    actualHeightOfTheCity = parseInt(getComputedStyle(city).height)
    canvas.width = actualWidthOfTheCity
    canvas.height = actualHeightOfTheCity
});


function partOfViewFinder(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.closePath()
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

function viewFinder(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, 25, 0, Math.PI * 2, true)
    ctx.lineWidth = 6
    ctx.strokeStyle = 'red';
    ctx.stroke();
    partOfViewFinder(x + 10, y, x + 40, y)
    partOfViewFinder(x - 10, y, x - 40, y)
    partOfViewFinder(x, y + 10, x, y + 40)
    partOfViewFinder(x, y - 10, x, y - 40)
}

city.addEventListener('mousemove', (e) => {
    if (flag) {
        ctx.clearRect(0, 0, actualWidthOfTheCity, actualHeightOfTheCity)
    } else {
        ctx.clearRect(0, 0, widthOfCity, heightOfCity)
    }
    let positionX = e.layerX
    let positionY = e.layerY
    // cityPlan(actualWidthOfTheCity / actualWidthOfTheCity)
    viewFinder(positionX, positionY)
})

// create city map

// function cityPlan(length) {

//     function building(x, y, width, height, color) {
//         ctx.fillRect(x, y, width, height)
//         ctx.fillStyle = color
//     }
//     building(length * 4, length * 4, length * 19, length * 12, 'brown')
//     building(length * 16, length * 14, length * 17, length * 18, 'brown')
//     building(length * 24, length * 29, length * 12, length * 20, 'brown')
//     building(length * 39, length * 39, length * 16, length * 12, 'brown')
// }