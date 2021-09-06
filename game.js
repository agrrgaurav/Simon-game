var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})

var level = 0;
var flag=true;
$(document).keydown(function(event){
     if(flag){
     nextSequence();
     flag=false;
   }
})


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  header = $("#"+currentColour);
  header.addClass("pressed");
  setTimeout(function() {
    header.removeClass('pressed');
}, 100);
}

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level  "+level);
}

function checkAnswer(currentLevel){
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if(gamePattern.length===userClickedPattern.length)
      {
        $("h1").text("wohooo!!! You cleared the currentLevel..");
        setTimeout(function () {
          nextSequence();
          userClickedPattern = [];
        }, 1000);
      }
   }
   else{
      audio = new Audio("wrong.mp3");
      audio.play();
      $("h1").text("Game Over");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
        $("h1").text("Press any Key to Start");
        restart();
      }, 1000);
   }
}

function restart(){
  level=0;
  flag=true;
  gamePattern = [];
  userClickedPattern = [];
}
