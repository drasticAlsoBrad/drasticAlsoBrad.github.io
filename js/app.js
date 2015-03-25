// Global variables
var gameStatus = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //need to set starting location
    this.x = randomXLane();
    this.y = randomYLane();
    //need to set speed
    if (this.x < 100){
      this.speed = randomSpeed();
      this.sprite = 'images/enemy-bug.png';
    }
    else if (this.x > 100){
      this.speed = randomSpeed() * -1;
      this.sprite = 'images/enemy-bug-left.png';
    }
}

function randomXLane(){
  var lanesX = [-45, 450]
  var randLanesX = lanesX[Math.floor(Math.random() * lanesX.length)];
  return randLanesX;
};

function randomYLane(){
  var lanesY = [65, 148, 231]
  var randLanesY = lanesY[Math.floor(Math.random() * lanesY.length)];
  return randLanesY;
};

function randomSpeed(){
  var speed = [25, 50, 75, 100]
  var randSpeed = speed[Math.floor(Math.random() * speed.length)];
  return randSpeed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //Update enemy location
    this.x += this.speed * dt;    
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';

    // Set player initial location
    this.x = 202.5;
    this.y = 405;
}

// Player update function
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x * dt;
    this.y * dt;
}

// Player Render
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player handleInput. Recieves input from allowkeys to actually move the player.
// Must also check to make sure player cannot move off of screen. If x < 0 don't allow. if y > 606 don't allow.


// Player reset method. Resets teh level when player reaches the targeted location.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

//Function to create a new enemy and add it to the all enmies array
function createEnemy(){
  //Place new enemy in a variable called enemy 
  var enemy = new Enemy();
  //Add new enemy to array
  allEnemies.push(enemy);
};

// Set interval for enemies
setInterval(function (){createEnemy()}, 2000);

// Place the player object in a variable called player
var player = new Player();

Player.prototype.handleInput = function(key) {
    if ("up" === key) {
        if (this.y - 83 >= -10) {
            this.y -= 83;
            this.direction = 0;
        }
    } else if ("down" === key) {
        if (this.y + 83 <= 425) {
            this.y += 83;
            this.direction = 1;
        }
    } else if ("right" === key) {
        if (this.x + 101 <= 450) {
            this.x += 101;
        }
    } else if ("left" === key) 
        if (this.x - 101 >= 0){ 
            this.x -= 101;
        }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
