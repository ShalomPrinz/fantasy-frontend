import React from "react";

import { toast } from "react-toastify";

import { TabChoice, TeamLayout, TeamList } from "../../components";
import "./UserTeam.css";

import { FIELD_LAYOUT_MIN_WIDTH } from '../../constants'; 
import useWindowSize from "../../hooks/useWindowSize";

const UserTeam = ({ user }) => {
  const { width } = useWindowSize()

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
  
  return (
    <main className="container w-75 p-4 my-4 rounded bg-team-form">
        <h2 className="fw-bold"> {user.name}'s Team </h2>
        Select a maximum of 3 players of a single team

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
    </main>
  );
};

export default UserTeam;