//Get an access to various elements 

let welcomeScreenLoad = document.querySelector('.welcomeScreen__load')
let loadingLine = document.querySelector('.welcomeScreen__line')
let welcomeScreen = document.querySelector('.welcomeScreen')
let startGameBtn = document.querySelector('.gameDescription__startGame')
let gameDescription = document.querySelector('.gameDescription')
let gameContent = document.querySelector('.gameBoard__content')
let city = document.querySelector('.gameBoard__city')
let coordinates = document.querySelector('.gameBoard__target')
let playerForce = document.querySelector('.gameBoard__playerForce')
let enemyForce = document.querySelector('.gameBoard__enemyForce')
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
let xCoordinatesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let yCoordinatesArray = ['A', 'B', 'C', 'D']
let numberOfBoxes = xCoordinatesArray.length * yCoordinatesArray.length
let mainCounter = 0;
let enemyNumbers = []
let clickedBox = []
let newMode;
let numberOfWins = 0;
let numberOfLoses = 0;
let actualWidthOfArmy = parseInt(getComputedStyle(armyOfEnemy).width)
let actualUnitOfArmy = actualWidthOfArmy / ((xCoordinatesArray.length * yCoordinatesArray.length) / 2)
let widthOfCity = parseInt(getComputedStyle(city).width)
let heightOfCity = parseInt(getComputedStyle(city).height)
let actualWidthOfTheCity;
let actualHeightOfTheCity;
let flag = false;
let isMobile;

// detect if browser is on a mobile device

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true
} else {
    isMobile = false
}

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
        if (counterX == xCoordinatesArray.length) {
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
    if (expandMode.classList.contains('choiced') || (checkMode.checked && newMode == 'podstawowy')) {
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
        if (arg.length == 2) {
            coordinates.textContent = "?" + arg[1]
        } else if (arg.length == 3) {
            coordinates.textContent = "?" + arg.slice(1, 3)
        }
    }
}

function makeAtack(arg, text) {
    let bomb = document.createElement('img')
    bomb.setAttribute('src', 'bomb.png')
    arg.appendChild(bomb)
    let resultOfAttack = document.createElement('p')
    resultOfAttack.textContent = text
    resultOfAttack.style.visibility = "hidden"
    arg.appendChild(resultOfAttack)
}

// determining what is to happen after clicking on one of the elements that create the map

function getEnemyBoxId(item) {
    if (mainCounter < numberOfBoxes / 2 && item.classList.contains('clicked') == false) {
        boxId = parseInt(item.getAttribute('id'))
        clickedBox.push(boxId)
        item.classList.add('clicked')
        if (numOfEnemy == boxId) {
            makeAtack(item, "Trafiony")
            chanegWidthElement(enemyForce)
            numberOfWins++;
        } else {
            makeAtack(item, "Skucha")
            chanegWidthElement(playerForce)
            numberOfLoses++;
        }
        setTimeout(() => {
            choiceEnemyCoordinate()
        }, 1400)
        mainCounter++;
    }
    if (mainCounter == numberOfBoxes / 2) {
        summaryGame.classList.remove('visible')
        let finalArmyPlayerWidth = parseInt(getComputedStyle(playerForce).width)
        let finalArmyEnemyWidth = parseInt(getComputedStyle(enemyForce).width)
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
    if (actualWidth > actualUnitOfArmy) {
        arg.style.width = (actualWidth - actualUnitOfArmy) + "px"
    } else {
        arg.style.width = 0 + "px"
    }
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
})

expandMode.addEventListener('click', () => {
    choicedMode(expandMode, basicMode, "podstawowy")
})

// function to restart game

function beginNewGame() {
    summaryGame.classList.add('visible')
    mainCounter = 0;
    enemyNumbers = []
    clickedBox = []
    numberOfLoses = 0;
    numberOfWins = 0;
    playerForce.style.width = actualWidthOfArmy + 'px'
    enemyForce.style.width = actualWidthOfArmy + 'px'
    boxes.forEach(box => {
        box.classList.remove('clicked')
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
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
    } else if (newMode == "rozszerzony") {
        expandMode.classList.add('choiced')
        newMode = "podstawowy"
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
            loadingLine.style.display = "None"
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
    actualWidthOfArmy = parseInt(getComputedStyle(armyOfEnemy).width)
    actualUnitOfArmy = actualWidthOfArmy / ((xCoordinatesArray.length * yCoordinatesArray.length) / 2)
    canvas.width = actualWidthOfTheCity
    canvas.height = actualHeightOfTheCity
    playerForce.style.width = actualWidthOfArmy - (actualUnitOfArmy * numberOfLoses) + "px"
    enemyForce.style.width = actualWidthOfArmy - (actualUnitOfArmy * numberOfWins) + "px"
});

function partOfViewFinder(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.closePath()
    ctx.strokeStyle = 'lime';
    ctx.stroke();
}

function viewFinder(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, actualUnitOfArmy, 0, Math.PI * 2, true)
    ctx.lineWidth = 5
    ctx.strokeStyle = 'lime';
    ctx.stroke();
    partOfViewFinder(x + actualUnitOfArmy, y, x + actualUnitOfArmy * 1.8, y)
    partOfViewFinder(x - actualUnitOfArmy, y, x - actualUnitOfArmy * 1.8, y)
    partOfViewFinder(x, y + actualUnitOfArmy, x, y + actualUnitOfArmy * 1.8)
    partOfViewFinder(x, y - actualUnitOfArmy, x, y - actualUnitOfArmy * 1.8)
}

city.addEventListener('mousemove', (e) => {
    if (isMobile == false) {
        if (flag) {
            ctx.clearRect(0, 0, actualWidthOfTheCity, actualHeightOfTheCity)
        } else {
            ctx.clearRect(0, 0, widthOfCity, heightOfCity)
        }
        let positionX = e.clientX - city.offsetLeft - parseInt(getComputedStyle(gameContent).marginLeft)
        let positionY = e.clientY - city.offsetTop - parseInt(getComputedStyle(gameContent).marginTop)
        viewFinder(positionX, positionY)
    }
})