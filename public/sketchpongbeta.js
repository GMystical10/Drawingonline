//Declare Variables & Initalize Variables
//makes ball mov
var socket;


var x;
var y;

var dx;
var dy;

//paddle variable
var leftPaddleY = 150;
var rightPaddleY = 150;



//the score
var P1score = 0;
var P2score = 0;




function setup() {
  createCanvas(600, 400);
  
  socket = io.connect('http://localhost:8000');

  resetBall();
    if (dx > -2 && dx < 2) {
    if (dx > 0) {
      dx+=2;
    }
    if (dx < 0) {
      dx-=2;
    }
  }
  if (dy > -2 && dy < 2) {
    if (dy > 0) {
      dy+=2;
    }
    if (dx < 0) {
      dy-=2;
    }
  }

  
  
}

function draw() {

  
  
    // When we receive data
    function(data) {
      // Draw a blue circle
  
    
  background(0);
  fill(255);
  ellipse(300, 200, 100);
  fill(0);
  ellipse(300, 200, 95);
  
  boundaries();
  scoreShowP1();
  scoreShowP2();
  p1();
  p2();
  barriers();
  keyPressed();
  ball();
  middlebarrier();
  collisionsCheckP1();
  collisionsCheckP2();
  ballBoundarieY();
  moveball();

    }
  );
  
//stroke (0, 0, 255);
  
 //drawLines();
}

function keyPressed() {


  if(keyIsDown(87)){
     leftPaddleY -= 10;
 }

   if(keyIsDown(83)){
     leftPaddleY += 10;
  }
 
    if(keyIsDown(UP_ARROW)){
     rightPaddleY -= 10;
 }

   if(keyIsDown(DOWN_ARROW)){
     rightPaddleY += 10;
  }

  
}

function collisionsCheckP1(){
    if (x < 40 && x > 0) {
    if (y > leftPaddleY && y < leftPaddleY + 100) {
      dx *= -1;
      dx+=0.8;
      x = 42; //fixes a glitch that occurs occasionally
    }
  }
}

function collisionsCheckP2(){
    if (x > 560 && x < 600) {
    if (y > rightPaddleY && y < rightPaddleY + 100) {
      dx*=-1;
      dx-=0.8
      x = 558; //fixes a glitch that occurs occasionally
    }
  }


}

function ballBoundarieY(){
    if (y <  25) {
    dy *= -1;
 }     
    
  if (y > 375) {
    dy *= -1;
  }
}


function mouseReleased() {
  
  
}


function p1(){
  fill(255, 0, 0);
  rect(0, leftPaddleY, 25, 100);
}


function p2(){
  fill(0, 0, 255);
  rect(575, rightPaddleY, 25, 100);
}


function ball(){
  fill(255);
  ellipse(x, y, 25);
}


function boundaries(){
  //The top boundary
  fill(255);
  rect(0, 0, 600, 25);
//The Bottom boundary
  fill(255);
  rect(0, 375, 600, 25);
  
}

function middlebarrier(){
  fill(255);
  rect(295, 25, 10, 350);
}



  
function moveball(){
  x+=dx;
  y+=dy;
}
//Starting position of ball
function resetBall(){
  x = 300;
  y = 200;
  //makes ball go random directions
  if(P1score == P2score){
  dx = random(-5, -4);
  dy = random(-5, -4);
  }else if(P1score < P2score){
  dx = random(5, 4);
  dy = random(5, -5);
  }else if (P1score > P2score){
  dx = random(-5, -4);
  dy = random(5, -4);
  } 

}

function mouseClicked() {
  // console.log("X: " + mouseX + " Y: " + mouseY);
}

function barriers(){
  if (leftPaddleY  < 25) {
    leftPaddleY  = 25;
}
  if (leftPaddleY  > 275) {
    leftPaddleY  = 275;
}
  
  if (rightPaddleY < 25) {
    rightPaddleY = 25;
}
  
    if (rightPaddleY > 275) {
    rightPaddleY = 275;
}

}

function scoreShowP2(){
  fill(0, 0, 255);
  textSize(50);
  text(P2score, 450, 75);
  
  if (x < 0){
    resetBall();
    P2score++;
    
  }
}

function scoreShowP1(){
  fill(255, 0, 0);
  textSize(50);
  text(P1score, 125, 75);
  
  if (x > 600){
    resetBall();
    P1score++;
    
  }
}

function sendPaddle(lypos,rypos){

  console.log("sendPaddle: " + lypos + " " + rypos);
  
  // Make a little object with  and y
  var data = {
    x: lypos,
    x2: rypos
  };

  // Send that object to the socket
  socket.emit('paddle',data);

}

  


 
 

function drawLines() {
  //draw gridLines
  for (var i = 0; i <= 12; i++) {
    for (var j = 0; j <= 12; j++) {
      if (i % 2 == 0) {
        strokeWeight(3);
      } else {
        strokeWeight(1);
      }
      line(i * 50, 0, i * 50, 400);
      if (j % 2 == 0) {
        strokeWeight(2);
      } else {
        strokeWeight(1);
      }
      line(0, j * 50, 600, j * 50);
    }
  }
  //number x & y axis
  fill(0, 0, 255);
  textSize(26);
  textAlign(LEFT);
  for (var i = 0; i <= 6; i++) {
    text(i * 100, i * 100 - 25, 20);
    text(i * 100, 0, i * 100 + 2);
  }
  text("0", 2, 20);
  fill(0);
}
    