const assert = require('assert');
const Snake = require('../src/Snake');
const Board = require('../src/Board');

describe('Snake', function () {
    it('works', function () {
        let board = new Board(5, 5);
        let snake = new Snake(board, 5, 5);
        assert(snake);
    });
});
