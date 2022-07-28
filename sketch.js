import Dino from "./dino.js";
import Cactus from "./cactus.js";

const CANVAS = document.querySelector('canvas');
CANVAS.width = innerWidth;
CANVAS.height = innerHeight;
export const c = CANVAS.getContext('2d');
var clearCanvas = () => c.clearRect(0, 0, CANVAS.width, CANVAS.height);

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

    // console.log(dino.y)

    draw();
}

function draw() {
    requestAnimationFrame(draw);
    clearCanvas();

    if (isDinoTouchingGround()) {
        dino.y = ground.y - dino.height;
    }

    generateCactus();

    dino.draw();
    ground.draw();

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
    
}

function generateCactus() {
    if (frames % 120 === 0) {
        cactusArray.push(new Cactus());
    }

    for (var i = 0; i < cactusArray.length; i++) {
        cactusArray[i].draw();

        // console.log(cactusArray[i].x + ',' + cactusArray[i].height);

        if (cactusArray[i].x < 0) {
            cactusArray.shift()
        }
        
    }
}

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            if (dino.y >= innerHeight - 150) { dino.veloY = -18; }
            break;
        case 's':
            if (isDinoTouchingGround()) {
                dino.height = 80;
            }
            break;
    }
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 's':
            dino.height = 150;
            break;
    }
});