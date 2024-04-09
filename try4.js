// Global scope
let redOffsetX = random(0, 1000); // Initialize once to ensure continuity

function setup() {
  createCanvas(576, 576);
  angleMode(DEGREES);
}

function draw() {
  background(18, 53, 95);
  
  // Update and display arrows
  pointingArrows();
  
  // Increment redOffsetX for the next frame, ensuring smooth motion
  redOffsetX += 0.005; // Adjust this value for smoother or faster movement
}

function pointingArrows() {
  let redRangeX = 50; // Assuming a visible range of motion
  let redCenterX = width / 2; // Center horizontally
  let redCenterY = 160; // Fixed vertical position for demonstration

  // Use redOffsetX to get a smooth Perlin noise value and calculate the X movement
  let redMovementX = map(noise(redOffsetX), 0, 1, -redRangeX / 2, redRangeX / 2);
  let redX = redCenterX + redMovementX;

  // Drawing the triangle with Perlin noise-based horizontal movement
  fill(167, 58, 39);
  triangle(redX - 10, redCenterY, redX, redCenterY - 15, redX + 10, redCenterY);
}

