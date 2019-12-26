import React from 'react';

const WinnerTable = (props) => {
const winners = props.winner.map((item, index) => <p key={index}>{index+1}. {item.state.name}</p>)
    return ( 
        <div className="winner-table">
            <h2>Ranking:</h2>
            {winners}
        </div>
     );
}
 
export default WinnerTable;
