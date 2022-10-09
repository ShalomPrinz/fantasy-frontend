import React from "react";
import Image from "react-bootstrap/Image";

import field from "../res/field.png";
import "./UserTeam.css";

const UserTeam = ({ user }) => {

  if (!user) {
      return <h1 className="text-center m-5 p-5 bg-danger text-white">Please Log In to view your team</h1>
  }
  
  return (
    <>
        <main className="container w-75 p-4 mt-4 rounded bg-team-form">
            <h2 className="fw-bold"> {user.name}'s Team </h2>
            Select a maximum of 3 players of a single team
            <div className="bg-white text-center shadow-below rounded my-3">
                <h5 className="bg-default py-2 mx-3 rounded-bottom"> Gameweek 1 </h5>
                <div className="d-flex justify-content-center align-items-center">
                    Gameweek 1 deadline: 
                    <div className="fw-bold ps-2"> Friday 20:30 </div>
                </div>
                <h2 className="py-3 d-flex justify-content-center align-items-center">
                    Players Selected:
                    <div className="bg-light-danger mx-3 p-2 rounded"> 0 / 11 </div>
                </h2>
            </div>
            <div className="position-relative">
                <Image className="w-100" src={field} alt="Team Field Background" rounded />
            </div>
        </main>
    </>
  );
};

export default UserTeam;