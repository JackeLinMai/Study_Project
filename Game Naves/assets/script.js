const heroShip = document.querySelector('.heroShip');
const playArea = document.querySelector('#main');
const aliensImg = ['./img/monster-1', './img/monster-2.png', './img/monster-3.png'];
const instructionsText = document.querySelector('.gameInstructions');
const startButton = document.querySelector('.startButton');
let alienInterval;

function flyShip(event) {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if (event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}


function moveUp() {
    let topPosition = getComputedStyle(heroShip).getPropertyValue('top');
    if (topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 50;
        heroShip.style.top = `${position}px`;
    }
}

function moveDown() {
    let topPosition = getComputedStyle(heroShip).getPropertyValue('top');
    if (topPosition === "510px") {
        return
    } else {
        let position = parseInt(topPosition);
        position += 50;
        heroShip.style.top = `${position}px`;
    }
}


function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let horizontalPosition = parseInt(window.getComputedStyle(heroShip).getPropertyValue('left'));
    let verticalPosition = parseInt(window.getComputedStyle(heroShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = './img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${horizontalPosition}px`;
    newLaser.style.top = `${verticalPosition - 10}px`;
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let horizontalPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => {
            if (checkLaserCollision(laser, alien)) {
                alien.src = 'assets/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('deadAlien');
            }
        })

        if (horizontalPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${horizontalPosition + 8}px`;
        }
    }, 10);
}

function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)];
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alienTransition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}


function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let horizontalPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if (horizontalPosition <= 50) {
            if (Array.from(alien.classList).includes('deadAlien')) {
                alien.remove();
            } else {
                gameOver();
            }
        } else {
            alien.style.left = `${horizontalPosition - 4}px`;
        }
    }, 30);
}

function checkLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;
    if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if (laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}


function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('game over!');
        heroShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}