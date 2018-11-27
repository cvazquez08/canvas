const myCanvas = document.getElementById("my-canvas");
//ctx has all the drawings methods
const ctx = myCanvas.getContext("2d");

function drawBackground(){
    ctx.fillStyle = "pink";
    ctx.fillRect(0, 0, 1000, 500);

    // add some text
    ctx.fillStyle = "green";
    ctx.font = "30px Arial";
    ctx.fillText("Cool Game :)", 800, 50);

}

drawBackground();


const fireballImg = new Image();
const supermanImg = new Image();

fireballImg.src = "./images/fireball.png";
supermanImg.src = "./images/superman.png";

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

    fireballX -= 5;

    if(fireballX < -50){
      fireballX = 1000;
      fireballY = Math.floor(Math.random() * 500);
    }

    // ctx.drawImage(which image, x, y, width, height);
    ctx.drawImage(fireballImg, fireballX, fireballY, 50, 50);

    // ctx.drawImage(which image, x, y, width, height);
    ctx.drawImage(supermanImg, supermanX, supermanY, 150, 150);

    //re-draw the whole scene

    requestAnimationFrame(function(){
      //sets up a recursive loop (a function that calls itself mutliple times)
      drawingLoop();
    })

}

drawingLoop();


