
let Offset;
let Offset2;




class Square {
  constructor(x, y, size, color, vx = 0, vy = 0) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;

    this.velocity = createVector(vx, vy);

    this.xspeed = 5;
    this.yspeed = 2;
  }

  // Method to draw the square
  display() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }


  update() {
    // Update position based on velocity
    this.x += this.velocity.x;
    this.y += this.velocity.y;


    let Youtside = this.y < 0 || this.y > height;
    if (Youtside) {
      this.velocity.x *= 1;
      this.velocity.y *= -1;
    }

    let Xoutside = this.x > width || this.x < 0;
    if (Xoutside) {
      this.velocity.x *= -1;
      this.velocity.y *= 1;

    }

    // if (this.x>width || this.x<0){
    //   this.velocity.y = -this.velocity.y;

    // }

    // if(this.y>height || this.y<0){
    //   this.velocity.x = -this.velocity.x;
    // }


  }
}


let square_arr = [];

let shootSquare_arr = [];

let squareSize = 15;







class ball {
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;

  }

  update() {
    this.position.add(this.velocity);
  }

  display() {
    // push();

    fill(236, 206, 86);

    radialGradientWithinArc(this.position.x, this.position.y, 30, 0, 360, [236,206,86], [255,255,255,0]);
    circle(this.position.x, this.position.y, 15);


    // circle(75, 400, 15);
    // pop();
  }

  isOffScreen() {
    return (
      this.position.x < 0 ||
      this.position.x > width ||
      this.position.y < 0 ||
      this.position.y > height
    );
  }
}

let balls_arr = [];















// let d=dist(balls_arr[i].x,balls_arr[i].y,square_arr[i].x,square_arr[i].y);
// let d=dist(ball.position.x)

// if (d<15) {
//   balls_arr.splice(i, 1);
//   square_arr.splice(i,1);
//   // ellipse(0,0,50,50);
// }


// let color = [];


let yellowTriangle;
let semiCircle;

function preload(){
  // yellowTriangle=loadImage("")
  yellowTriangle=loadImage("images/yellowTriangle.png");
  semiCircle=loadImage("images/SemiCircles.png");
  smallSword=loadImage("images/small_sword.png");
  bigSword=loadImage("images/big_sword.png");

  ovalRotate=loadImage("images/ovalRotate.png");
}




function setup() {
  createCanvas(576, 576);
  angleMode(DEGREES)

  arrowShoot = new arrow();

  Offset=random(1000);
  Offset2=random(2000);
  // redOffsetX+=0.001;
  setInterval(arrowShoot.toggle, 1000);

  shootSound=loadSound("images/popSound.mp3")


  // squares
  let numSquares = 7;
  // let squareSize = 15;

  for (let i = 0; i < numSquares; i++) {
    for (let j = 0; j < numSquares; j++) {
      let alternate = (i + j) % 2

      let color = [];
      color = [155, 145, 183]
      // draw the square at the specified alternate
      if (alternate == 0) {
        let square = new Square(j * squareSize, i * squareSize, squareSize, color);
        square_arr.push(square);
      }
      // color method to draw squares!!

      // if (alternate == 0) {
      //   color = [155, 145, 183]
      // } else {
      //   color = [155, 145, 183, 0]
      // }
      // let square = new Square(j * squareSize, i * squareSize, squareSize, color);
      // square_arr.push(square);
    }
  }



}










function draw() {
  background(18, 53, 95);

  // text(mouseX+","+mouseY, 10,20)


  if (square_arr[0]) {
    console.log(square_arr[0])
  }

  redTriangle();
  image(semiCircle,290,95);

  smallSwordDraw();
  zShape();
  bigSwordDraw();


  windMill();

  fill(139,135,180);
  rect(358,468,75,75);

  bottomCircles();

  // orange triangle
  fill(233,159,36,180);
  triangle(181,214,212,183,225,244);

  image(yellowTriangle,208,215);



  radialGradientWithinArc(286, 286, 147, 0, 360, [213,216,199,150], [195,13,35,150]);

  disk.display()

  // draw squares
  squareMatrix();

  shootSquare();

  outSquaresDraw();

  arrowPoint();
  Offset += 0.01;
  Offset2-=0.04;

  doubleArc();
  
  arrowBase();
  arrowShoot.display();
  // arrowShoot.update();


  // draw ball
  ballDraw();


  // let arc1Color=[139,135,180];
  // disk(arc1Color);

  // diskRotate();

  eastMountain();
  westMountain();

  // Check for collisions
  checkCollisions();

  // disk.display();

  ovalRotateDraw();

  centralBubblesDraw();

}











