const assert = require('assert');
const Board = require('../src/Board');

describe('Board', function () {
    it('fail without dimensions', function () {
        assert.throws(() => {
            new Board();
        });
    });
    it('create with valid dimensions', function () {
        assert(new Board(10, 10));
        assert(new Board(0, 0));
    });
    it('fail with invalid dimensions', function () {
        assert.throws(() => {
            new Board(-1, -1);
        });
        assert.throws(() => {
            new Board(null, null);
        });
    });
    it('correctly validates in bounds position', function () {
        let board = new Board(10, 10);
        assert.ok(board.validPosition(0, 0));
        assert.ok(board.validPosition(10, 10));
        assert.ok(board.validPosition(0, 10));
        assert.ok(board.validPosition(10, 0));
    });
    it('correctly validates out of bounds position', function () {
        let board = new Board(10, 10);
        assert.ok(!board.validPosition(-1, -1));
        assert.ok(!board.validPosition(11, 11));
        assert.ok(!board.validPosition(-1, 11));
        assert.ok(!board.validPosition(11, -1));
    });
});
