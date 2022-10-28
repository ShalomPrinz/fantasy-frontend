import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faImage,
  faRankingStar,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { get } from "lodash";

const icons = {
  image: faImage,
  rankingStar: faRankingStar,
  trophy: faTrophy,
};

export const getIcon = (icon: string): IconDefinition =>
  get(icons, icon, faImage);
