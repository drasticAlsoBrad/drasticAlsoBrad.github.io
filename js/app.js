// Enemies our player must avoid
var Enemy = function() {
    // Assigns enemy object with a random lane using the randomX/YLane functions
    this.x = randomXLane();
    this.y = randomYLane();
    // Gives the enemy object a collision box to check for collisions
    this.width = 50;
    this.height = 50;
    // Assigns random speed to enemy Object.
    // Takes the starting X value and uses that to determine how the enemy should face.
    if (this.x < 100){
      this.speed = randomSpeed();
      this.sprite = 'images/enemy-bug.png';
    }
    else if (this.x > 100){
      this.speed = randomSpeed() * -1;
      this.sprite = 'images/enemy-bug-left.png';
    }
}

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //Update enemy location
    this.x += this.speed * dt;    
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// This function assigns a random X starting location on the left and right bounds of the canvas.
function randomXLane(){
  var lanesX = [-45, 450]
  var randLanesX = lanesX[Math.floor(Math.random() * lanesX.length)];
  return randLanesX;
};

// This function assigns a random Y locations based on the three brick lanes for enemy use.
function randomYLane(){
  var lanesY = [65, 148, 231]
  var randLanesY = lanesY[Math.floor(Math.random() * lanesY.length)];
  return randLanesY;
};

//This function assigns a random speed based on a preset array.
function randomSpeed(){
  var speed = [25, 50, 75, 100]
  var randSpeed = speed[Math.floor(Math.random() * speed.length)];
  return randSpeed;
}


// Player object
var Player = function(){
    this.sprite = 'images/char-boy.png';
    // Set player initial location
    this.x = 202.5;
    this.y = 405;
    // Gives the player object a collision box to check for collisions
    this.width = 50;
    this.height = 50;
}

// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
  // Player update function
  this.x * dt;
  this.y * dt;
}

// Player Render
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player reset method. Resets the level when player reaches the targeted location.
function reset(){
  player.x = 202.5;
  player.y = 405;
  allEnemies.length = 0;
};


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

// Collision detection
function checkCollisions(){
  allEnemies.forEach(function(enemy){
    if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x &&
    player.y < enemy.y + enemy.height && player.height + player.y > enemy.y) {
      console.log("collide!");
    reset();
      //lives = lives - 1;
    }
  });
};

// Place the player object in a variable called player
var player = new Player();

// Function that handles the direction and distance of movements while setting the map boundaries.
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
