import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faCircleCheck,
  faCirclePlus,
  faImage,
  faRankingStar,
  faRightFromBracket,
  faTimes,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { get } from "lodash";

const icons = {
  check: faCircleCheck,
  image: faImage,
  logout: faRightFromBracket,
  navbarClosed: faBars,
  navbarExpanded: faTimes,
  plus: faCirclePlus,
  rankingStar: faRankingStar,
  trophy: faTrophy,
};

export type Icon = keyof typeof icons;

export const getIcon = (icon: Icon): IconDefinition =>
  get(icons, icon, faImage);
