import React from 'react';
import Board from './../Solitaire/Board.jsx';

class Play extends React.Component {
    constructor () {
        super();
        this.game = new Board();
        this.state = {
            selectedPeg: {
                x: false,
                y: false
            },
            running: true,
            score: null,
            steps: 0,
            time: 0
        }
        this.gameTimer = null;
    }

    componentDidMount () {
        this.setState({score: this.game.getScore()});
        this.gameTimer = setInterval(() => {
            this.setState({time: this.state.time + 1});
        }, 1000);
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
            const board = this.game.board;
            const s = this.state.selectedPeg;

            const stepUp = s.x === x && s.y-2 === y && board[s.y-1][s.x];
            const stepRight = s.x+2 === x && s.y === y && board[s.y][s.x+1];
            const stepDown = s.x === x && s.y+2 === y && board[s.y+1][s.x];
            const stepLeft = s.x-2 === x && s.y === y && board[s.y][s.x-1];
            
            if (stepUp) {
                this.game.setPeg([s.y-2], [s.x], true);
                this.game.setPeg([s.y-1], [s.x], false);
                this.game.setPeg([s.y], [s.x], false);
            }

            if (stepRight) {
                this.game.setPeg([s.y], [s.x+2], true);
                this.game.setPeg([s.y], [s.x+1], false);
                this.game.setPeg([s.y], [s.x], false);
            }

            if (stepDown) {
                this.game.setPeg([s.y+2], [s.x], true);
                this.game.setPeg([s.y+1], [s.x], false);
                this.game.setPeg([s.y], [s.x], false);
            }

            if (stepLeft) {
                this.game.setPeg([s.y], [s.x-2], true);
                this.game.setPeg([s.y], [s.x-1], false);
                this.game.setPeg([s.y], [s.x], false);
            }

            const gameFinished = !this.game.moveLeftOnTable();

            if (gameFinished) {
                clearInterval(this.gameTimer);
            }

            this.setState({
                selectedPeg: {x:false, y:false},
                board,
                running: !gameFinished,
                score: this.game.getScore(),
                steps: stepUp || stepRight || stepDown || stepLeft ? this.state.steps + 1 : this.state.steps
            });
        }
    }

    render () {
        return(
            <div>
                <div className="results-table">
                    <p>Pegs remaining: {this.state.score}</p>
                    <p>Steps taken: {this.state.steps}</p>
                    <p>Time: {this.state.time}</p>
                    <p>Game status: {this.state.running ? 'Running' : 'Game Over'}</p>
                </div>
                <table className={`solitaire-board ${this.state.running ? 'running' : 'game-over'}`}>
                    <tbody>
                    {
                        this.game.board.map((row, y) => {
                            return (<tr key={y}>
                                {row.map((peg, x) => {
                                    const selected = x == this.state.selectedPeg.x && y == this.state.selectedPeg.y;
                                    const offBoard = peg === null;
                                    return (
                                        <td key={x} className={peg === null ? 'field-off' : ''}>
                                            <div onClick={() => {if (this.state.running) this.selectPeg(peg, selected, x, y)}} className={`${peg ? 'peg-on' : (offBoard ? 'peg-outside' : 'peg-off')} ${selected && peg ? 'peg-selected' : ''}`}></div>
                                        </td>
                                    );
                                })}
                            </tr>);
                        })
                    }
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Play;