/*--- Create UI Elements -------*/
/*------------------------------*/

//Create the game board
var board = document.createElement('canvas');
document.body.appendChild(board);
board.width = 360;
board.height = 360;
board.style.border = '1px solid black';
board.addEventListener('click', function () {
    if (!gameIsRunning) startGame();
});

//Grab the context for drawing stuff
var ctx = board.getContext('2d');

//Show play game dialogue
ctx.font = '12px Arial';
ctx.fillText('Click or Enter to play.', board.width / 2 - 60, board.height / 2);

/*--- Create Game Objects ------*/
/*------------------------------*/

//Snake
var snake = {};
snake.head = {};
snake.body;

//Food
var food = {};
food.newCell = function () {
    do {
        food.x = randomCell(0, board.width - cellSize);
        food.y = randomCell(0, board.height - cellSize);
        var headCollision = snake.head.x == food.x && snake.head.y == food.y;
        var snakeCollision = false;
        for (var i = 0; i < snake.length; i++) {
            if (food.x == snake.body[i][0] && food.y == snake.body[i][1]) {
                snakeCollision = true;
                break;
            }
        }
    } while (snakeCollision || headCollision);
};
function randomCell(min, max) {
    return (
        Math.floor(Math.random() * (max / cellSize - min + 1) - min) * cellSize
    );
}

//Keyboard controls
var controler = {};
addEventListener(
    'keydown',
    function (e) {
        if (e.keyCode == 38 && snake.head.yDir != 1) {
            //Up
            controler.direction = 'up';
        }
        if (e.keyCode == 40 && snake.head.yDir != -1) {
            // Down
            controler.direction = 'down';
        }
        if (e.keyCode == 37 && snake.head.xDir != 1) {
            //Left
            controler.direction = 'left';
        }
        if (e.keyCode == 39 && snake.head.xDir != -1) {
            //Right
            controler.direction = 'right';
        }
        if (e.keyCode == 13 && !gameIsRunning) {
            //return key
            startGame();
        }
    },
    false
);

/*--- Game values and state  ---*/
/*------------------------------*/

var frameNo;
var gameIsRunning;
var showGameOver = false;

var cellSize = 30;

function startGame() {
    setGameValues();
    //calling this runs the game
    frame();
}

function endGame() {
    gameIsRunning = false;
    showGameOver = true;
}

function setGameValues() {
    frameNo = 0;
    gameIsRunning = true;

    //snake values
    snake.speed = 6;
    snake.length = 5;
    snake.head.xDir = 0;
    snake.head.yDir = -1;
    snake.head.x = board.width / 2;
    snake.head.y = board.width / 2;
    //refresh snake body
    snake.body = new Array();
    for (var i = 0; i < snake.length; i++) {
        snake.body[i] = [snake.head.x, snake.head.y + i * cellSize];
    }

    //set food
    food.newCell();

    //set controler
    controler.direction = 'up';

    //hide dialogues
    showPlayGame = false;
    showGameOver = false;
}

/*---------- Game Logic --------*/
/*------------------------------*/

function draw() {
    // Draw bg
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, board.width, board.height);
    // Draw food
    ctx.fillStyle = '#999966';
    ctx.fillRect(food.x, food.y, cellSize, cellSize);
    // Draw snake head
    ctx.fillStyle = '#00cc00';
    ctx.fillRect(snake.head.x, snake.head.y, cellSize, cellSize);
    ctx.fillStyle = '#00e600';
    // Draw snake body
    for (var i = 0; i < snake.length; i++) {
        ctx.fillRect(snake.body[i][0], snake.body[i][1], cellSize, cellSize);
    }
    // Draw score
    ctx.font = '11px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(snake.length, 13, board.height - 10);
    // Draw game over if it is over
    if (showGameOver) {
        ctx.font = '12px Arial';
        ctx.fillText('Game Over!', board.width / 2 - 30, board.height / 2 - 10);
    }
}

function update() {
    // Move the snake only every few frames
    // This determine how fast the game feels
    if (frameNo % snake.speed == 0) {
        // Update snake direction
        if (controler.direction == 'up') {
            snake.head.xDir = 0;
            snake.head.yDir = -1;
        } else if (controler.direction == 'down') {
            snake.head.xDir = 0;
            snake.head.yDir = 1;
        } else if (controler.direction == 'left') {
            snake.head.xDir = -1;
            snake.head.yDir = 0;
        } else if (controler.direction == 'right') {
            snake.head.xDir = 1;
            snake.head.yDir = 0;
        }
        // Remember these for later
        var oldX = snake.head.x;
        var oldY = snake.head.y;
        // Move snake
        snake.head.x += cellSize * snake.head.xDir;
        snake.head.y += cellSize * snake.head.yDir;
        // X wrap
        if (snake.head.x > board.width - cellSize) {
            snake.head.x = 0;
        } else if (snake.head.x < 0) {
            snake.head.x = board.width - cellSize;
        }
        // Y wrap
        if (snake.head.y > board.height - cellSize) {
            snake.head.y = 0;
        } else if (snake.head.y < 0) {
            snake.head.y = board.height - cellSize;
        }
        // Move body
        for (var i = 0; i < snake.length; i++) {
            var tempX = snake.body[i][0];
            var tempY = snake.body[i][1];
            snake.body[i][0] = oldX;
            snake.body[i][1] = oldY;
            oldX = tempX;
            oldY = tempY;
        }
        // When snake eats food
        if (snake.head.x == food.x && snake.head.y == food.y) {
            food.newCell();
            snake.body.push([oldX, oldY]);
            snake.length++;
        }
    }
    // Check that snake hasn't crashed into itself
    for (var i = 0; i < snake.length; i++) {
        if (
            snake.body[i][0] == snake.head.x &&
            snake.body[i][1] == snake.head.y
        ) {
            endGame();
        }
    }
}

// Game loop
function frame() {
    update();
    draw();
    frameNo++;
    if (gameIsRunning) {
        requestAnimationFrame(frame);
    }
}
