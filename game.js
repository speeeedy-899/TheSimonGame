
// Button colors
var buttonColors = ["red", "blue", "green", "yellow"];

// New Game Pattern
var gamePattern = [];

// Pattern clicked by the user
var userClickedPattern = [];

var gameStarted = false;
// Detectng first key press to start the game
  $(document).keydown(function(){
    if(gameStarted===false){
      nextSequence();
      gameStarted = true;
    }
  })

// Levels
var level = 0;

// Random generated new sequence
function nextSequence(){

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  level++;
  $("h1").text("Level " + level);

  // Animation
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // Playing the desired sound
  playSound(randomChosenColor);

}


// Animation function
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// Sound playing function
function playSound(name){
  var audio = new Audio ("sounds/"+name+".mp3");
  audio.play();

}

// Saving attribute of the button clicked and storing it in the user pattern array
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  // Calling the sound playing function
  playSound(userChosenColor);

  // Call the animate function you dumb fuck
  animatePress(userChosenColor);

  // Calling check function
  checkAsnwer(userClickedPattern.length-1);
})



// Comparing user input with the game pattern
function checkAsnwer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    // User pattern matches the game pattern
    console.log("success");
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }

  }
  else{
    // User pattern does not match the game pattern
    console.log("wrong");
    var wrong = new Audio ("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, press any key to restart.")

    startOver();
  }

}


// Re-start game

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
