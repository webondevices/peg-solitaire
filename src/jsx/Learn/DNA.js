import util from './util.js';
import Board from './../Solitaire/Board.jsx';

class DNA {
    constructor(){

        // The genetic sequence
        this.game = new Board();
        this.genes = this.game.getRandomGame();
        this.fitness = 0;
    }

    // Converts character array to a String
    getPhrase() {
        return this.genes.join('');
    }

    // Fitness function (returns floating point % of "correct" characters)
    calcFitness(target) {
        this.fitness = (33 - this.game.getScore()) / 32;
    }

    // Cross DNA with partner to produce child
    crossover(partner) {
        
        // Initialise new child
        const child = new DNA(this.genes.length);
        const midpoint = util.randomInt(0, this.genes.length - 1);

        // Cross DNA from two parents from each side of midpoint
        this.genes.forEach((gene, i) => {

            if (i > midpoint) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        });
        
        return child;
    }

    // picks a new random character based on a mutation probability
    mutate(mutationRate) {
        this.genes.forEach((gene, i) => {

            if (Math.random(0, 1) < mutationRate) {
                this.genes[i] = util.newChar();
            }
        });
    }
}

export default DNA;