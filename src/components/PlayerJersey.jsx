import React from 'react';
import { Image } from 'react-bootstrap';

const PlayerJersey = ({ team, width }) => {
    const src = require(`../res/jersey/${team}.png`);
    return (
        <Image style={{ width: width }} src={src} title={team} />
    )
}

export default PlayerJersey;