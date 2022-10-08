import React from "react";
import { faTrophy, faRankingStar, faImage } from '@fortawesome/free-solid-svg-icons';
import { Image } from "react-bootstrap";

import CardGroup from "./CardGroup";

<<<<<<< HEAD
import field from "../res/cl_field.jpg";

=======
>>>>>>> cb864bb55ef9551531b6caabcb591f089ddc51fe
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
<<<<<<< HEAD
        <Image src={field} alt="Field" />          
=======
        <Image src="./src/res/cl_field.jpg" alt="Field" />          
>>>>>>> cb864bb55ef9551531b6caabcb591f089ddc51fe
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