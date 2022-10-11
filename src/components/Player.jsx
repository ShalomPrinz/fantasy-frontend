import React from 'react';
import Image from 'react-bootstrap/Image';

const Player = ({ name, team, width, showImage }) => {
    
    if (!name | !team) {
        console.error("Wrong Player Data")
        return <div> No Player Selected </div>;
    }

    const src = require(`../res/jersey/${team}.png`);
    
    return (
        <div style={{width: width}} >
            {showImage && <Image style={{width: width}} src={src} title={team} />}
            <div className="text-truncate text-center bg-default rounded p-1 w-100">{name}</div>
        </div>
    )
}

export default Player;