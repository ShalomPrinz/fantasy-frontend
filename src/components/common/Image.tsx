import { Image as ImageComponent } from "react-bootstrap";

import { getImage } from "../../res";
import type { Image } from "../../res";

interface ImageProps {
  className?: string;
  height?: string;
  imageRef?: React.RefObject<HTMLImageElement>;
  rounded?: boolean;
  src: Image;
  style?: React.CSSProperties;
  title: string;
}

function AppImage({ imageRef, src, title, ...props }: ImageProps) {
  return (
    <ImageComponent
      alt={title}
      ref={imageRef}
      src={getImage(src)}
      title={title}
      {...props}
    />
  );
}

export default AppImage;
