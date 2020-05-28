
var buttonColours = ["udi", "yuval", "tal", "daniel"];
var wrongSound = ["wrong", "wrong1", "wrong3"];
var successSound = ["success", "success1", "success2"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// $(document).keypress
$("#level-title").click(function() {
  if(!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

  console.log("success");

  if (userClickedPattern.length === gamePattern.length) {
    var randomSuccess = Math.floor(Math.random() * 3);
    var randomSuccessSound = successSound[randomSuccess];
    playSound(randomSuccessSound);
  setTimeout(function() {
    nextSequence()
  }, 1000);
}

} else {
    var randomWrong = Math.floor(Math.random() * 3);
    var randomWrongSound = wrongSound[randomWrong];
    playSound(randomWrongSound);

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key To Restart");
  startOver();
}
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

};

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}
