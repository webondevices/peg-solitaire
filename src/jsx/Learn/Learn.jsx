import React from 'react';
import Population from './Population.js';
import Board from './../Solitaire/Board.jsx';
import Table from './../Solitaire/Table.jsx';

class World extends React.Component {

    constructor() {
        super();

        this.state = {
            result: '',
            running: true,
            board: null
        };

        // Simulation settings
        this.targetScore = 1;
        this.mutationRate = 0.01;
        this.populationSize = 100;

        this.running = true;

        // Initialise population
        this.population = new Population(this.targetScore, this.mutationRate, this.populationSize, this.updateBoard);

        this.draw = this.draw.bind(this);
    }

    componentDidMount(){

        // Start simulation
        this.draw();
    }

    draw() {

        // Generate weighed mating pool with the fittest members
        this.population.naturalSelection();

        // Generate new population of children from parents in the mating pool
        this.population.generate();

        // Calculate fitness score of the new population
        this.population.calcPopulationFitness();

        // Find the fittest member of the population and see if target is reached
        this.population.evaluate();

        // If target phrase is found, stop
        if (this.population.isFinished()) this.running = false;

        // Display best result so far
        this.setState({result: this.population.getBest()});

        // Loop and start new generation
        if (this.running) window.requestAnimationFrame(this.draw);
    }

    updateBoard (board) {
        this.setState({board});
    }

    render() {
        const myStyle = this.running ? {backgroundColor: 'red'} : {backgroundColor: 'green'};

        return (
            <div style={myStyle} className="result">
                { this.state.result }
                {this.state.board !== null ?
                    <Table
                        running={this.state.running}
                        board={this.currentBoard}
                        selectedPeg={{x: false, y: false}}
                        selectPeg={() => {}} /> : ''
                }
            </div>
        );
    }
}

export default World;