import React from "react";

import {
  faImage,
  faRankingStar,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";

import { CardGroup } from "../../components";
import { wide_grass } from "../../res";

const cards = [
  {
    id: 0,
    title: "Create your league",
    text: "play the ultimate fantasy game with friends",
    icon: faTrophy,
  },
  {
    id: 1,
    title: "Podium",
    text: "observe some interesting stats",
    icon: faRankingStar,
  },
  {
    id: 2,
    title: "Another thing",
    text: "wow another one",
    icon: faImage,
  },
];

const Home = () => {
  return (
    <>
      <div className="position-relative text-center overflow-hidden">
        <Image src={wide_grass} alt="Original Soccer Grass" />
        <div className="position-absolute top-50 start-50 translate-middle text-white w-100">
          <h1 className="fw-bold">Champions League Fantasy.</h1>
          <h4>Play Now</h4>
        </div>
      </div>
      <div className="bg-white overlap-above rounded-top mx-5">
        <CardGroup cards={cards} />
        <div className="text-center fw-bold fs-3">Simple. Fast. Addictive.</div>
      </div>
    </>
  );
};

export default Home;
