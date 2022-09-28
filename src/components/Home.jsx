import React from "react";
import { faTrophy, faRankingStar, faImage } from '@fortawesome/free-solid-svg-icons';

import CardGroup from "./CardGroup";

const Home = () => {
  const context = {
    items: [
      {
        title: "Create your league",
        text: "play the ultimate fantasy game with friends",
        smallText: "small lines example",
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
  return (
    <CardGroup {...context} />
  );
};

export default Home;