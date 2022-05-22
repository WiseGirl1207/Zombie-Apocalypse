var path,girl;
var pw1,pw2,pw3,pw4,pw5,pw6,pw7,pw8;
var pathImg
var bullet
var MCharacter
var zombieLeft
var bulletGroup
var zombieLeftGroup
var zombieRightGroup
var bulletArray = [];
var ZombieArray = [];
var dir = 1;
var score = 0;
var bulletCount = 35;
var playerLife = 2;
// var zombieCount = 5;

var gameState = "INSTRUCTIONS";

var distance=0;
var gameOver, restart;

function preload(){

  standingLeft = loadAnimation("MC2/standingL.png")
  standingRight = loadAnimation("MC/standingR.png")
  runningRight = loadAnimation("MC/MC_00.png", "MC/MC_01.png", "MC/MC_02.png", 
  "MC/MC_03.png", "MC/MC_04.png", "MC/MC_05.png", "MC/MC_06.png", "MC/MC_07.png", 
  "MC/MC_08.png", "MC/MC_09.png", "MC/MC_10.png", "MC/MC_11.png", "MC/MC_12.png", 
  "MC/MC_13.png", "MC/MC_14.png", "MC/MC_15.png", "MC/MC_16.png");

  runningLeft = loadAnimation("MC2/MC2_00.png", "MC2/MC2_01.png", "MC2/MC2_02.png", 
  "MC2/MC2_03.png", "MC2/MC2_04.png", "MC2/MC2_05.png", "MC2/MC2_06.png", "MC2/MC2_07.png", 
  "MC2/MC2_08.png", "MC2/MC2_09.png", "MC2/MC2_10.png", "MC2/MC2_11.png", "MC2/MC2_12.png", 
  "MC2/MC2_13.png", "MC2/MC2_14.png", "MC2/MC2_15.png", "MC2/MC2_16.png")

  zombieRunLeft = loadAnimation("ZombieWalking/zombie_00.png", "ZombieWalking/zombie_01.png", "ZombieWalking/zombie_02.png", 
  "ZombieWalking/zombie_03.png", "ZombieWalking/zombie_04.png", "ZombieWalking/zombie_05.png", "ZombieWalking/zombie_06.png",
   "ZombieWalking/zombie_07.png", "ZombieWalking/zombie_08.png", "ZombieWalking/zombie_09.png", "ZombieWalking/zombie_10.png"
   , "ZombieWalking/zombie_11.png", "ZombieWalking/zombie_12.png", "ZombieWalking/zombie_13.png", 
   "ZombieWalking/zombie_14.png", "ZombieWalking/zombie_15.png", "ZombieWalking/zombie_16.png", "ZombieWalking/zombie_17.png"
   , "ZombieWalking/zombie_18.png", "ZombieWalking/zombie_19.png", "ZombieWalking/zombie_20.png", 
   "ZombieWalking/zombie_21.png", "ZombieWalking/zombie_22.png", "ZombieWalking/zombie_23.png", )

   zombieRunRight = loadAnimation("ZombieWalkingL/zombieWL00.png", "ZombieWalkingL/zombieWL01.png", "ZombieWalkingL/zombieWL02.png", 
   "ZombieWalkingL/zombieWL03.png", "ZombieWalkingL/zombieWL04.png", "ZombieWalkingL/zombieWL05.png", "ZombieWalkingL/zombieWL06.png",
    "ZombieWalkingL/zombieWL07.png", "ZombieWalkingL/zombieWL08.png", "ZombieWalkingL/zombieWL09.png", "ZombieWalkingL/zombieWL10.png"
    , "ZombieWalkingL/zombieWL11.png", "ZombieWalkingL/zombieWL12.png", "ZombieWalkingL/zombieWL13.png", 
    "ZombieWalkingL/zombieWL14.png", "ZombieWalkingL/zombieWL15.png", "ZombieWalkingL/zombieWL16.png", "ZombieWalkingL/zombieWL17.png"
    , "ZombieWalkingL/zombieWL18.png", "ZombieWalkingL/zombieWL19.png", "ZombieWalkingL/zombieWL20.png", 
    "ZombieWalkingL/zombieWL21.png", "ZombieWalkingL/zombieWL22.png", "ZombieWalkingL/zombieWL23.png", )

      bulletSound = loadSound("shot.mp3");
      //     https://soundbible.com/search.php?q=zombie

  backgroundImg = loadImage("background.jpeg");
}

function setup(){
  
createCanvas(windowWidth, windowHeight);
MCharacter = createSprite(width/2, 600, 15, 30);
MCharacter.addAnimation("runningR", runningRight);
MCharacter.addAnimation("runningL", runningLeft);
MCharacter.addAnimation("standingL",standingLeft)
MCharacter.addAnimation("standingR",standingRight)
MCharacter.scale = 0.75
//  MCharacter.debug = true;
MCharacter.setCollider("rectangle", 0, 0, 100, 200);

zombieLeftGroup = new Group();
zombieRightGroup = new Group();
bulletGroup = new Group();


}

