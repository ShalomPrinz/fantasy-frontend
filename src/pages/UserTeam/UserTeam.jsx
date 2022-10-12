import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import { PlayerJersey, Search, TabChoice, Table, TeamLayout, TeamList } from "../../components";
import "./UserTeam.css";

import { FIELD_LAYOUT_MIN_WIDTH } from '../../constants'; 
import useWindowSize from "../../hooks/useWindowSize";

const UserTeam = ({ user }) => {
  const { width } = useWindowSize()
  const [query, setQuery] = useState("");

  if (!user) {
      return <h1 className="text-center m-5 p-5 bg-danger text-white">Please Log In to view your team</h1>
  }

  if (!user.team) {
      user.team = {
          GK: [{name: "Ter Stegen", team: "Barcelona"}],
          DEF: [{name: "Pique", team: "Barcelona"}, {name: "Kounde", team: "Barcelona"}, {name: "Araujo", team: "Barcelona"}],
          MID: [{name: "Bellingham", team: "Dortmund"}],
          ATT: [{name: "Mokuku", team: "Dortmund"}]
      }
  }

  const players = Object.values(user.team).reduce((sum, current) => sum + current.length, 0)
  const selectedPlayersBackground = () => players === 11 ? "success" : "danger"

  const tabs = {
    "Field": {
        "Component": <TeamLayout team={user.team}/>,
        "OnClick": () => {
            if (width <= FIELD_LAYOUT_MIN_WIDTH)
                toast.warn('Your screen is too small')
        }
    },
    "List": {
        "Component": <TeamList team={user.team} />,
    }
  }

  const columns = [
    { 
        path: "team",
        content: (p) => <PlayerJersey team={p.team} width="60px" />
    },
    { 
        path: "name",
        content: (p) => (
            <>
                <div className="fs-4">{p.name}</div>
                <div className="text-muted">{p.team}, {p.role}</div>
            </>
        )
    },
    {
        content: () => (
            <div className="text-center">
                <FontAwesomeIcon className="fa-3x clickable text-primary" icon={faCirclePlus} />
            </div>
        )
    }
  ]

  const data = [
    {
        id: 0,
        name: "Pena",
        role: "GK",
        team: "Barcelona"
    },
    {
        id: 1,
        name: "Hummels",
        role: "DEF",
        team: "Dortmund"
    },
    {
        id: 2,
        name: "Pedri",
        role: "MID",
        team: "Barcelona"
    },
    {
        id: 3,
        name: "Dembele",
        role: "ATT",
        team: "Barcelona"
    },
    {
        id: 4,
        name: "Ansu Fati",
        role: "ATT",
        team: "Barcelona"
    },
    {
        id: 5,
        name: "Mokuku",
        role: "ATT",
        team: "Dortmund"
    }
  ]
  
  return (
    <main className="container p-4 my-4 rounded bg-team-form">
        <Row>
            <Col>
                <h2 className="fw-bold"> {user.name}'s Team </h2>
                Select a maximum of 3 players of a single team
            </Col>
        </Row>
        <Row>
            <Col className={`${width < FIELD_LAYOUT_MIN_WIDTH ? 'w-100' : 'pe-5'}`} sm="8">

                <div className="bg-white text-center shadow-below rounded my-3">
                    <h5 className="bg-default py-2 mx-3 rounded-bottom"> Gameweek 1 </h5>
                    <div className="centered-flex">
                        Gameweek 1 deadline: 
                        <div className="fw-bold ps-2"> Friday 20:30 </div>
                    </div>
                    <h2 className="py-3 centered-flex">
                        Players Selected:
                        <div className={`bg-light-${selectedPlayersBackground()} mx-3 p-2 rounded`}> {players} / 11 </div>
                    </h2>
                </div>

                <TabChoice tabs={tabs} defaultTab={tabs.Field} />
            </Col>
            <Col className="ps-1" >
                <Search onChange={(v) => setQuery(v)} value={query} />
                <Table style="bg-white" columns={columns} data={data} />
            </Col>
        </Row>
    </main>
  );
};

export default UserTeam;