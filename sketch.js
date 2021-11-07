// Smart Rockets with Genetic Algorithm
// https://thecodingtrain.com/more/archive/nature-of-code/9-genetic-algorithms/9.5-fitness-genotype-vs-phenotype.html
// https://editor.p5js.org/codingtrain/sketches/BOTCxBDbO

let target;
let population;
let popSize = 100;
let lifeTime = 200;
let cycle = 0;
let mutateChance = 0.01;
let maxStrength = 0.5;
let generation = 1;


function setup() {
  createCanvas(800, 600);

  // Create the target as an object
  target = {
    r: 20,
    x: width/2,
    y: 10 + 40
  };

  // Creating the rocket population
  population = new Population(popSize, mutateChance, maxStrength);
  
}

function draw() {
  background(0);
  // Draw the target as a square
  stroke(160);
  strokeWeight(4);
  fill(200);
  ellipse(target.x, target.y, target.r*2);

  // Display the generation and the remaining lifetime
  noStroke();
  fill(255);
  text(`Generation #${generation}`, 20, height-60);
  text(`Remaining lifetime: ${lifeTime-cycle}`, 20, height-40);
  text(`Average Fitness: ${population.averageFitness}`, 20, height-20);

  
  // Draw the rockets
  population.show();

  // Update the rockets
  population.update()

  // Inc the age (cycle)
  cycle++;

 
  if (cycle == lifeTime) {
    // Genetic algorithm

    // Calculate the fitness
    population.calcFitness();

    // Create a mating pool
    population.createMatingPool();

    // Create the next generation
    population.nextGeneration();
    generation++;

    // Reset the cycle
    cycle = 0;  
  }

}
