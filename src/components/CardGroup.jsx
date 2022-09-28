import React from "react";
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CardGroup.css';

function AppCardGroup({items}) {
  return (
    <div className="d-flex justify-content-center">
        {items.map((item) => (
            <Card className="pt-3 m-4 w-25 card-bg-image">
                {item.icon && <FontAwesomeIcon className="fa-6x" color="#921fcc" opacity="0.8" icon={item.icon} />}
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.text}</Card.Text>
                </Card.Body>
                {item.smallText && <Card.Footer>
                    <small className="text-muted">{item.smallText}</small>
                </Card.Footer>}
            </Card>
        ))}
    </div>
  );
}

export default AppCardGroup;