
function radialGradient(startX, startY, startRadius, endX, endY, endRadius, startColor, endColor) {
    let gradient = drawingContext.createRadialGradient(startX, startY, startRadius,endX, endY, endRadius,startColor, endColor);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);

    drawingContext.fillStyle = gradient;
}


function setup() {
    createCanvas(576, 576);
    colorMode(HSB,360,100,100,100)
    angleMode(DEGREES);

}

function draw() {
    background(230,30,23);
    // disk.display();

    radiialGradient(
        width / 2 - 200, 
        height / 2 - 200, 
        0,
        width / 2 + 200, 
        height / 2 + 200, 
        200,
        color(310, 100, 100, 100), 
        color(250, 100, 100, 100)
    );
    
    ellipse(100,100,50,50)
}
