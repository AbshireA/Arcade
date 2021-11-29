//grab canvas from html
//set up game loop *Continuously update the screen*
//use set TimeOut to change how often the screen gets updated when the speed of the snake increases after player eats an apple
//define speed function global








const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');

let score = 0;

let snakeHeadX = 10;
let snakeHeadY = 10;
const snakePieces = [];
let tailLength = 2;

let foodX = 5;
let foodY= 5;

let gridCount = 20;
let gridSize = canvas.width / gridCount -2;

let speed = 9;
let velocityX = 0;
let velocityY = 0;

class snakePiece {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}


function updateGame () { //game loop
  
  alterSnakePosition ();
  let result = isGameOver();
  if(result) {
    return;
  }
  
  wipeScreen ();

  logFoodCollison ();
  
  canvasSnake ();
  canvasFood ();

  drawScore();

  setTimeout(updateGame, 1000/ speed);



}

function isGameOver() {
  let gameOver= false;

  if (velocityX === 0 && velocityY === 0){
  return false;
  }

  //walls
  if (snakeHeadX < 0){
    gameOver= true;
  }

  else if (snakeHeadX === gridCount) {
    gameOver = true    //encounter issue, after adding = sign canvas goes white
  }                     //issue solved, canvas height and width had too much value to grid count 

  else if (snakeHeadY < 0) {
    gameOver = true;
  }

  else if (snakeHeadY === gridCount) {
    gameOver = true
  }

  for (let i = 0; i < snakePieces.length; i++) {
    let part = snakePieces[i];
    if (part.x === snakeHeadX && part.y === snakeHeadY) {
      gameOver = true;
      break;
    }
  }


  
  if (gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '30px Courier New';
    ctx.fillText('Better luck next time!', canvas.width / 25, canvas.height / 2);
  }
  
  return gameOver;
}

function drawScore() {
  ctx.fillStyle = 'white'
  ctx.font = '20px Courier New'
  ctx.fillText( 'Score ' + score, canvas.width-125, 14)
}

function wipeScreen() {
  
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function canvasSnake() {

  ctx.fillStyle = 'green'
  for (let i = 0; i < snakePieces.length; i++) {
    let part = snakePieces[i];
    ctx.fillRect(part.x * gridCount, part.y * gridCount, gridSize, gridSize)
  }

  snakePieces.push(new snakePiece(snakeHeadX, snakeHeadY)); //item goes at the end of the list next to the head
  if (snakePieces.length > tailLength) {
    snakePieces.shift(); //removes the furthest item from the snake part if we have more than our tail size
  }

  ctx.fillStyle = 'yellow'
  ctx.fillRect (snakeHeadX * gridCount, snakeHeadY * gridCount, gridSize,gridSize);
}
 
  


function alterSnakePosition() {
  snakeHeadX = snakeHeadX + velocityX;
  snakeHeadY = snakeHeadY + velocityY;
  
}

function canvasFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect (foodX * gridCount, foodY * gridCount, gridSize, gridSize)
  
}

function logFoodCollison() {
  if (foodX === snakeHeadX && foodY == snakeHeadY) {
    foodX = Math.floor(Math.random() * gridCount);
    foodY = Math.floor(Math.random() * gridCount);
    tailLength ++;
    score ++;
  }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {

  if (event.keyCode == 38){
    if (velocityY == 1)
      return;
    velocityY = -1;
    velocityX= 0;
  }

  if (event.keyCode == 40){
    if (velocityY == -1)
      return;
    velocityY = 1;
    velocityX= 0;
  }

  if (event.keyCode == 37){
    if (velocityX == 1)
      return;
    velocityY = 0;
    velocityX= -1;
  }

  if (event.keyCode == 39){
    if (velocityX == -1)
      return;
    velocityY = 0;
    velocityX= 1;
  }
}

updateGame();














