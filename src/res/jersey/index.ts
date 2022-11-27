import { get } from "lodash";

import Barcelona from "./Barcelona.png";
import Chelsea from "./Chelsea.png";
import Dortmund from "./Dortmund.png";
import Error from "./Error.png";
import Inter from "./Inter.png";
import Liverpool from "./Liverpool.png";
import Manchester from "./ManchesterCity.png";
import Milan from "./Milan.png";
import Napoli from "./Napoli.png";
import Paris from "./Paris.png";
import Real from "./RealMadrid.png";
import Tottenham from "./Tottenham.png";

const jerseys = {
  Barcelona,
  Dortmund,
  Inter,
  Liverpool,
  Manchester,
  Milan,
  Chelsea,
  Napoli,
  Tottenham,
  Real,
  Paris,
};

export type Jersey = keyof typeof jerseys;

export const getJersey = (jersey: Jersey) =>
  get(jerseys, jersey.split(" ")[0], Error);
