import React from "react";
import { faTrophy, faRankingStar, faImage } from '@fortawesome/free-solid-svg-icons';
import { Image } from "react-bootstrap";

import CardGroup from "./CardGroup";

import field from "../res/cl_field.jpg";

const context = {
  items: [
    {
      title: "Create your league",
      text: "play the ultimate fantasy game with friends",
      icon: faTrophy
    },
    {
      title: "Podium",
      text: "observe some interesting stats",
      icon: faRankingStar
    },
    {
      title: "Another thing",
      text: "wow another one",
      icon: faImage
    }
  ]
}

const Home = () => {
  
  return (
    <>
      <div className="position-relative text-center overflow-hidden">
        <Image src={field} alt="Field" />          
        <div className="position-absolute top-50 start-50 translate-middle text-white w-100">
          <h1 className="fw-bold" >Champions League Fantasy.</h1>
          <h4>Play Now</h4>
        </div>
      </div>
      <div className="bg-white overlap-above rounded-top mx-5" >
        <CardGroup {...context} />
        <div className="text-center fw-bold fs-3">
          Simple. Fast. Addictive.
        </div>
      </div>
    </>
  );
};

export default Home;