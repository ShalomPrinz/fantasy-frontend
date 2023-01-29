import { Image as ImageComponent } from "react-bootstrap";

import { getImage } from "../../res";
import type { Image } from "../../res";

interface ImageProps {
  className?: string;
  height?: string;
  ref?: React.RefObject<HTMLImageElement>;
  rounded?: boolean;
  src: Image;
  style?: React.CSSProperties;
  title: string;
}

function AppImage({ src, title, ...props }: ImageProps) {
  return (
    <ImageComponent alt={title} src={getImage(src)} title={title} {...props} />
  );
}

export default AppImage;
