import React, { useCallback } from "react";
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CardGroup.css';
import ConditionalList from "../ConditionalList";

function CardGroup({ cards }) {

  const cardCallback = useCallback(({icon, text, title}, index) => (
    <Card className="pt-3 m-4 w-25 card-bg-image" key={index} >
        {icon && <FontAwesomeIcon className="fa-6x" icon={icon} />}
        <Card.Body>
          <Card.Title> {title} </Card.Title>
          <Card.Text className="fw-light"> {text} </Card.Text>
        </Card.Body>
    </Card>
  ), []);
  
  return (
    <div className="container d-flex flex-wrap justify-content-center text-white">
      <ConditionalList itemCallback={cardCallback} list={cards} />
    </div>
  );
}

export default CardGroup;