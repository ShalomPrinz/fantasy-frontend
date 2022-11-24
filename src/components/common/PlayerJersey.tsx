import { Image } from "react-bootstrap";

import { getJersey } from "../../res";
import type { Jersey } from "../../res";

export interface PlayerJerseyProps {
  team: Jersey;
  width: string;
}

const PlayerJersey = ({ team, width }: PlayerJerseyProps) => (
  <Image style={{ width: width }} src={getJersey(team)} title={team} />
);

export default PlayerJersey;
