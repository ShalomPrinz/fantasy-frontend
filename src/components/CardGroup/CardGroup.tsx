import Card from "react-bootstrap/Card";

import { ConditionalList, IconComponent } from "../";
import type { Icon } from "../../res";

import "./CardGroup.css";

export interface CardGroupItem {
  id: number;
  icon: Icon;
  title: string;
  text: string;
}

interface CardGroupProps {
  cards: CardGroupItem[];
}

function CardGroup({ cards }: CardGroupProps) {
  const cardCallback = ({ icon, text, title }: CardGroupItem) => (
    <Card className="pt-3 m-4 w-25 card-bg-image">
      {icon && <IconComponent icon={icon} size="6" />}
      <Card.Body>
        <Card.Title> {title} </Card.Title>
        <Card.Text className="fw-light"> {text} </Card.Text>
      </Card.Body>
    </Card>
  );

  return (
    <div className="container d-flex flex-wrap justify-content-center text-white">
      <ConditionalList itemCallback={cardCallback} list={cards} />
    </div>
  );
}

export default CardGroup;
