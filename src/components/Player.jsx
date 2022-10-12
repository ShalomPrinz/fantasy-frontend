import React from 'react';

import PlayerJersey from './PlayerJersey';

const Player = ({ name, team, width, textWidth }) => {
    
    if (!name | !team) {
        console.error("Wrong Player Data")
        return <div> No Player Selected </div>;
    }
    
    return (
        <div className="text-center" style={{width: textWidth}} >
            <PlayerJersey team={team} width={width} />
            <div className="text-truncate bg-default rounded p-1 w-100">{name}</div>
        </div>
    )
}

export default Player;