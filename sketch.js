// Smart Rockets with Genetic Algorithm
// https://github.com/firatbatar/Smart-Rockets

// Based on the tutorials from The Coding Train / Daniel Shiffman
// https://www.youtube.com/c/TheCodingTrain
// https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bw4n02JP28QDuUdNi3EXxJ
// https://editor.p5js.org/codingtrain/sketches/BOTCxBDbO

let target;
let population;
let popSize = 50;
let lifeTime = 300;
let cycle = 0;
let mutateChance = 0.03;
let maxStrength = 0.2;
let generation = 1;
let obstacles = [];


function setup() {
  createCanvas(640, 360);

  // Create the target as an object
  target = {
    r: 20,
    x: width/2,
    y: 10 + 40
  };

  // Creating the rocket population
  population = new Population(popSize, mutateChance, maxStrength);

  // Create obstacles
  obstacles.push(new Obstacle(width / 2 - 100, height / 2, 200, 10));
  
}

function draw() {
  background(0);
  // Draw the target as a square
  stroke(160);
  strokeWeight(4);
  fill(200);
  ellipse(target.x, target.y, target.r*2);

  // Draw the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].show();
  }


  // Display the generation and the remaining lifetime
  noStroke();
  fill(255);
  text(`Generation #${generation}`, 20, height-60);
  text(`Remaining lifetime: ${lifeTime-cycle}`, 20, height-40);
  text(`Average Fitness: ${population.averageFitness}`, 20, height-20);


  // Draw the rockets
  population.show();

  // Update the rockets
  population.update(target, obstacles)

  // Inc the age (cycle)
  cycle++;

 
  if (cycle == lifeTime) {
    // Genetic algorithm

    // Calculate the fitness
    population.calcFitness();

    // Create the next generation
    population.nextGeneration();
    generation++;

    // Reset the cycle
    cycle = 0;  
  }

}
