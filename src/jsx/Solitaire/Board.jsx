import React from 'react';

class Board {
    constructor () {
        this.board = [
            [null,null,true,true,true,null,null],
            [null,null,true,true,true,null,null],
            [true,true,true,true,true,true,true],
            [true,true,true,false,true,true,true],
            [true,true,true,true,true,true,true],
            [null,null,true,true,true,null,null],
            [null,null,true,true,true,null,null]
        ];
    }

    stepPossible (x, y) {
        const b = this.board;
        if (b[y][x] !== null) {
            const stepUpPossible = y-2 >= 0 ? b[y][x] && b[y-1][x] && b[y-2][x] === false : false;
            const stepRightPossible = x+2 < b[y].length ? b[y][x] && b[y][x+1] && b[y][x+2] === false : false;
            const stepDownPossible = y+2 < b.length ? b[y][x] && b[y+1][x] && b[y+2][x] === false : false;
            const stepLeftPossible = x-2 >= 0 ? b[y][x] && b[y][x-1] && b[y][x-2] === false : false;

            return stepUpPossible || stepRightPossible || stepDownPossible || stepLeftPossible;    
        } else {
            return false;
        }   
    }

    getScore () {
        return this.board.map(row => row.filter(peg => peg).length).reduce((a, b) => a + b, 0);
    }

    moveLeftOnTable () {
        return this.board.some((row, y) => row.some((peg, x) => this.stepPossible(x, y)));
    }

    setPeg (x, y, value) {
        this.board[x][y] = value;
    }
}

export default Board;