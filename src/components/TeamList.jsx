import React, { useCallback } from 'react';

import { slice } from 'lodash';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ConditionalList from './ConditionalList';
import PlayerJersey from './PlayerJersey';

const TeamList = ({ team }) => {

    const playerCallback = useCallback(({name, team}, index) => (
        <div className="d-flex align-items-center ps-5" key={index}>
            <PlayerJersey team={team} width="60px" />
            <h4 className="text-truncate ps-2 my-0"> {name} </h4>
        </div>
    ), []);

    const roleCallback = useCallback(([role, players], index) => (
        <Col className="w-50" key={index}>
            <h1 className="centered-flex pt-4"> {role} </h1>
            <ConditionalList itemCallback={playerCallback} list={players} />
        </Col>
    ), [playerCallback]);

    const roles = Object.entries(team);

    return (
        <Container>
            <Row>
                <ConditionalList itemCallback={roleCallback} list={slice(roles, 0, 2)} />
            </Row>
            <Row>
                <ConditionalList itemCallback={roleCallback} list={slice(roles, 2, 4)} />
            </Row>
        </Container>
    )
}

export default TeamList;