import { get } from "lodash";

import Barcelona from "./Barcelona.png";
import Dortmund from "./Dortmund.png";

const jerseys = {
  Barcelona,
  Dortmund,
};

export type Jersey = keyof typeof jerseys;

export const getJersey = (jersey: Jersey) => get(jerseys, jersey, Barcelona);
