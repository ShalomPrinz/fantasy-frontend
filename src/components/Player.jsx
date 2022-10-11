import React from 'react';

import PlayerJersey from './PlayerJersey';

const Player = ({ name, team, width }) => {
    
    if (!name | !team) {
        console.error("Wrong Player Data")
        return <div> No Player Selected </div>;
    }
    
    return (
        <div style={{width: width}} >
            <PlayerJersey team={team} width={width} />
            <div className="text-truncate text-center bg-default rounded p-1 w-100">{name}</div>
        </div>
    )
}

export default Player;