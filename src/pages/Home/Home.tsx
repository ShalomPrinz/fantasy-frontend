import { CardGroup, ImageComponent } from "../../components";
import type { CardGroupItem } from "../../components";

const cards: CardGroupItem[] = [
  {
    id: 0,
    title: "Create your league",
    text: "play the ultimate fantasy game with friends",
    icon: "trophy",
  },
  {
    id: 1,
    title: "Podium",
    text: "observe some interesting stats",
    icon: "rankingStar",
  },
  {
    id: 2,
    title: "Another thing",
    text: "wow another one",
    icon: "image",
  },
];

const Home = () => {
  return (
    <>
      <div className="position-relative text-center overflow-hidden">
        <ImageComponent src={"HOME_IMAGE"} title="Original Soccer Grass" />
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