// squares outside the matrix
function outSideSquares(x, y, squareSize, color) {
  let outSquare = new Square(x, y, squareSize, color);
  outSquare.display();
  // square_arr.push(outSquare);
}


function outSquaresDraw(){
    // outside matrix squares
    outSideSquares(25, 30, 15, [155, 145, 183]);
    outSideSquares(225, 45, 15, [155, 145, 183]);
    outSideSquares(200, 60, 15, [155, 145, 183]);
    outSideSquares(200, 90, 15, [155, 145, 183]);
}




// // arrow
// let arrowAngle;

// function arrowShoot() {
//   // rectMode(CORNER);
//   push();
//   translate(75, 400);
//   arrowAngle = atan2(mouseY - 400, mouseX - 75);
//   rotate(arrowAngle+90);
//   // scale(1.1)
//   // top arrow
//   fill(203, 196, 113, 200);
//   triangle(-20, -85, 0, -138, 20, -85)
//   // bottom arrow
//   fill(167, 58, 39, 200);
//   triangle(0, 0, -10, -100, 10, -100);

//   pop();
// }

let arrowAngle;

let bigger = false;


class arrow {
  constructor() {
    this.scale = 1;
  }

  display() {


    push();
    translate(75, 400);

    arrowAngle = atan2(mouseY - 400, mouseX - 75);
    rotate(arrowAngle + 90);

    if (bigger) {
      this.scale += 0.003;
    } else {
      this.scale -= 0.003;
    }

    scale(this.scale);

    // top arrow
    fill(203, 196, 113, 200);
    triangle(-20, -85, 0, -138, 20, -85)
    // bottom arrow
    fill(167, 58, 39, 200);

    triangle(0, 0, -10, -100, 10, -100);

    pop();
  }


  toggle() {
    bigger = !bigger;
  }


}

let arrowShoot;


function mousePressed() {
  // Calculate the shooting direction from the current arrow angle
  let ballDirection = p5.Vector.fromAngle(arrowAngle * PI / 180).setMag(5);
  // let ballDirection = p5.Vector.fromAngle(arrowAngle, 5);   //could also set magnitude within fromAngle


  let arrowLength = 138;
  let arrowTipX = 75 + cos(arrowAngle) * arrowLength; // Calculate arrow tip x-coordinate
  let arrowTipY = 400 + sin(arrowAngle) * arrowLength; // Calculate arrow tip y-coordinate

  // Create a new ball at the calculated arrow tip position
  balls_arr.push(new ball(createVector(arrowTipX, arrowTipY), ballDirection));

  if(shootSound.isPlaying()){
    shootSound.stop();
  }else{
    shootSound.play();
  }
}







function checkCollisions() {
  for (let i = balls_arr.length - 1; i >= 0; i--) {
    let ball = balls_arr[i];
    for (let j = square_arr.length - 1; j >= 0; j--) {
      let square = square_arr[j];
      let translatedSquareX = square.x + 75; // Adjust if squares are translated
      let translatedSquareY = square.y + 30; // Adjust if squares are translated



      let collide = ball.position.x > translatedSquareX &&
        ball.position.x < translatedSquareX + square.size &&
        ball.position.y > translatedSquareY &&
        ball.position.y < translatedSquareY + square.size;


      // Check if the ball's center is within the square's boundaries
      if (collide) {
        // determine direction based on disk angle
        // let squareAngle=radians(diskAngle);
        let squareAngle = diskAngle;
        let speed = 5;
        let vx = cos(squareAngle) * speed;
        let vy = sin(squareAngle) * speed;

        //create a square at the disk's center with calculated velocity. 

        let shootSquare = new Square(disk.x, disk.y, squareSize, [155, 145, 183], vx, vy);
        shootSquare_arr.push(shootSquare);

        // Collision detected, remove the specific ball and square
        // if(arraysEqual(square.color,[155, 145, 183]))
        balls_arr.splice(i, 1);
        square_arr.splice(j, 1);
        // color=[0,1,2];
        // shootGlow.display()
        disk.setGlow(true);//Activate glow on collision
        setTimeout(() => disk.setGlow(false), 2000);
        //Example: turn off glow after 1 second, () => disk.setGlow(false): This part is an arrow function, a concise way to define anonymous functions in JavaScript. 
        //disk.setGlow(false) call) will be executed 1 second after setTimeout is called 
        break; // Since the ball is removed, no need to check other squares
      }
    }
  }
}


