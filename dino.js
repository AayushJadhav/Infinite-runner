import { c } from './sketch.js';
const g = 0.8;

export default class Dino {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 150;
        
        this.veloX = 0;
        this.veloY = 0;
    }

    draw() {
        c.fillStyle = "grey";
        c.fillRect(this.x,  this.y, this.width, this.height);
        this.veloY += g;

        this.x += this.veloX;
        this.y += this.veloY;
    }
}