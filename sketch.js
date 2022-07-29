import Dino from "./dino.js";
import Cactus from "./cactus.js";

const CANVAS = document.querySelector('canvas');
CANVAS.width = innerWidth;
CANVAS.height = innerHeight;
export const c = CANVAS.getContext('2d');
var clearCanvas = () => c.clearRect(0, 0, CANVAS.width, CANVAS.height);

const h1 = document.querySelector('h1');
const h3 = document.querySelector('h3');

var gameState = 0;

var frames = 0;

class Ground {
    constructor() {
        this.x = 0;
        this.y = innerHeight - 40;
        this.width = innerWidth;
        this.height = 40;
    }

    draw() {
        c.strokeStyle = "black";
        c.strokeRect(this.x, this.y, this.width, this.height);
    }
}

var ground, dino;

var cactusArray = [];

addEventListener('resize', function () {
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
});

setup();

function setup() {
    ground = new Ground();
    dino = new Dino(100, innerHeight - 150);

    draw();
}

function draw() {
    requestAnimationFrame(draw);
    clearCanvas();

    if (gameState == 0 && gameState !== 1) {
        h1.style.display = 'none';
        h3.style.display = 'none';

        c.arc(innerWidth - 300, innerHeight / 10, 40, 0, Math.PI*2);
        c.fillStyle = "yellow";
        c.fill();

        if (isDinoTouchingGround()) {
            dino.y = ground.y - dino.height;
        }
    
        generateCactus();
        collisionDetection();
    
        dino.draw();
        ground.draw();

    } else if (gameState == 1 && gameState !== 0) {
        h1.style.display = 'block';
        h3.style.display = 'block';
    }

    console.log(gameState)
    frames++;
}

function isDinoTouchingGround() {
    if (dino.y + dino.height > ground.y) {
        return true;
    } else {
        return false;
    }
}

function collisionDetection() {
    cactusArray.forEach(cactus => {
        if (cactus.x <= dino.x + dino.height &&
            dino.y + dino.height >= cactus.y) {
            CANVAS.style.display = 'none';
            gameState = 1;
        }
    })
}

function generateCactus() {
    if (frames % 120 === 0) {
        cactusArray.push(new Cactus());
    }

    cactusArray.forEach(cactus => {
        cactus.draw();

        if (cactus.x < 0) {
            cactusArray.shift();
        }
    })
}

addEventListener('keydown', ({ key }) => {
    if (gameState == 0) {
        switch (key) {
            case 'w':
                if (dino.y >= innerHeight - 150) { dino.veloY = -20; }
                break;
            case 's':
                if (isDinoTouchingGround()) {
                    dino.height = 80;
                }
                break;
        }
    }
});

addEventListener('keyup', ({ key }) => {
    if (gameState == 0) {
        switch (key) {
            case 's':
                dino.height = 150;
                break;
        }
    }
});