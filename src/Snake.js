'use strict';

class Snake {
    constructor() {
        // Board defines the snakes boundaries.
        this.board = null;

        // Current vector direction of the snake head.
        this.direction = null;

        // Current board position of the snake head.
        this.position = null;

        // Body length of the snake
        this.length = 5;

        // Snake body positions
        this.body = [];
    }

    getBoard() {
        if (!this.board) {
            throw (new Error('Snake Failed: Board not initialised'));
        }
    }

    body() {
        for (let i = 0; i < this.length; i++) {
            this.body[i] = [this.position.x, this.position.y + i];
        }
    }

    up() {
        if (this.direction.name !== 'down') {
            this.direction = {
                name: 'up',
                x: 0,
                y: -1,
            };
        }
    }

    down() {
        if (this.direction.name !== 'up') {
            this.direction = {
                name: 'down',
                x: 0,
                y: 1,
            };
        }
    }

    left() {
        if (this.direction.name !== 'right') {
            this.direction = {
                name: 'left',
                x: -1,
                y: 0,
            };
        }
    }

    right() {
        if (this.direction.name !== 'left') {
            this.direction = {
                name: 'right',
                x: 1,
                y: 0,
            };
        }
    }

    move() {
        // Remember these for later
        let oldX = this.position.x;
        let oldY = this.position.y;

        // Move snake
        this.position.x += this.board.cellSize * this.direction.x;
        this.position.y += this.board.cellSize * this.direction.y;

        // X wrap
        if (this.position.x > this.board.width - this.board.cellSize) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = this.board.width - this.board.cellSize;
        }

        // Y wrap
        if (this.position.y > this.board.height - this.board.cellSize) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = this.board.height - this.board.cellSize;
        }

        // Move body
        for (let i = 0; i < this.length; i++) {
            let tempX = this.body[i][0];
            let tempY = this.body[i][1];
            this.body[i][0] = oldX;
            this.body[i][1] = oldY;
            oldX = tempX;
            oldY = tempY;
        }

        // // When snake eats food
        // if (this.position.x == food.x && this.position.y == food.y) {
        //     food.newCell();
        //     snake.body.push([oldX, oldY]);
        //     snake.length++;
        // }
    }

    check() {
        // Check that snake hasn't crashed into itself
        for (let i = 0; i < snake.length; i++) {
            if (
                snake.body[i][0] == snake.head.x &&
                snake.body[i][1] == snake.head.y
            ) {
                this.stop();
            }
        }
    }


}


module.exports = Snake;
