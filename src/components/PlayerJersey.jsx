import React from 'react';
import { Image } from 'react-bootstrap';

const PlayerJersey = ({ team, width }) => {
    if (typeof team !== 'string') team = 'Barcelona';
    const src = require(`../res/jersey/${team}.png`);
    return (
        <Image style={{ width: width }} src={src} title={team} />
    )
}

export default PlayerJersey;