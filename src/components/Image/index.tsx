import React from "react";

interface IImageProps {
  imageName?: string;
  width?: number;
  height?: number;
  ref?: React.Ref<HTMLDivElement>;
  alt?: string;
  source?: string;
  onClick?: () => void;
}

const DEFAULT_IMAGE: string = "/assets/images/default_logo_x2.png";
const Image = (props: IImageProps) => {
  const { imageName, width, height, alt, source, onClick, ...rest } = props;
  const imageUrl = (source ?? `/assets/images/${imageName}`) || DEFAULT_IMAGE;

  return (
    <div {...rest}>
      {onClick ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={alt}
          onClick={onClick}
        />
      ) : (
        <img src={imageUrl} width={width} height={height} alt={alt} />
      )}
    </div>
  );
};

export default Image;
