import React, { useCallback, useState } from 'react';

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

const TeamLayout = ({ team }) => {

    const [width, setWidth] = useState(FIELD_IMAGE_DEFAULT_WIDTH);

    const { width: windowWidth } = useWindowSize();

    const fieldRef = useCallback(node => {
        if (node !== null) {
            setWidth(node.getBoundingClientRect().width);
        }
    }, [windowWidth]);
  
    const rowMargin = `my-${width > 600 ? 3 : 1}`;

    const columnCallback = (player) => (
        <Col className="mx-auto">
            <Player 
                {...player}
                width={width / 10}
                widthUnits='px'
            />
        </Col>
    );

    const rowCallback = ({ players }) => (
        <Row className={rowMargin}>
            <ConditionalList itemCallback={columnCallback} list={players} />
        </Row>
    );

    return (
        <div className="position-relative" ref={fieldRef}>
            <Image className="w-100" src={field} alt="Team Field Background" rounded />
            <Container className="position-absolute p-5 top-0 centered-flex flex-column h-100 overflow-hidden" >
                <ConditionalList itemCallback={rowCallback} list={team} />
            </Container>
        </div>       
    )
}

const TeamLayoutWrapper = ({ team }) => {

    const { width } = useWindowSize();
    if (width <= FIELD_LAYOUT_MIN_WIDTH) 
        return (<TeamList team={team} />);

    return (
        <TeamLayout team={team} />   
    )
}

export default TeamLayoutWrapper;