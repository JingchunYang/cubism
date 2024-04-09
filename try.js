// function fangde(w,h){
//     fill('white')
//     rect(0,0,w,h);
// }



function setup() {
    createCanvas(576, 576);
    angleMode(DEGREES)



}

function draw() {
    background(200)
    disk.display();


   
    // fang();

}



let diskAngle = 0;
class Disk {
    constructor(arc1Radius, arc1Color, arc2Radius, arc2Color, arc3Radius, arc3Color, arc4Radius, arc4Color, beamRadius, beamColor1, beamColor2) {
        this.x = 407;
        this.y = 263;

        this.arc1Radius = arc1Radius;
        this.arc1Color = arc1Color;

        this.arc2Radius = arc2Radius;
        this.arc2Color = arc2Color;

        this.arc3Radius = arc3Radius;
        this.arc3Color = arc3Color;

        this.arc4Radius = arc4Radius;
        this.arc4Color = arc4Color;

        this.beamRadius = beamRadius;
        this.beamColor1 = beamColor1;
        this.beamColor2 = beamColor2;
    }

    display() {
        push()
        translate(this.x, this.y);
        rotate(diskAngle);

        //   fill(this.arc1Color);
        arc(0, 0, this.arc1Radius, this.arc1Radius, 0, -60);

        fill(this.arc2Color);
        arc(0, 0, this.arc2Radius, this.arc2Radius, 0, -60);

        fill(this.arc3Color);
        arc(0, 0, this.arc3Radius, this.arc3Radius, 0, -60);

        fill(this.arc4Color);
        arc(0, 0, this.arc4Radius, this.arc4Radius, 0, -60);

        rotate(-60)
        fill(this.beamColor1, this.beamColor2);
        // arc(0, 0, this.beamRadius, this.beamRadius, 0, 60);

        //   fangde(30,50);
  
        let x = 0;
        let y = 0;
        let diameter = 300;
        let startAngle = 0; // Starting angle in degrees
        let endAngle = 60; // Ending angle in degrees
      
        // Create a radial gradient within an arc
        radialGradientWithinArc(x, y, diameter, startAngle, endAngle, [255, 100, 200], [20, 100, 255]);


        // fang();
        //   noLoop()
        // for(r=this.beamRadius;r>0;--r){
        //     // Calculate the interpolation - closer to 0 at the center, closer to 1 at the edge
        //     let inter=map(r,0,this.beamRadius,0,1);
        //     // Lerp the color between white and blue
        //     let c=lerpColor(this.beamColor1,this.beamColor2, inter);
        //     fill(c);
        //     noStroke();
        //     arc(0,0,r*2,r*2,0,60);
        // }

        // noLoop(); // Stops draw() from looping
        // let radius = 200;
        // let centerX = width / 2;
        // let centerY = height / 2;
        // for (let r = radius; r > 0; --r) {
        //   // Calculate the interpolation - closer to 0 at the center, closer to 1 at the edge
        //   let inter = map(r, 0, radius, 1, 0);
        //   // Lerp the color between white and blue
        //   let c = lerpColor(color(255), color(0, 0, 255), inter);
        //   fill(c);
        //   noStroke();
        //   ellipse(centerX, centerY, r * 2, r * 2);

        diskAngle += 1;
        pop()
    }
}
// }
let arc1Radius = 64;
let arc1Color = [99, 78, 137];

let arc2Radius = 58;
let arc2Color = [139, 135, 180];

let beamRadius = 200;
let beamColor1 = [191, 188, 95];
let beamColor2 = [255, 255, 255]

let disk = new Disk(arc1Radius, arc1Color, arc2Radius, arc2Color, 42, 100, 15, 150, beamRadius, beamColor1, beamColor2);






// function fang(){
//     //   noLoop()
//     for(r=this.beamRadius;r>0;--r){
//         // Calculate the interpolation - closer to 0 at the center, closer to 1 at the edge
//         let inter=map(r,0,this.beamRadius,0,1);
//         // Lerp the color between white and blue
//         let c=lerpColor(color(this.beamColor1),color(this.beamColor2), inter);
//         fill(c);
//         noStroke();
//         arc(0,0,r*2,r*2,0,60);
//     }
// }


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
    // This line initializes a new radial gradient using createRadialGradient(), a method of the canvas 2D context (ctx).
// The parameters define the gradient's start and end circles. The first three parameters (x, y, 0) set the starting circle at coordinates (x, y) with a radius of 0, effectively making it a point.
// The next three parameters (x, y, d / 2) set the ending circle at the same coordinates but with a radius of d / 2, making the gradient radiate outward from a central point to the edge of a circle with diameter d.
    let gradient = ctx.createRadialGradient(x, y, 0, x, y, d / 2);


// This adds the initial color (startColor) to the gradient at position 0, which corresponds to the center of the gradient. The color() function converts a color value to a p5.js color object, and toString() converts this object to a CSS color string, which addColorStop() requires.
    gradient.addColorStop(0, color(startColor).toString());
// This adds the final color (endColor) to the gradient at position 1, which corresponds to the outer edge of the gradient. This creates a transition from the startColor at the center to the endColor at the edges.
    gradient.addColorStop(1, color(endColor).toString());
  
    // Apply the gradient as fill style and fill a rectangle that covers the entire area
    ctx.fillStyle = gradient;
    // This sets the previously defined gradient as the fill style for the context. Future shapes filled using this context will use this gradient.
    ctx.fillRect(x - d / 2, y - d / 2, d, d);
  
    // Restore the context to its state before clipping
    ctx.restore();

}
