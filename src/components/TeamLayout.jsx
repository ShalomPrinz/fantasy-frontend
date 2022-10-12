import React, { useCallback, useRef, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import { FIELD_IMAGE_DEFAULT_WIDTH, FIELD_LAYOUT_MIN_WIDTH } from '../constants'; 
import useWindowSize from '../hooks/useWindowSize';
import field from "../res/field.png";
import ConditionalList from './ConditionalList';
import Player from './Player';
import TeamList from './TeamList';

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

    const columnCallback = (player) => (
        <Col className="mx-auto" key={key++}>
            <Player 
                {...player}
                width={imageWidth}
                textWidth={textWidth}
            />
        </Col>
    );

    const rowCallback = (role) => (
        <Row className={rowMargin} key={key++}>
            <ConditionalList itemCallback={columnCallback} list={role} />
        </Row>
    );

    return (
        <div className="position-relative" ref={fieldRef}>
            <Image className="w-100" src={field} alt="Team Field Background" rounded />
            <Container className="position-absolute p-5 top-0 centered-flex flex-column h-100 overflow-hidden" >
                <ConditionalList itemCallback={rowCallback} list={Object.values(team)} />
            </Container>
        </div>       
    )
}

export default TeamLayout;