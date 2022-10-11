import React from 'react';

import PlayerJersey from './PlayerJersey';

let key = 0;

const TeamList = ({ team }) => {

    return (
        <>
            {Object.entries(team).map(([role, players]) => (
                <ul key={key++}>
                    <h1>{role}</h1>
                    {players.map(p => (
                        <li className="d-flex align-items-center" key={key++}>
                            <PlayerJersey team={p.team} width="60px" />
                            <h4 className="text-truncate ps-2 my-0"> {p.name} </h4>
                        </li>
                    ))}
                </ul>
            ))}
        </>
    )
}

export default TeamList;