// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
// Phaser parameters:
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions); var width = 790;
var height = 400;
var width = 790;
var gapMargin = 70;
var blockHeight = 50;
var pipeEndHeight = 12;
var pipeEndExtraWidth = 5
var gapSize = 110;
var score = 0;
var labelScore;
var player;

function preload() {game.load.image("playerImg", "../assets/superman.png");
game.load.image("backgroundImg", "../assets/bluebackground.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipeBlock","../assets/pipe2-body.png");
game.load.image("pipeEnd","../assets/pipe2-end.png");


}

function spaceHandler() {
    game.sound.play("score");
}

function create() {game.stage.setBackgroundColor("#ffb3ff");
var background = game.add.image(0, 0, "backgroundImg");
background.width = 790;
background.height = 400;

game.add.text(260, 20, "Welcome to Flappy Man!", {font: "30px Ar Cena", fill: "#000099"});
player = game.add.sprite(60, 270, "playerImg") ;
player.anchor.setTo(0.5, 0.5);
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
    var gameGravity = 200;
}

function playerJump() {
    player.body.velocity.y = -150;
    var jumpPower = 200;
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
    var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart - pipeEndHeight);
    for(var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
        addPipeBlock(width, y - blockHeight);
    }

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
    for(y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
        addPipeBlock(width, y);
    }

  //  changeScore();
}
var pipes = [];
function addPipeBlock(x, y) {
  var gameSpeed = 200;
    // create a new pipe block
    var block = game.add.sprite(x,y,"pipeBlock");
    // insert it in the 'pipes' array
    pipes.push(block);
    game.physics.enable (block);
    block.body.velocity.x=-200;
}

function addPipeEnd(x, y){

    var end = game.add.sprite(x,y,"pipeEnd");
    pipes.push(end);
    game.physics.enable (end);
    end.body.velocity.x=-200;

}



function update() {
    game.physics.arcade.overlap(
        player,
		  pipes,
		  gameOver);
      if (player.y < 0 || player.y > 400){
        gameOver();  }
        player.rotation = Math.atan(player.body.velocity.y / 200);
        var gameSpeed = 200;
}

function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
}

gapSize=100;
gapMargin=50;
blockHeight=50;

function gameOver(){
  gameGravity = 200;

if (score > 10){
  //registerScore is only available when score board is present
  //registerScore(score);

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
