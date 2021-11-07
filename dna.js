class DNA {
    constructor(lifeTime, genes, mutateChance, maxStrength) {
        // Create a genes
        // A random vector for every lifecycle
        this.genes = genes;
        this.maxStrength = maxStrength;
        this.mutateChance = mutateChance

        if (this.genes == undefined) {
            this.genes = [];
            for (let i = 0; i < lifeTime; i++) {
                this.genes[i] = p5.Vector.random2D().normalize();
                this.genes[i].mult(random(0, this.maxStrength));
            }
        }

    }

    mutate() {
        for (let i = 0; i < this.genes.length; i++) {
            let chance = random(0, 1);
            
            if (chance < this.mutateChance) {
                this.genes[i] = p5.Vector.random2D().normalize();
                this.genes[i].mult(random(0, this.maxStrength));
            }
        }
    }
}
