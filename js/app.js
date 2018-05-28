class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Enemy extends Character {
    constructor(x,y) {
        super(x, y);
        this.sprite = 'images/enemy-bug.png';
        this.initialLocation = (this.x, this.y);
        this.speed = Math.floor((Math.random() * 50) + 100);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    constructor(x,y) {
        super(x, y);
        this.sprite = 'images/char-boy.png';
        this.initialLocation = (this.x, this.y);
        this.speed = Math.floor((Math.random() * 100) + 100);
    }
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.x += this.speed * dt;
    
    //Once enemy reaches the end of canvas, it will restart from the other end
    if(this.x >= 500){
        this.x = -50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Updates the player position and keeps player inside canvas on reaching canvas boundary
Player.prototype.update = function() {
     //Gets back player to center, if it reaches right end of canvas
     if(this.x >= 410){
        this.x = 200;
    }

    //Gets back player to center, if it reaches left end of canvas
    if(this.x <= -10){
        this.x = 200;
        //470
    }

    //Gets back player to starting point, if it reaches bottom end of canvas
    if(this.y >= 440){
        this.y = 370;
    }

    //Gets back player to starting point, if it reaches top end of canvas
    if(this.y <= 0){
        this.y = 0;
        //400
    }
};

//Updates player move based on the key pressed
Player.prototype.handleInput = function(keyPressed) {
    switch (keyPressed) {
        case 'left':
            this.x -= 10;
            break;
        case 'up':
            this.y -= 10;
            break;
        case 'right':
            this.x += 10;
            break;
        case 'down':
            this.y += 10;
            break;
    }
};

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(0,230);
var enemy2 = new Enemy(200,145);
var enemy3 = new Enemy(0,60);

var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player(200,400,100);

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
