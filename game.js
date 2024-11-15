const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = []
let level = 0;
let started = false
function playSound (name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

//add class then remove when click
const animatedPress = currentColour => {
$('#' + currentColour).addClass('pressed');
setTimeout(function() {
    $('#' + currentColour).removeClass('pressed');
  }, 100)
}
//Make random number 0-3
function nextSequence () {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4);
    //console.log(randomNumber);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //flash the button
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //play sound
    playSound(randomChosenColour);
    level++;
   $('h1').text('Level ' + level );
};
//Check the answer
const checkAnswer = currentLevel => {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
              }, 1000);
        }
    } else {
        console.log('wrong');
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
          }, 200);
          $('h1').text('Game Over, Press Any Key to Restart');
          //startover
          startOver();
           
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
    
};

$('.btn').click(function(e){
    let userChosenColour = this.id;
    //console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatedPress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
//start game when press keybord key
$('body').keydown(function (){
    if (!started){
    $('h1').text('Level 0');
    nextSequence();
    started = true;
    }});


