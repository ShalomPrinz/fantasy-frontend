import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import { getIcon, Icon } from "../../res";

interface IconProps {
  className?: string;
  color?: string;
  icon: Icon;
  onClick?: Function;
  size?: "1" | "2" | "3" | "6";
}

const IconComponent = ({
  className,
  color,
  icon,
  onClick,
  size,
}: IconProps) => {
  let style = [];

  if (size) style.push(`fa-${size}x`);
  if (onClick) style.push("clickable");
  if (className) style.push(className);

  const IconProps: FontAwesomeIconProps = {
    icon: getIcon(icon),
  };

  if (style.length) IconProps.className = style.join(" ");
  if (color) IconProps.color = color;
  if (onClick) IconProps.onClick = () => onClick();

  return <FontAwesomeIcon {...IconProps} />;
};

export default IconComponent;
