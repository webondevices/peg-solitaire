import React from 'react';

class Table extends React.Component {
    render () {
        return(
            <table className={`solitaire-board ${this.props.running ? 'running' : 'game-over'}`}>
                <tbody>
                {
                    this.props.board.map((row, y) => {
                        return (<tr key={y}>
                            {row.map((peg, x) => {
                                const selected = x == this.props.selectedPeg.x && y == this.props.selectedPeg.y;
                                const offBoard = peg === null;
                                return (
                                    <td key={x} className={peg === null ? 'field-off' : ''}>
                                        <div onClick={() => {if (this.props.running) this.props.selectPeg(peg, x, y)}} className={`${peg ? 'peg-on' : (offBoard ? 'peg-outside' : 'peg-off')} ${selected && peg ? 'peg-selected' : ''}`}></div>
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

export default Table;