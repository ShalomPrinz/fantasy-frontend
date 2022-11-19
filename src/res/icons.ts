import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faCirclePlus,
  faImage,
  faRankingStar,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { get } from "lodash";

const icons = {
  check: faCircleCheck,
  image: faImage,
  plus: faCirclePlus,
  rankingStar: faRankingStar,
  trophy: faTrophy,
};

export const getIcon = (icon: string): IconDefinition =>
  get(icons, icon, faImage);
