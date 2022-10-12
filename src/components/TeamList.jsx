import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PlayerJersey from './PlayerJersey';

const TeamList = ({ team }) => {

    const roles = Object.entries(team).map(([role, players], index) => (
        <Col className="w-50" key={index}>
            <h1 className="centered-flex pt-4">{role}</h1>
            {players.map((p, index) => (
                <div className="d-flex align-items-center ps-5" key={index}>
                    <PlayerJersey team={p.team} width="60px" />
                    <h4 className="text-truncate ps-2 my-0"> {p.name} </h4>
                </div>
            ))}
        </Col>
    ))

    return (
        <Container>
            <Row>
                {roles.splice(0, 2)}
            </Row>
            <Row>
                {roles}
            </Row>
        </Container>
    )
}

export default TeamList;