class Obstacle {
    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
    }

    show() {
        noStroke();
        fill(140);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    contains(x, y) {
        if (
            x > this.pos.x &&
            x < this.pos.x + this.w &&
            y > this.pos.y &&
            y < this.pos.y + this.h
        ) {
            return true;
        } else {
            return false;
        }
    }
}