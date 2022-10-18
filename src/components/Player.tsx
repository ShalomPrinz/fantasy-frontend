import { PlayerJersey } from './';

interface PlayerProps {
    name: string,
    team: string,
    width: number,
    widthUnits: string
}

const Player = ({ name, team, width, widthUnits }: PlayerProps) => (
    <div className="text-center" style={{ width: width * 1.4 + widthUnits }} >
        <PlayerJersey team={team} width={width + widthUnits} />
        <div className="text-truncate bg-default rounded p-1 w-100">{name}</div>
    </div>
)

export default Player;