// compare two arrays of colors for equality

// function arraysEqual(a,b){
//   if(a.length!==b.length)return false;
//   for(let i=0; i<=a.length; i++){
//     if(a[i]!==b[i])return false;
//   }
//   return true;
// }

// diskDraw();



let arcX = 407;
let arcY = 263;

// let diskAngle=0;

let diskAngle = 0;
class Disk {
  constructor() {
    this.x = 415;
    this.y = 240;

    this.arc1Radius = 64;
    this.arc1Color = [99,78,137];

    this.arc5Radius=57;
    this.arc5Color=[139,135,180];

    this.arc2Radius = 40;
    this.arc2Color = [206,168,110];

    this.arc3Radius = 20;
    this.arc3Color = [26,78,112];

    this.arc4Radius = 14;
    this.arc4Color = [167,58,39];

    this.beamRadius = 200;
    this.beamColorStart = [0];
    this.beamColorEnd=[0];

    this.glowing = false;
    this.scaleDisk = 1;
    this.scaleDirection = 0.01;
  }

  display() {
    push()
    translate(this.x, this.y);
    rotate(diskAngle)

    if (this.glowing) {
      this.arc5Color=[89,137,170];
      this.arc2Color=[230,217,155];
      this.arc4Color=[233,147,38];
      
      this.beamColorStart=[255,255,255];
      this.beamColorEnd=[191,188,95,120];

      if (this.scaleDisk >=1.6) {
        this.scaleDirection = -0.01;



      } else if (this.scaleDisk<=1) {
        this.scaleDirection = 0.01;
      }

      this.scaleDisk += this.scaleDirection;
    } else {
      this.arc5Color=[139,135,180];
      this.arc2Color=[206,168,110];
      this.arc4Color = [167,58,39];

      this.beamColorStart=[255,255,255];
      this.beamColorEnd=[191,188,95,0];

      this.scaleDisk = 1;
    }

    scale(this.scaleDisk);

    // scale(3);
    // fill('white')
    // arc(0,0, 50,50);
    fill(this.arc1Color);
    stroke(226,212,188);
    strokeWeight(1.5)
    arc(0, 0, this.arc1Radius, this.arc1Radius, 0, -60);

    noStroke();
    fill(this.arc5Color);
    arc(0,0,this.arc5Radius,this.arc5Radius,0,-60)

    stroke(24,74,109)
    strokeWeight(1.5)
    fill(this.arc2Color);
    arc(0, 0, this.arc2Radius, this.arc2Radius, 0, -60);

    noStroke();
    fill(this.arc3Color);
    arc(0, 0, this.arc3Radius, this.arc3Radius, 0, -60);

    fill(this.arc4Color);
    arc(0, 0, this.arc4Radius, this.arc4Radius, 0, -60);

    rotate(-60)
    // fill(this.beamColor);

    // arc(0,0, this.beamRadius,this.beamRadius,0,60);



    // Create a radial gradient within an arc
    radialGradientWithinArc(0, 0, 200, 0, 60, this.beamColorStart, this.beamColorEnd);


    diskAngle += 1;
    pop()
  }

  setGlow(state) {
    this.glowing = state;
  }




}



let disk = new Disk();



// let arc1ColorGlow=[255,255,255];

// let arc2ColorGlow=[255,255,255];
// let shootGlow=new Disk(arc1Radius, arc1ColorGlow)


// function beam(){
//   let radius=90;
//   for(r=radius;r>0;--r){
//       // Calculate the interpolation - closer to 0 at the center, closer to 1 at the edge
//     let inter=map(r,0,radius,1,0);
//           // Lerp the color between white and blue
//     let c = lerpColor(color(191,188,95),color(255,255,255),inter);
//     fill(c);
//     noStroke();
//     arc(0,0,r*2,r*2,-QUARTER_PI,0);
//   } 
// }



// function disk(arc1Color){

//   fill(arc1Color);
//   arc(0, 0, 80, 80, 0, -90);
//   beam();




