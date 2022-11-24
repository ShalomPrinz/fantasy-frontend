import type { Jersey } from "../../res";
import PlayerJersey from "./PlayerJersey";

interface PlayerProps {
  name: string;
  team: Jersey;
  width: number;
  widthUnits: string;
}

const Player = ({ name, team, width, widthUnits }: PlayerProps) => (
  <div className="text-center" style={{ width: width * 1.4 + widthUnits }}>
    <PlayerJersey team={team} width={width + widthUnits} />
    <div className="text-truncate bg-default rounded p-1 w-100">{name}</div>
  </div>
);

export default Player;
