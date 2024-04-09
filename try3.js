function setup() {
    createCanvas(576, 576);
    // Switch to RGB color mode
    colorMode(RGB, 255);
  }
  
  function draw() {
    background(230, 30, 23);
  
    // Define the arc parameters
    let x = width / 2;
    let y = height / 2;
    let diameter = 300;
    let startAngle = 0; // Starting angle in degrees
    let endAngle = 90; // Ending angle in degrees
  
    // Create a radial gradient within an arc
    radialGradientWithinArc(x, y, diameter, startAngle, endAngle, [255, 0, 0], [0, 0, 255]);
  }
  
  function radialGradientWithinArc(x, y, d, startAngle, endAngle, startColor, endColor) {
    let ctx = drawingContext;
    // Save the current state before clipping
    ctx.save();
  
    // Begin a new path for the arc (clipping path)
    ctx.beginPath();
    // Move to the center of the arc to ensure the closed path includes the center
    ctx.moveTo(x, y);
    // Create an arc path
    ctx.arc(x, y, d / 2, radians(startAngle), radians(endAngle));
    // Close the path back to the center to complete the shape for clipping
    ctx.closePath();
    // Clip to the arc path
    ctx.clip();
  
    // Create the radial gradient within the clipped area
    let gradient = ctx.createRadialGradient(x, y, 0, x, y, d / 2);
    gradient.addColorStop(0, color(startColor).toString());
    gradient.addColorStop(1, color(endColor).toString());
  
    // Apply the gradient as fill style and fill a rectangle that covers the entire area
    ctx.fillStyle = gradient;
    ctx.fillRect(x - d / 2, y - d / 2, d, d);
  
    // Restore the context to its state before clipping
    ctx.restore();
  }
  