import { Image } from "react-bootstrap";

interface PlayerJerseyProps {
  team: string;
  width: string;
}

const PlayerJersey = ({ team, width }: PlayerJerseyProps) => (
  <Image
    style={{ width: width }}
    src={require(`../res/jersey/${team}.png`)}
    title={team}
  />
);

export default PlayerJersey;
