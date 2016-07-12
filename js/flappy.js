// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score;
score = 0;
var labelScore;

var player;


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {game.load.image("playerImg", "../assets/superman.png");
game.load.image("backgroundImg", "../assets/bluebackground.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipeBlock","../assets/pipe2-body.png");

}

function spaceHandler() {
    game.sound.play("score");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {game.stage.setBackgroundColor("#ffb3ff");
var background = game.add.image(0, 0, "backgroundImg");
background.width = 790;
background.height = 400;

game.add.text(260, 20, "Welcome to Flappy Man!", {font: "30px Ar Cena", fill: "#000099"});
player = game.add.sprite(10, 270, "playerImg") ;
labelScore = game.add.text(750, 360, "0") ;
player.scale.setTo(0.18, 0.18);

//game.add.sprite(20, 347, "playerImg");
game.input.onDown.add(clickHandler);
game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(spaceHandler);

game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
generatePipe();
game.physics.startSystem(Phaser.Physics.ARCADE);
game.physics.arcade.enable(player);

player.body.velocity.y = -200;
player.body.gravity.y = 235;

game.input.keyboard
    .addKey(Phaser.Keyboard.SPACEBAR)
    .onDown
    .add(playerJump);
    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(
        pipeInterval,
        generatePipe
    );

    game.time.events.loop(pipeInterval, changeScore);
}

function playerJump() {
    player.body.velocity.y = -150;
}

function moveRight() {
	player.x += 15;
}
function moveLeft() {
	player.x -= 15;
}
function moveUp() {
	player.y -= 15;
}
function moveDown() {
	player.y += 15;
}

function generatePipe() {
    // calculate a random position for the gap
    var gap = game.rnd.integerInRange(1 ,5);
    // generate the pipes, except where the gap should be
    for (var count=0; count<8; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(800, count*50);
        }
    }
    //changeScore();
}
var pipes = [];
function addPipeBlock(x, y) {
    // create a new pipe block
    var block = game.add.sprite(x,y,"pipeBlock");
    // insert it in the 'pipes' array
    pipes.push(block);
    game.physics.enable (block);
    block.body.velocity.x=-200;
}

function update() {
    game.physics.arcade.overlap(
        player,
		  pipes,
		  gameOver);
      if (player.y < 0 || player.y > 400){
        gameOver();

      }

}
function gameOver(){

if (score > 10){
registerScore(score);

}


    score = 0;
    game.state.restart();
}



function clickHandler(event) {
game.add.sprite(event.x-25, event.y-25, "playerImg");
}

function changeScore() {
      score = score + 1;
        labelScore.setText(score.toString());

}