function draw() {

  background(backgroundImg);
  frameRate(100)

if (gameState === "PLAY"){

  drawSprites();

  fill("purple")
  textSize(30);
  text("Score: " + score, width-130, 50);
  text("Bullet Count: " + bulletCount, 30, 50);
  textAlign(CENTER)
  text("Player Life: " + playerLife, width/2, 50)


  playerControl();

  spawnZombieLeft();

  spawnZombieRight();



        
  if (bulletCount === 0 || playerLife === 0){
        gameState = "END";
  }

  console.log(MCharacter.y);

  if(MCharacter.y<465){
        MCharacter.y = 465;
  }

  if(MCharacter.y>700){
      MCharacter.y = 700;
}

  if(MCharacter.x>width-50){
        MCharacter.x = width-50;
  }

  if(MCharacter.x<50){
        MCharacter.x = 50;
  }

 for(var g = 0; g<ZombieArray.length; g++){
       if (ZombieArray[g].isTouching(MCharacter)){
                  playerLife -= 1;
                  ZombieArray[g].destroy();
            }
        
  }


if (score === 30){
      gameState = "WIN"
}
       
 

  for(var i = 0; i<ZombieArray.length; i++){
        for (var x = 0; x<bulletArray.length; x++){
              if (bulletArray[x].isTouching(ZombieArray[i])){
                  bulletArray[x].destroy();
                  ZombieArray[i].destroy();
                  score += 1;
                  // zombieCount -= 1;
              }
        }
  }

  }

  if (gameState === "END"){
        textSize(50);
        textAlign(CENTER);
        fill("purple")
        text("Game over. Better luck next time!", width/2, 50);

  }

  if (gameState === "WIN"){
      textSize(50);
      textAlign(CENTER);
      fill("purple")
      text("Congrats! You Won!", width/2, 50);

}

if (gameState === "INSTRUCTIONS"){
      background("white");

      textSize(30);
      textAlign(CENTER);
      fill("purple");
      text("Shoot the zombies! \n\n Click space to shoot. \n\n Use arrow keys to move. \n\n Don't touch the zombies. \n\n Use the bullets wisely.\n\n Click anywhere to start. \n\n\n Good Luck!", width/2, height/2-250);
}

}

function playerControl(){
        if (keyIsDown(RIGHT_ARROW)){
        MCharacter.x += 3;
        }

        if (keyIsDown(LEFT_ARROW)){
        MCharacter.x -= 3;
        }
        if (keyIsDown(UP_ARROW)){
        MCharacter.y -= 3;
        }

        if (keyIsDown(DOWN_ARROW)){
        MCharacter.y += 3;
        }
  }

  function keyPressed(){
        if(keyCode===37){
                MCharacter.changeAnimation("runningL",runningLeft);
                dir = 1;
        }
        if(keyCode===39){
                MCharacter.changeAnimation("runningR",runningRight);
                dir = 2;
        }
  }
    
  function mouseClicked() {
      if (gameState === "INSTRUCTIONS"){
            gameState = "PLAY";
      }
  }

  
  function keyReleased(){
        if(keyCode===37){
                MCharacter.changeAnimation('standingL');
        }
        if(keyCode===39){
                MCharacter.changeAnimation('standingR');
        }
        if(keyCode===32){
            bulletCount -= 1;
            bulletSound.play()
            if(dir === 1){
                  shootBullet("left")
            }
          
            if(dir === 2){
                  shootBullet("right")
            }
        }
  }

  function spawnZombieLeft(){
          if (frameCount%(Math.round(random(200, 240))) == 0){
                zombieLeft = createSprite(width+100, Math.round(random(465, height-100)));   
                zombieLeft.addAnimation("zombieRL", zombieRunLeft);
            //     zombieLeft.velocityX = -2
                zombieLeft.velocityX = -(2+(score/8))
                zombieLeft.scale = 0.75;
                zombieLeftGroup.add(zombieLeft);
                ZombieArray.push(zombieLeft);
                zombieLeft.lifetime = 600; 
                // zombieLeft.debug = true;
                zombieLeft.setCollider("rectangle", 0, 0, 100, 300)
          }
  }

  function spawnZombieRight(){
      if (frameCount%200 == 0){
            zombieRight = createSprite(-100, Math.round(random(465, height-100)));   
            zombieRight.addAnimation("zombieRR", zombieRunRight);
            // zombieRight.velocityX = 2
            zombieRight.velocityX = 2+(score/8)
            zombieRight.scale = 0.75;
            zombieRightGroup.add(zombieRight);
            ZombieArray.push(zombieRight);
            zombieRight.lifetime = 600; 
            // zombieRight.debug = true;
            zombieRight.setCollider("rectangle", 0, 0, 100, 300)
      }
}

  function shootBullet(direction){
        bullet = createSprite(MCharacter.x+100, MCharacter.y+50, 10, 5);

        if (direction === "right"){
            bullet.velocityX = 9;
        }
        else if (direction === "left"){
              bullet.velocityX = -9;
        }

        bulletGroup.add(bullet);
        MCharacter.depth = bullet.depth;
        MCharacter.depth+=1;
        bulletArray.push(bullet);
        bullet.lifetime = 600; 
  }
    
