var box,ball,paddle
var score=0
var lives=3
var gamestate = "serve";
var bg
var restart,restartImage
var gameOver,gameOverImage
var boxGroup
var edges

function preload(){
 gameOver=loadImage("gameOver.png")
 bg=loadImage("bg.png")
 restart=loadImage("restart.png")
 }

 function setup(){
     createCanvas(windowWidth,windowHeight)
  paddle=createSprite(width/2,height,150,40);
  paddle.shapeColor="black"
  ball=createSprite(width/2,height/2,30,30);
  ball.shapeColor="pink"

  boxGroup=new Group();
  edges=createEdgeSprites();
  }
     

  function draw(){
   background(bg)
  
  
  createBoxes(60,"red");
  createBoxes(60+30,"blue");
  createBoxes(60+60,"orange");
  createBoxes(60+90,"yellow");
  createBoxes(60+120,"purple");

 
  if(gamestate==="serve"){    
   
    ball.velocityX =0;
    ball.velocityY =0;
    ball.x = width/2;
    ball.y =height/2;
    fill("white");
    textSize(20);
    text("Score: "+score,40,25);
    text("Lives: "+lives, 40, 45);
   
    textSize(30);
    
    text("Click to serve the ball.", 650,windowHeight/2-30);
   }
   else if(gamestate =="end") {
    text("Game Over",700 ,windowHeight/2-30);
    ball.remove;
  }
  else {
    gameplay();
  }
 drawSprites()
   }
  

   function mousePressed()
{
  ball.velocityX = 10;
  ball.velocityY = 6;
  
  if(gamestate == "serve"){
    gamestate = "play";
    ball.velocityY = -7;
    ball.velocityX = -7;
  }
  
}

   function createBoxes(y,color){
     //initialize; condition ; increase/decrease
   for(var c=0;c<7;c++){ 
    box=createSprite(150+200*c,y,180,25);
    box.shapeColor=color
    boxGroup.add(box)
  }
    }
  
    function gameplay(){
      paddle.x=mouseX;
      paddle.collide(edges);

      ball.bounceOff(topEdge);
       ball.bounceOff(leftEdge);
       ball.bounceOff(rightEdge);
       
         ball.bounceOff(boxGroup, brickHit);
         if( !boxGroup[0]){ 
            ball.velocityX = 0;
             ball.velocityY = 0;
           text("Well Done!!",150,200);
           }
            if(ball.isTouching(bottomEdge)) { 
              lifeover();
             }
     }
     function brickHit(ball,box){
       box.remove();
       score+=5
      }
      function lifeover(){
        lives-=1
       if(lives>=1) {
        gamestate="serve";
      }
      else {
        gamestate="end";
      }
      }