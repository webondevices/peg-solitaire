import React from 'react';
import Play from './Play/Play.jsx';
// import Learn from './Learn/Learn.jsx';

class Menu extends React.Component {
    constructor () {
        super();
        this.state = {
            selection: null
        };
    }
    render () {
        // Display menu if not selected anything
        if (this.state.selection === null) {
            return (
                <div className="game-menu">
                    <button onClick={() => this.setState({selection: 'play' })}>Play</button>
                    <button onClick={() => this.setState({selection: 'learn'})}>Learn</button>
                </div>
            );
        } else {
            if (this.state.selection === 'play')  return <Play />;
            if (this.state.selection === 'learn') return <Learn />;
        }
    }
}

export default Menu;