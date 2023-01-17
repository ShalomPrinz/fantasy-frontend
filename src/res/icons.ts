import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faCheck,
  faCircleCheck,
  faCirclePlus,
  faImage,
  faPlus,
  faRankingStar,
  faRightFromBracket,
  faTimes,
  faTrophy,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { get } from "lodash";

const icons = {
  accept: faCheck,
  check: faCircleCheck,
  image: faImage,
  invite: faPlus,
  logout: faRightFromBracket,
  navbarClosed: faBars,
  navbarExpanded: faTimes,
  plus: faCirclePlus,
  rankingStar: faRankingStar,
  reject: faXmark,
  trophy: faTrophy,
};

export type Icon = keyof typeof icons;

export const getIcon = (icon: Icon): IconDefinition =>
  get(icons, icon, faImage);
