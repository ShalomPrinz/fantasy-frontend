import React from "react";
import { faTrophy, faRankingStar, faImage } from '@fortawesome/free-solid-svg-icons';
import { Image } from "react-bootstrap";

import CardGroup from "./CardGroup";

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
      <div className="position-relative text-center">
        <Image className="w-100 mb-3" src="./src/res/cl_field.jpg" alt="Field" />          
        <div className="position-absolute top-50 start-50 translate-middle text-white">
          <h1>Champions League Fantasy.</h1>
          <h4>Play Now</h4>
        </div>
      </div>
      <CardGroup {...context} />
    </>
  );
};

export default Home;