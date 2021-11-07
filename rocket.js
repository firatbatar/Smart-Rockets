class Rocket {
    constructor(genes, mutateChance, maxStrength) {
        this.pos = createVector(width/2, height);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.size = 5;
        
        this.age = 0;
        
        this.mutateChance = mutateChance;
        this.maxStrength = maxStrength;
        this.DNA = new DNA(lifeTime, genes, mutateChance, maxStrength);

        this.bestDistance = 10**4;
        this.reachTime = 0;
        this.hitTarget = false;
        this.hitObstacle = false;
        this.fitness;
    }

    mutate(mutateChance) {
        this.DNA.mutate(mutateChance);
    }

    // Fitness function
    // Closer the target more score.
    calcFitness() {
        if (this.bestDistance < 1) this.bestDistance = 1;

        // Reverse the bestDistance * reachTime
        this.fitness = 1 / (this.bestDistance * this.reachTime);

        // If it hit the target double the fitness
        if (this.hitTarget) this.fitness *= 2;

        // IF it hit an obstacle reduce the fitness
        if (this.hitObstacle) this.fitness *= 0.1;
    }

    checkTarget() {
        // Distance to the target
        let d = dist(this.pos.x, this.pos.y - this.size*2, target.x, target.y);
        
        // Record the best distance
        if (d < this.bestDistance) this.bestDistance = d;

        // Check if it hit the target
        if (d <= target.r) {
            this.hitTarget = true;
        } else {
            this.reachTime++;
        }
    }

    checkObstacle(obstacles) {
        // Check for if it hit an obstacle
        for (let i = 0; i < obstacles.length; i++) {
            if (obstacles[i].contains(this.pos.x, this.pos.y)) this.hitObstacle = true;
        }
    }


    applyForce() {
        let force = this.DNA.genes[this.age]; 
        this.acc.add(force);
    }

    update(target, obstacles) {
        if (!this.hitTarget && !this.hitObstacle) {    
            this.applyForce();
            this.pos.add(this.vel);
            this.vel.add(this.acc);
            this.acc.set(0, 0);

            this.age++;

            // Check the target
            this.checkTarget(target);

            // Check for obstacles
            this.checkObstacle(obstacles);
        }    
    }


    show() {
        if (!this.hitObstacle){
            let dirAngle = this.vel.heading() + PI / 2;
            
            push();
            fill(175);

            translate(this.pos.x, this.pos.y);
            rotate(dirAngle);

            beginShape(TRIANGLES);
            vertex(0, -this.size * 2);
            vertex(-this.size, this.size * 2);
            vertex(this.size, this.size * 2);
            endShape();
            pop();
        }
    }
}