const myCanvas = document.getElementById("my-canvas");
//ctx has all the drawings methods
const ctx = myCanvas.getContext("2d");

// global variables:
let score = 0;
let isOver = false;

function drawBackground(){
    ctx.fillStyle = "pink";
    //  1000 === width of canvas 500 === height of canvas (set in index.html when canvas was created)
    ctx.fillRect(0, 0, 1000, 500);

    // add some text
    ctx.fillStyle = "green";
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 800, 50);

}

drawBackground();


const fireballImg = new Image();
const supermanImg = new Image();

fireballImg.src = "images/fireball.png";
supermanImg.src = "/images/superman.png";

let fireballX = 800;
let fireballY = 200;

let supermanX = 0;
let supermanY = 200;

// //static on canvas should use onload function
// fireballImg.onload = function(){
// // ctx.drawImage(which image, x, y, width, height);
// ctx.drawImage(fireballImg, fireballX, fireballY, 50, 50);

// }
// supermanImg.onload = function(){
//   // ctx.drawImage(which image, x, y, width, height);
//   ctx.drawImage(supermanImg, supermanX, supermanY, 150, 150);
  
// }

// move the superman!

document.onkeydown = function(event){
  // console.log(event.keyCode);
  switch(event.keyCode){
    case 37: // left arrow
      supermanX -= 10; 
      break;
    case 39: //right arrow
      supermanX += 10;
      break;
    case 38: //up arrow
      supermanY -= 10;
      break;
    case 40: //down arrow
      supermanY += 10;
      break;
  }
}



//animate the canvas

function drawingLoop(){
    // erase the canvas before drawing again => creates animation effect
    ctx.clearRect(0, 0, 1000, 500);

    drawBackground();
    // change X coordinate -5 everytime it redraws
    fireballX -= 5;

    //once fireball is at -50 (X) draw new fireball at 1000X and random Y position
    if(fireballX < -50){
      fireballX = 1000;
      fireballY = Math.floor(Math.random() * 450);
      
    }

    drawEverything();
    if(isOver === false){
           //re-draw entire canvas
    requestAnimationFrame(function(){
      //sets up a recursive loop (a function that calls itself mutliple times)
      drawingLoop();
    })
    }
 

}

function drawEverything(){

      // ctx.drawImage(which image, x, y, width, height);
      ctx.drawImage(fireballImg, fireballX, fireballY, 50, 50);

      // ctx.drawImage(which image, x, y, width, height);
      ctx.drawImage(supermanImg, supermanX, supermanY, 150, 150);

      if(checkCollison(supermanX, supermanY, fireballX, fireballY)){
        // console.log("ON FIRE!!!!");
        gameOver();
      }

      if(fireballX === 0){
        score++;
      }

}

function checkCollison(obj1x, obj1y, obj2x, obj2y){

      // supermanY + superman height >= fireballY
  return obj1y + 150 >= obj2y
      //  supermanY <= fireballY + fireball height
      && obj1y <= obj2y + 50
      //  supermanX + superman width >= fireballX
      && obj1x + 150 >= obj2x
      //  supermanX <= fireballx + fireball width
      && obj1x <= obj2x + 50
}

function gameOver(){
    ctx.clearRect(0,0, 1000, 500);
    drawBackground();
    
    const deadSupermanImg = new Image();
    deadSupermanImg.src = "images/deadsuperman.png";
    deadSupermanImg.onload = function(){
      ctx.drawImage(deadSupermanImg, 480, 300, 150, 150);
    }

    isOver = true;
    ctx.font = "bold 70px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", 400, 225);
}

// call drawingloop once so it can start, then recursive loop will continue to run
drawingLoop();


