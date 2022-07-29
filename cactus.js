import { c } from './sketch.js';

export default class Cactus {
    constructor() {
        this.x = innerWidth;
        this.width = 25;

        var rand = Math.floor(Math.random() * 2);
        switch (rand) {
            case 0:
                this.height = 130;
                break;
            case 1:
                this.height = 80;
                break;
            case 2:
                this.height = 60;
                break;
        }

        this.y = innerHeight - 40 - this.height;

        this.veloX = -10;
        this.exists = true;
    }

    draw () {
        if (this.exists) {
            c.fillStyle = "green";
            c.fillRect(this.x, this.y, this.width, this.height);

            this.x += this.veloX;
        }
    }

    destroy () {
        if (this.exists === true && this.x < 0) {
            this.exists = false;
        }
    }
}