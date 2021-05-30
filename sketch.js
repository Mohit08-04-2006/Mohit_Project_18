var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword;
var fruit;
var alien;
var sword_img;
var fruit1_image, fruit2_image, fruit3_image, fruit4_image;
var alien1_img, alien2_img;
var fruitsGroup, enemiesGroup;
var over, over_img;
var score = 0;
var overSound, swooshSound;

function preload(){
 sword_img = loadImage("sword.png");
  fruit1_image = loadImage("fruit1.png");
   fruit2_image = loadImage("fruit2.png");
   fruit3_image = loadImage("fruit3.png");
   fruit4_image = loadImage("fruit4.png");
  alien1_img = loadImage("alien1.png");
  alien2_img = loadImage("alien2.png");
  over_img = loadImage("gameover.png");
  overSound = loadSound("gameover.mp3");
  swooshSound = loadSound("knifeSwooshSound.mp3");
 
}

function setup(){
  createCanvas(600,500);
  sword = createSprite(300,400,30,50);
  sword.addImage(sword_img);
  sword.scale = 0.5;
  
  over = createSprite(270,200,100,30);
    over.addImage(over_img);
    
  fruitsGroup = new Group();
  enemiesGroup = new Group();
  
}

function draw(){
  background("skyblue");
  
  // Adding scores
  text("score="+score,250,20);
  
   //Adding States
  if (gameState == PLAY){
     fruits();
     enemies();
    
     over.visible = false; 
    
     if (fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
       swooshSound.play();
       score = score+1;
       
  }
  
  if (enemiesGroup.isTouching(sword)){
    overSound.play();
    gameState = END;
    
  }
  
  }
  else if (gameState == END){
   
    fruitsGroup.setLifetimeEach(0);
    enemiesGroup.setVelocityXEach(0);
    enemiesGroup.setLifetimeEach(0);
    
  over.visible = true;
    
     textSize(20);
    fill("red");
    text("Press 'r' to restart",200,250);
    
    if (keyDown("r")){
      gameState = PLAY;
      score = 0;
    }
    
  }
  
  sword.x = mouseX;
  sword.y = mouseY;
  
  drawSprites();
}

function fruits(){
  if (frameCount% 70 == 0){
    var s = Math.round(random(10,250));
    fruit = createSprite(550,s,20,20);
    fruitsGroup.add(fruit);
  }
  
  if (frameCount% 70 == 0){
    var r = Math.round(random(1,4));
    fruit.velocityX =-(4+score/4);
  
    switch(r){
           case 1: fruit.addImage(fruit1_image);
        fruit.scale = 0.2;
      break;
      
      case 2: fruit.addImage(fruit2_image);
        fruit.scale = 0.2;
        break;
        
         case 3: fruit.addImage(fruit3_image);
        fruit.scale = 0.2;
        break;
        
         case 4: fruit.addImage(fruit4_image);
        fruit.scale = 0.2;
        break;
           }
    fruit.lifetime = 120;
  }
}

function enemies(){
  if (frameCount% 200 == 0){
  var u = Math.round(random(10,250));
    alien = createSprite(550,u,20,20);
    enemiesGroup.add(alien);
  }
  
  if (frameCount% 200 == 0){
    var t = Math.round(random(1,2));
    alien.velocityX =-(4+score/10);
    
    switch(t){
      case 1: alien.addImage(alien1_img);
        break;
        
        case 2: alien.addImage(alien2_img);
        break;
    }
    alien.lifetime = 120;
  }
}