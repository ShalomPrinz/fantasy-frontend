import React, { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import field from "../res/field.png";
import Player from './Player';

import useWindowSize from '../hooks/useWindowSize';

let key = 0;

const TeamLayout = ({ team }) => {

    const fieldRef = useRef(null);
    const [width, setWidth] = useState(500);
    useWindowSize(() => setWidth(fieldRef?.current?.clientWidth || width));
    
    const imageWidth = width / 8;
    const showImage = imageWidth > 70;
    const rowMargin = showImage ? "my-1" : "my-3";
    
    return (
        <div className="position-relative" ref={fieldRef}>
            <Image className="w-100" src={field} alt="Team Field Background" rounded />
            <Container className="position-absolute p-5 top-0 centered-flex flex-column h-100 overflow-hidden" >
                {Object.values(team).map((role) => (
                    <Row className={rowMargin} key={key++}>
                        {role.map((player) => (
                            <Col className="mx-2" key={key++}>
                                <Player 
                                    {...player}
                                    width={`${imageWidth}px`}
                                    showImage={showImage}
                                />
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
        </div>       
    )
}

export default TeamLayout;