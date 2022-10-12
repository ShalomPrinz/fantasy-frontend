import React, { useCallback, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import field from "../res/field.png";
import Player from './Player';
import TeamList from './TeamList';

import useWindowSize from '../hooks/useWindowSize';
import { FIELD_IMAGE_DEFAULT_WIDTH, FIELD_LAYOUT_MIN_WIDTH } from '../constants'; 

let key = 0;

const TeamLayout = ({ team }) => {

    const fieldRef = useRef(null);
    const [width, setWidth] = useState(FIELD_IMAGE_DEFAULT_WIDTH);

    const windowSize = useWindowSize(
        useCallback( () => {
            new Promise(() => {
                let times = 1;
                const interval = setInterval(() => {
                    if (fieldRef?.current?.clientWidth || times++ === 10) {
                        clearInterval(interval);
                        setWidth(fieldRef?.current?.clientWidth || width)
                    }
                }, 1)
            })
        }, [width])
    );

    if (windowSize.width <= FIELD_LAYOUT_MIN_WIDTH) 
        return (<TeamList team={team} />);
    
    const textWidth = `${width / 8}px`;
    const imageWidth = `${width / 10}px`;
    const rowMargin = windowSize.width > 1500 ? "my-3" : "my-1";

    return (
        <div className="position-relative" ref={fieldRef}>
            <Image className="w-100" src={field} alt="Team Field Background" rounded />
            <Container className="position-absolute p-5 top-0 centered-flex flex-column h-100 overflow-hidden" >
                {Object.values(team).map((role) => (
                    <Row className={rowMargin} key={key++}>
                        {role.map((player) => (
                            <Col className="mx-auto" key={key++}>
                                <Player 
                                    {...player}
                                    width={imageWidth}
                                    textWidth={textWidth}
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