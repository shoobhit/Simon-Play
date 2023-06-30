//STep5 Creating a new empty array to store output of random choosen colors
var gamepattern = [];
//Step3 Creating a array of button colors
var buttonColour = ["red", "blue", "green", "yellow"]

//Step 11 Creating a new empty array to store the dat which we click
var userClickedPattern = [];

//Step 9 Crating a new function for button press
$(".btn").click(function() {
  //Step 10 STORING the id of the button which got clicked
  var userChoosenColor = $(this).attr("id");
  //Step 12 Strong the userchoosen color data in array call userclicked pattern
  userClickedPattern.push(userChoosenColor);
  //Step 16 PLaying a sound if user click on any buttonn
  playSound(userChoosenColor);
  //Step20 Calling a animate function
  animatePress(userChoosenColor);

  //Step 27 CHecking the user sequence and checkling user last sequnce
  checkAnswer(userClickedPattern.length - 1);
});



//Step 1 CReating a function
function nextSequence() {

  //Step30 Reseting user pattern on starting
  userClickedPattern = [];

  //Step 24 Increasing the level of game as function get called
  level++;

  //Sttep 25 Changing the header as we get ahead in our game
  $("title").text("Level " + level);

  //Step 2 Creating a random sequence
  var randomNumber = Math.floor(Math.random() * 4);
  //Step4 Now a selecting a color of buttonn through random calle
  var randomChoosenColour = buttonColour[randomNumber];
  //Step 6 Pushing this randomchoosen color dat in game patter array
  gamepattern.push(randomChoosenColour);

  //Step 7 bye using jquery we are selecting a button through
  $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //Step 8 For playing a audio in choosen colors

  //Step 15 calling the function of play sound here for making a sound on button so that same code run on both place
  playSound(randomChoosenColour);
  //Step 20 Calling animate function
  animatePress(randomChoosenColour);
}




//Step 13 Creating a new function for playing sounds
function playSound(name) {
  //Step 14 For playing audio sound
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();

}


// Step 17 Creating a new function for adding animation on prrssing a buttonn
function animatePress(currentColour) {
  // Step 18 aading class for animation on button properties
  $("#" + currentColour).addClass("pressed");
  // Step 19 Setting a  timeout for annimation
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}



//Keypress


var started = false;

//Step 22 Maintaining a variable count
var level = 0;
//Step 21 Creating a function of keypress
$(document).keypress(function() {

  //Step 23 Checking condition whether the function is strated or not and updating the head title as we increased our level
  if (!started) {
    $("#title").text("Level " + level);
    nextSequence();
    started = true;
  }

});




//Step 26 Creating a new function to check answer

function checkAnswer(currentLevel) {
  //Step- 27 Creating a if statement which check user and game current level
  if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    //Step 28 Checking user and game are on same level or not
    if (userClickedPattern.length === gamepattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#title").text("Game over, Press any key to Restart");

    startOver();
  }


}


function startOver() {

  level = 0;
  gamepattern = [];
  started = false;

}
