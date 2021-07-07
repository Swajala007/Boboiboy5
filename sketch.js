var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boboiboy,boboiboy_running, boboiboy_collided;
var ground, invisibleGround, groundImage;

var coinsGroup, coinsImage;
var aliensGroup, alien1, alien2, alien3, alien4, alien5, alien6;

var score=0; 
var points=0;

var gameOver, restart;

function preload(){
  
  
  
  boboiboy_running =   loadAnimation("b3.png","b4.png","b5.png","b6.png","b7.png");
  boboiboy_collided = loadAnimation("col.png");
  
  groundImage = loadImage("ground.png");
  
  coinImage = loadImage("coins.png");
  
  alien1 = loadImage("adudu.png");
  alien2 = loadImage("adudu.png");
  alien3 = loadImage("adudu.png");
  alien4 = loadImage("adudu.png");
  alien5 = loadImage("adudu.png");
  alien6 = loadImage("adudu.png");
  
  gameOverImg = loadImage("GameOver.png");
  restartImg = loadImage("restart.png");
}



function setup() {
 createCanvas(8000,8000);
 
  boboiboy = createSprite(100,130,20,50);
  boboiboy.addAnimation("running", boboiboy_running);
  boboiboy.addAnimation("collided",boboiboy_collided);
  boboiboy.scale = 0.5;
  
  
  ground = createSprite(8000,8000,400,20);
  ground.addImage("ground",groundImage);
  ground.scale = 4;
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  
  restart = createSprite(300,150);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.4;
  restart.scale = 0.3;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  aliensGroup = new Group();
  coinsGroup = new Group();
  

  boboiboy.setCollider("rectangle",0,0,50,50);

  boboiboy.debug = false;
  
  score = 0;
  points = 0;
}

function draw() {
  
  
  background(255);
  text("Score: "+ score, 300,50);
  text("Points: "+ points,100,50);
  
    
 
  
  
  if(boboiboy.isTouching(coinsGroup)){
    coinsGroup.destroyEach();
    points = points+5;
  }
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
  
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("UP_ARROW") && boboiboy.y >= 159) {
      boboiboy.velocityY = -15;
    }
  
    boboiboy.velocityY = boboiboy.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    boboiboy.collide(invisibleGround);
    spawnCoins();
    spawnAliens();
  
    if(aliensGroup.isTouching(boboiboy)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    ground.velocityX = 0;
    boboiboy.velocityY = 0;
    aliensGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    
    
    boboiboy.changeAnimation("collided",boboiboy_collided);
   
    aliensGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
 
}


function spawnCoins() {
  
  if (frameCount % 140 === 0) {
    var coin = createSprite(600,120,40,10);
    coin.y = Math.round(random(80,120));
    coin.addImage(coinImage);
    coin.scale = 0.2;
    coin.velocityX = -3;
    
    coin.lifetime = 200;
    
    coin.depth = boboiboy.depth;
    boboiboy.depth = boboiboy.depth + 1;
    
    coinsGroup.add(coin);
  }
  
}

function spawnAliens() {
  if(frameCount % 60 === 0) {
    var alien = createSprite(600,195,10,40);
    alien.velocityX = -(6 + 3*score/100);
  
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: alien.addImage(alien1);
              break;
      case 2: alien.addImage(alien2);
              break;
      case 3: alien.addImage(alien3);
              break;
      case 4: alien.addImage(alien4);
              break;
      case 5: alien.addImage(alien5);
              break;
      case 6: alien.addImage(alien6);
              break;
      default: break;
    }
    
    alien.scale = 0.5;
    alien.lifetime = 300;
    aliensGroup.add(alien);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  aliensGroup.destroyEach();
  coinsGroup.destroyEach();
  
  boboiboy.changeAnimation("running",boboiboy_running);
  
 
  
  score = 0;
  points = 0;
  
}

