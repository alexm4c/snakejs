'use strict';

class Board {
    constructor(height, width) {
        if (height == null && width == null) {
            throw new Error(`Board must have a have a height and width`);
        }

        if (height < 0 || width < 0) {
            throw new Error(
                `Invalid board dimension (${height}, ${width})`
            );
        }

        this.height = height;
        this.width = width;
    }

    validPosition(x, y) {
        return x <= this.width && x >= 0 && y <= this.height && y >= 0;
    }
}

module.exports = Board;
