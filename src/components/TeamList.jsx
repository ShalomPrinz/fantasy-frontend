import React, { useCallback } from 'react';

import { slice } from 'lodash';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ConditionalList from './ConditionalList';
import PlayerJersey from './PlayerJersey';

const TeamList = ({ team }) => {

    const playerCallback = useCallback(({name, team}) => (
        <div className="d-flex align-items-center ps-5">
            <PlayerJersey team={team} width="60px" />
            <h4 className="text-truncate ps-2 my-0"> {name} </h4>
        </div>
    ), []);

    const roleCallback = useCallback(({ label, players }) => (
        <Col className="w-50">
            <h1 className="centered-flex pt-4"> {label} </h1>
            <ConditionalList itemCallback={playerCallback} list={players} />
        </Col>
    ), [playerCallback]);

    return (
        <Container>
            <Row>
                <ConditionalList itemCallback={roleCallback} list={slice(team, 0, 2)} />
            </Row>
            <Row>
                <ConditionalList itemCallback={roleCallback} list={slice(team, 2, 4)} />
            </Row>
        </Container>
    )
}

export default TeamList;