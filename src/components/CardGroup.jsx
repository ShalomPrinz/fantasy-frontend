import React from "react";
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CardGroup.css';

let key = 0;

function AppCardGroup({items}) {
  return (
    <div className="container d-flex flex-wrap justify-content-center text-white">
        {items.map((item) => (
            <Card className="pt-3 m-4 w-25 card-bg-image" key={key++} >
                {item.icon && <FontAwesomeIcon className="fa-6x" icon={item.icon} />}
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text className="fw-light" >{item.text}</Card.Text>
                </Card.Body>
            </Card>
        ))}
    </div>
  );
}

export default AppCardGroup;