import React from "react";

import TeamLayout from "./TeamLayout";
import "./UserTeam.css";

const UserTeam = ({ user }) => {

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
  
  return (
    <>
        <main className="container w-75 p-4 mt-4 rounded bg-team-form">
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
                    <div className="bg-light-danger mx-3 p-2 rounded"> 0 / 11 </div>
                </h2>
            </div>
            <TeamLayout team={user.team} />
        </main>
    </>
  );
};

export default UserTeam;