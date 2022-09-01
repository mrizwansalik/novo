import React, { Fragment } from "react";

export interface IIconProps {
  iconName: string;
  tooltipId?: string;
  size?: number;
  width?: number;
  height?: number;
  ref?: React.Ref<HTMLDivElement>;
  onClick?: () => void;
  alt?: string;
  noWrapper?: boolean;
  title?: string;
}

const Icon = (props: IIconProps) => {
  const {
    iconName,
    tooltipId,
    size,
    width,
    height,
    alt,
    onClick,
    noWrapper,
    title,
    ...rest
  } = props;
  const defaultSize: number = 32;
  const iconSize: number = size ? size : defaultSize;

  return (
    <Fragment>
      {noWrapper && (
        <img
          src={`/assets/icons/${iconName}`}
          width={width | iconSize}
          height={height | iconSize}
          alt={alt}
          onClick={onClick}
          id={tooltipId}
          title={title}
        />
      )}
      {!noWrapper && (
        <div {...rest} onClick={onClick}>
          <img
            src={`/assets/icons/${iconName}`}
            width={width | iconSize}
            height={height | iconSize}
            alt={alt}
            id={tooltipId}
            title={title}
          />
        </div>
      )}
    </Fragment>
  );
};

export default Icon;
