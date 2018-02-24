import React from 'react';

class Board extends React.Component {
    constructor () {
        super();
        this.state = {
            board: [
                [null,null,true,true,true,null,null],
                [null,null,true,true,true,null,null],
                [true,true,true,true,true,true,true],
                [true,true,true,false,true,true,true],
                [true,true,true,true,true,true,true],
                [null,null,true,true,true,null,null],
                [null,null,true,true,true,null,null],
            ],
            selectedPeg: {
                x: false,
                y: false
            },
            running: true,
            score: null
        }
    }
    
    getScore () {
        return this.state.board.map(row => row.filter(peg => peg).length).reduce((a, b) => a + b, 0);
    }

    componentDidMount () {
        this.setState({score: this.getScore()});
    }

    stepPossible (x, y) {
        const b = this.state.board;
        const stepUpPossible = y-2 >= 0 ? b[y-1][x] === true && b[y-2][x] === false : false;
        const stepRightPossible = x+2 < b[y].length ? b[y][x+1] === true && b[y][x+2] === false : false;
        const stepDownPossible = y+2 < b.length ? b[y+1][x] === true && b[y+2][x] === false : false;
        const stepLeftPossible = b[y][x-1] === true && b[y][x-2] === false;

        return stepUpPossible || stepRightPossible || stepDownPossible || stepLeftPossible;
    }

    isGameFinished () {
        const movePossible = this.state.board.some((row, y) => {
            row.some((peg, x) => this.stepPossible(x, y));
        });

        return movePossible;
    }

    selectPeg (peg, selected, x, y) {

        // If we clicked on a peg
        if (peg) {
            if (this.state.selectedPeg.x == x && this.state.selectedPeg.y == y) {
                this.setState({'selectedPeg': {x:false, y:false}});
            } else {
                this.setState({'selectedPeg': {x, y}});
            }
        }

        // If we clicked on an empty field
        if (!peg) {
            const board = this.state.board;
            const s = this.state.selectedPeg;

            const stepUp = (s.x === x && s.y - 2 === y);
            const stepRight = (s.x + 2 === x && s.y === y);
            const stepDown = (s.x === x && s.y + 2 === y);
            const stepLeft = (s.x - 2 === x && s.y === y);
            
            if (stepUp) {
                board[s.y - 2][s.x] = true;
                board[s.y - 1][s.x] = false;
                board[s.y][s.x] = false;
            }

            if (stepRight) {
                board[s.y][s.x + 2] = true;
                board[s.y][s.x + 1] = false;
                board[s.y][s.x] = false;
            }

            if (stepDown) {
                board[s.y + 2][s.x] = true;
                board[s.y + 1][s.x] = false;
                board[s.y][s.x] = false;
            }

            if (stepLeft) {
                board[s.y][s.x - 2] = true;
                board[s.y][s.x - 1] = false;
                board[s.y][s.x] = false;
            }

            this.setState({
                selectedPeg: {x:false, y:false},
                board,
                running: this.isGameFinished()
            });
        }
    }

    render () {
        return(
            <table className="solitaire-board">
                <tbody>
                {
                    this.state.board.map((row, y) => {
                        return (<tr key={y}>
                            {row.map((peg, x) => {
                                const selected = x == this.state.selectedPeg.x && y == this.state.selectedPeg.y;
                                const offBoard = peg === null;
                                return (
                                    <td key={x} className={peg === null ? 'field-off' : ''}>
                                        <div onClick={() => this.selectPeg(peg, selected, x, y)} className={`${peg ? 'peg-on' : (offBoard ? 'peg-outside' : 'peg-off')} ${selected && peg ? 'peg-selected' : ''}`}></div>
                                    </td>
                                );
                            })}
                        </tr>);
                    })
                }
                </tbody>
            </table>
        );
    }
}

export default Board;