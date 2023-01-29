import { get } from "lodash";

import cl_logo from "./cl_logo.png";
import error_image from "./error.png";
import field from "./field.png";
import wide_grass from "./wide_grass.jpg";

const images = {
  NAVBAR_LOGO: cl_logo,
  TEAM_LAYOUT_BG: field,
  HOME_IMAGE: wide_grass,
};

export type Image = keyof typeof images;

export const getImage = (image: Image) => get(images, image, error_image);
