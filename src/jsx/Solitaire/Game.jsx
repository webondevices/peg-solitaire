import React from 'react';
import Board from './Board.jsx';
import Table from './Table.jsx';

class Game extends React.Component {
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

    selectPeg (peg, x, y) {

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
            const s = this.state.selectedPeg;

            const isStepUp = this.game.isStepUp(s.x, s.y, x, y);
            const isStepRight = this.game.isStepRight(s.x, s.y, x, y);
            const isStepDown = this.game.isStepDown(s.x, s.y, x, y);
            const isStepLeft = this.game.isStepLeft(s.x, s.y, x, y);
            
            if (isStepUp) { 
                this.game.setPeg(s.y-2, s.x, true);
                this.game.setPeg(s.y-1, s.x, false);
                this.game.setPeg(s.y, s.x, false);
            }

            if (isStepRight) {
                this.game.setPeg(s.y, s.x+2, true);
                this.game.setPeg(s.y, s.x+1, false);
                this.game.setPeg(s.y, s.x, false);
            }

            if (isStepDown) {
                this.game.setPeg(s.y+2, s.x, true);
                this.game.setPeg(s.y+1, s.x, false);
                this.game.setPeg(s.y, s.x, false);
            }

            if (isStepLeft) {
                this.game.setPeg(s.y, s.x-2, true);
                this.game.setPeg(s.y, s.x-1, false);
                this.game.setPeg(s.y, s.x, false);
            }

            const gameFinished = !this.game.moveLeftOnTable();

            if (gameFinished) {
                clearInterval(this.gameTimer);
            }

            this.setState({
                selectedPeg: {x:false, y:false},
                running: !gameFinished,
                score: this.game.getScore(),
                steps: isStepUp || isStepRight || isStepDown || isStepLeft ? this.state.steps + 1 : this.state.steps
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
                <Table
                    running={this.state.running}
                    board={this.game.board}
                    selectedPeg={this.state.selectedPeg}
                    selectPeg={this.selectPeg.bind(this)}/>
            </div>
        );
    }
}

export default Game;