// }

// function diskRotate(){
//   push();
//   translate(arcX,arcY)
//   rotate(diskAngle);

//   let arc1Color=[139,135,180];
//   disk(arc1Color);
//   // beam()
//   // rect(0,0,10,10)


//   pop();

//   diskAngle+=1/100;
//   if (diskAngle>=360){
//     diskAngle=0;
//   }
// }




function diskShoot() {
  console.log(arcX);
  // arc1Color=[89,137,170]
  // diskRotate();


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



function squareMatrix(){
  for (let square of square_arr) {
    push();
    translate(75, 30);
    square.update();
    square.display()
    pop();
  }
}


function shootSquare(){
  for (let shootSquare of shootSquare_arr) {
    push();
    // shootSquare.color(0,0,0);
    shootSquare.update();
    shootSquare.display();
    pop();
  }
}


function ballDraw(){
  for (let i = balls_arr.length - 1; i >= 0; i--) {
    balls_arr[i].update();
    balls_arr[i].display();
    if (balls_arr[i].isOffScreen()) {
      balls_arr.splice(i, 1);
    }
  }

  // for (let ball of balls_arr) {
  //   ball.display();
  // }
}







function zShape(){

  fill(167,106,44,210)
  beginShape(); // Start defining a complex shape
  vertex(448, 287); // Vertex 1
  vertex(475, 442);  // Vertex 2
  vertex(251, 402); // Vertex 3
  vertex(256, 537); // Vertex 4
  vertex(220, 542); // Vertex 5
  vertex(237, 387); // Vertex 6
  vertex(433,407);

  endShape(CLOSE);
}

function redTriangle(){
  fill(124,27,31)
  triangle(147,387,134,470,430,68)
}




function arrowPoint(){
  let centerX = 0; // Center of the canvas
  let centerY = 0;

  let redRangeX = 25; // Wider range for noticeable movement
  let redRangeY=25;

  let greenRangeX=25;
  let greenRangeY=20;

  

  // Calculate X position using noise for horizontal movement
  let redTranslateX = map(noise(Offset), 0, 1, centerX - redRangeX / 2, centerX + redRangeX / 2);
  let redTranslateY=map(noise(Offset),0,1,centerY-redRangeY/2,centerY+redRangeY/2);

  let green1TranslateX=map(noise(Offset),0,1,centerX-greenRangeX/2,centerX+greenRangeX/2);
  let green1TranslateY=map(noise(Offset),0,1,centerY+greenRangeX/2,centerX-greenRangeY/2);

  let green2TranslateX=map(noise(Offset),0,1,centerX-greenRangeX/2,centerX+greenRangeX/2);
  let green2TranslateY=map(noise(Offset2), 0, 1, centerY+greenRangeY/2,centerY-greenRangeY/2);
  
  
  // red
  push();
  translate(redTranslateX,redTranslateY)
  fill(167,58,39);
  triangle(142,160,152,147,159,165);
  pop();


  fill(127,169,127)


// green1 (top)
  push();
  translate(green1TranslateX,green1TranslateY);
  triangle(225,137,235,146,223,153);
  pop();

  // green2 (bottom)
  push();
  translate(green2TranslateX,green2TranslateY);
  triangle(142,219,155,220,148,231);
  pop();
}



function doubleArc(){
  let arcCenterX=0;
  let arcCenterY=0;

  let arcRangeX=10;
  let arcRangeY=20;

  let arc1TranslateX=map(noise(Offset), 0, 1, arcCenterX-arcRangeX/2,arcCenterX+arcRangeX/2);
  let arc1TranslateY=map(noise(Offset), 0, 1, arcCenterY-arcRangeY/2,arcCenterY+arcRangeY/2);

  let arc2TranslateX=map(noise(Offset2), 0, 1, arcCenterX-arcRangeX/2, arcCenterX+arcRangeX/2);
  let arc2TranslateY=map(noise(Offset2), 0, 1, arcCenterY-arcRangeY/2, arcCenterY+arcRangeY/2);

  push();
  translate(195,205);
  rotate(135);
  noFill();

  stroke(232,217,196)
  strokeWeight(2);
  arc(arc1TranslateX,arc1TranslateY , 60, 60, 0, 180);

  stroke(204,185,57);
  strokeWeight(3)
  arc(arc2TranslateX, arc2TranslateY, 80, 80, 0, 180);
  pop();
}



function smallSwordDraw(){
  let smallCenterX=208;
  let smallCenterY=436;
  
  let smallRangeX=15;
  let smallRangeY=15;
  
  let smallTranslateX=map(noise(Offset2), 0, 1, smallCenterX-smallRangeX/2, smallCenterX+smallRangeX/2);
  let smallTranslateY=map(noise(Offset2), 0, 1, smallCenterY-smallRangeY/2, smallCenterY+smallRangeY/2);
  

  image(smallSword,smallTranslateX,smallTranslateY);

}

function bigSwordDraw(){
  let bigCenterX=181;
  let bigCenterY=421;
  
  let bigRangeX=20;
  let bigRangeY=20;
  
  let bigTranslateX=map(noise(Offset), 0, 1, bigCenterX-bigRangeX/2, bigCenterX+bigRangeX/2);
  let bigTranslateY=map(noise(Offset), 0, 1, bigCenterY-bigRangeY/2, bigCenterY+bigRangeY/2);

  image(bigSword,bigTranslateX,bigTranslateY);
}






let circleScale=1;
function arrowBase(){
  let diameter=49;

  push();
  translate(75,400);
  radialGradientWithinArc(0, 0, 106, 180, 360, [213,1205,171],[255,255,255,0]);

  fill(204,185,57,180);
  rect(0,-10,70,12);
  rect(0,20,45,12)

  fill(38,94,146)
  circle(0,0,20);

  noFill();
  stroke(201,100,41);
  strokeWeight(3)
  
  if(bigger){
    circleScale+=0.003;
  }else{
    circleScale-=0.003;
  }


  scale(circleScale);
  circle(0,0,diameter);


  pop();

}

let ovalAngle=0;
function ovalRotateDraw(){
  imageMode(CENTER);
  push();
  translate(409,70);
  rotate(ovalAngle);
  image(ovalRotate,0,0);

  ovalAngle+=0.5;
  if(ovalAngle>360){
    ovalAngle=0;
  }
  pop();

  imageMode(CORNER)
}


let windMillAngle=0;
function windMill(){
  push();
  translate(455,315);

  rotate(windMillAngle);

  stroke(255,255,255)
  strokeWeight(3);
  stroke(173,57,40);
  line(0,-28,0,28);
  line(-28,0,28,0)

  fill(232,209,56);
  noStroke();
  circle(0,0,14);

  windMillAngle+=1;
  if(windMillAngle>360){
    windMillAngle=0;
  }

  pop();
}


function bottomCircles(){
  push();
  translate(358,544);

  noFill()
  strokeWeight(2);
  stroke(184,112,31);
  circle(0,0,50);

  fill(121,170,127,180);
  noStroke();
  circle(0,0,35);
  pop();
}


function centralBubblesDraw(){
  centralBubbles(293,276,10,[42,94,50]);
  centralBubbles(317,313,16,[42,94,50]);
  centralBubbles(259,320,10,[38,94,136]);
  centralBubbles(310,284,10,[38,94,136]);
  centralBubbles(259,320,10,[38,94,136]);
  centralBubbles(338,287,10,[38,94,136]);
  centralBubbles(278,341,18,[245,212,74]);
  centralBubbles(344,243,16,[245,212,74]);
}

function centralBubbles(x,y,d,c){
  fill(c)
  circle(x,y,d)
}

function eastMountain(){
  fill(167,58,39)
  beginShape(); // Start defining a complex shape
  vertex(473, 532); // Vertex 1
  vertex(495, 514);  // Vertex 2
  vertex(477, 494); // Vertex 3
  vertex(503, 483); // Vertex 4
  vertex(495, 475); // Vertex 5
  vertex(536, 408); // Vertex 6
  vertex(503, 541); // Vertex 6
  endShape(CLOSE); 
}

function westMountain(){
  fill(174,107,130)
  beginShape(); // Start defining a complex shape
  vertex(96, 488); // Vertex 1
  vertex(125, 464);  // Vertex 2
  vertex(124, 489); // Vertex 3
  vertex(164, 468); // Vertex 4
  vertex(158, 508); // Vertex 5
  vertex(172, 496); // Vertex 6
  vertex(164, 533); // Vertex 6
  endShape(CLOSE); 
}

