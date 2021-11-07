class Population {
    constructor(popSize, mutateChance, maxStrength) {
        this.popSize = popSize;

        this.nextPopulation = [];

        this.fitnessA = [];
        this.totalFitness = 0;
        this.averageFitness = 0;
        
        this.mutateChance = mutateChance;
        this.maxStrength = maxStrength;
        
        this.population = [];
        for (let i = 0; i < this.popSize; i++) {
            this.population[i] = new Rocket(undefined, mutateChance, maxStrength);
        }
    }

    crossover(parent1, parent2) {
        // Combine two parts of the parent genes two create a new gene
        
        // Select a "mid" point
        let cutPoint = random(0, parent1.lifeTime);

        let part1 = parent1.DNA.genes.slice(0, cutPoint);
        let part2 = parent2.DNA.genes.slice(cutPoint);

        return new Rocket(part1.concat(part2), mutateChance, maxStrength);
    }

    nextGeneration() {
        this.nextPopulation = [];  // Reset the next generation
        
        // Get two best fitness score
        let maxFit1 = max(this.fitnessA);
        let maxFit1Index = this.fitnessA.indexOf(maxFit1);
        this.fitnessA.splice(maxFit1Index, 1);

        let maxFit2 = max(this.fitnessA);
        let maxFit2Index = this.fitnessA.indexOf(maxFit2);

        // Reproduce popSize times
        for (let n = 0; n < this.popSize; n++) {
            // Select two "parent" from mating pool
            let parent1 = this.population[maxFit1Index];
            let parent2 = this.population[maxFit2Index];
            
            // Create a child with crossover
            let child = this.crossover(parent1, parent2);
            
            // Mutate the childs genes
            child.mutate(this.mutateChance);

            // Add child to new population
            this.nextPopulation[n] = child;
        }

        // Create the next population
        this.population = this.nextPopulation.slice();
    }

    calcFitness() {
        this.totalFitness = 0; // Reset the total fitness
        // Calculate the fitness for every member of the population
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness();
            this.totalFitness += this.population[i].fitness;
            this.fitnessA[i] = this.population[i].fitness;
        }


        // Calculate the average fitness
        this.averageFitness = this.totalFitness / this.popSize;
    }

    show() {
        // Draw the every member of the population
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].show();
        }
    }

    update(target, obstacles) {
        // Update the every member of the population
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].update(target, obstacles);
        }
    }
}