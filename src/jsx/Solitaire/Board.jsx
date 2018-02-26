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

    stepUpPossible (x, y) {
        const b = this.board;
        return y-2 >= 0 ? b[y][x] === true && b[y-1][x] === true && b[y-2][x] === false : false;
    }

    stepRightPossible (x, y) {
        const b = this.board;
        return x+2 < b[y].length ? b[y][x] === true && b[y][x+1] === true && b[y][x+2] === false : false;
    }

    stepDownPossible (x, y) {
        const b = this.board;
        return y+2 < b.length ? b[y][x] === true && b[y+1][x] === true && b[y+2][x] === false : false;
    }

    stepLeftPossible (x, y) {
        const b = this.board;
        return x-2 >= 0 ? b[y][x] === true && b[y][x-1] === true && b[y][x-2] === false : false;
    }


    stepPossible (x, y) {
        if (this.board[y][x] !== null) {
            return this.stepUpPossible(x, y) || this.stepRightPossible(x, y) || this.stepDownPossible(x, y) || this.stepLeftPossible(x, y);
        } else {
            return false;
        }   
    }

    getRandomGame () {
        let gameDNA = [];
        
        do {
            let peg = [];
            let pegsLeft = [];
            this.board.forEach((row, y) => row.forEach((peg, x) => peg ? pegsLeft.push([x,y]) : null));
            pegsLeft = pegsLeft.filter(coord => coord !== null);


            for (;;) {
                let randomNum = Math.floor(Math.random() * pegsLeft.length);
                peg = pegsLeft[randomNum];

                if (this.stepPossible(peg[0], peg[1])) {
                    break;
                } else {
                    pegsLeft.splice(pegsLeft.findIndex(c => c[0] === peg[0] && c[1] === peg[1]), 1);
                    continue;
                }
            }

            let directions = ['Up', 'Right', 'Down', 'Left'];
            let randomDirection = '';

            for (;;) {
                randomDirection = directions[Math.floor(Math.random() * directions.length)];
                if (this[`step${randomDirection}Possible`](peg[0], peg[1])) {
                    break;
                } else {
                    directions.splice(directions.indexOf(randomDirection), 1);
                    continue;
                }
            }

            if (randomDirection === 'Up') {
                this.setPeg(peg[1]-2, peg[0], true);
                this.setPeg(peg[1]-1, peg[0], false);
                this.setPeg(peg[1], peg[0], false);
                gameDNA.push(`U${peg[0]}${peg[1]}`);
            }

            if (randomDirection === 'Right') {
                this.setPeg(peg[1], peg[0]+2, true);
                this.setPeg(peg[1], peg[0]+1, false);
                this.setPeg(peg[1], peg[0], false);
                gameDNA.push(`R${peg[0]}${peg[1]}`);
            }

            if (randomDirection === 'Down') {
                this.setPeg(peg[1]+2, peg[0], true);
                this.setPeg(peg[1]+1, peg[0], false);
                this.setPeg(peg[1], peg[0], false);
                gameDNA.push(`D${peg[0]}${peg[1]}`);
            }

            if (randomDirection === 'Left') {
                this.setPeg(peg[1], peg[0]-2, true);
                this.setPeg(peg[1], peg[0]-1, false);
                this.setPeg(peg[1], peg[0], false);
                gameDNA.push(`L${peg[0]}${peg[1]}`);
            }

        } while (this.moveLeftOnTable());

        return gameDNA;
    }

    getScore () {
        return this.board.map(row => row.filter(peg => peg).length).reduce((a, b) => a + b, 0);
    }

    moveLeftOnTable () {
        return this.board.some((row, y) => row.some((peg, x) => this.stepPossible(x, y)));
    }

    setPeg (x, y, value) {
        if (this.board[x][y] === undefined) {
            console.log('undef: ', x, y, value);
        }
        this.board[x][y] = value;
    }

    isStepUp (fromX, fromY, toX, toY) {
        return fromX === toX && fromY-2 === toY && this.board[fromY-1][fromX];
    }

    isStepRight (fromX, fromY, toX, toY) {
        return fromX+2 === toX && fromY === toY && this.board[fromY][fromX+1];
    }

    isStepDown (fromX, fromY, toX, toY) {
        return fromX === toX && fromY+2 === toY && this.board[fromY+1][fromX];
    }

    isStepLeft (fromX, fromY, toX, toY) {
        return fromX-2 === toX && fromY === toY && this.board[fromY][fromX-1];
    }
}

export default Board;