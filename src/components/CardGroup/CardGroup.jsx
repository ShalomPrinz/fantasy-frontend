import React, { useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";

import ConditionalList from "../ConditionalList";
import "./CardGroup.css";

function CardGroup({ cards }) {
  const cardCallback = useCallback(
    ({ icon, text, title }) => (
      <Card className="pt-3 m-4 w-25 card-bg-image">
        {icon && <FontAwesomeIcon className="fa-6x" icon={icon} />}
        <Card.Body>
          <Card.Title> {title} </Card.Title>
          <Card.Text className="fw-light"> {text} </Card.Text>
        </Card.Body>
      </Card>
    ),
    []
  );

  return (
    <div className="container d-flex flex-wrap justify-content-center text-white">
      <ConditionalList itemCallback={cardCallback} list={cards} />
    </div>
  );
}

export default CardGroup;
