import React from 'react';

import PlayerJersey from './PlayerJersey';

const Player = ({ name, team, width, widthUnits }) => (
    <>
        {width && widthUnits &&
            <div className="text-center" style={{ width: width * 1.4 + widthUnits }} >
                <PlayerJersey team={team} width={width} />
                    {name && 
                        <div className="text-truncate bg-default rounded p-1 w-100">{name}</div>
                    }
            </div>
        }
    </>
)

export default Player;