import React, { ReactChild } from "react";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export interface IStyledButtonProps {
  className?: string;
  onClick?: () => any;
  children?: ReactChild;
  isPrimary?: boolean;
  isSecondary?: boolean;
}

const StyledButton = styled.button<IStyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 36px;
  min-width: 190px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 300;
  padding: 8px;
  margin-top: 8px;
  border-radius: 3px;
  background-color: ${(props) =>
    props.isPrimary
      ? ThemeColor.AZURE_RADIANCE
      : props.isSecondary
      ? ThemeColor.WHITE_COLOR
      : ThemeColor.BLACK_COLOR};
  border: 1px solid
    ${(props) => (props.isPrimary ? ThemeColor.AZURE_RADIANCE : "#e3e9ec")};
  color: ${(props) =>
    props.isPrimary ? ThemeColor.WHITE_COLOR : ThemeColor.STEEL_GRAY};
  cursor: pointer;

  :hover {
    background-color: ${(props) =>
      props.isPrimary ? "#0078c2" : ThemeColor.MERCURY};
    border-color: ${(props) =>
      props.isPrimary ? "#0078c2" : ThemeColor.MERCURY};
    color: ${(props) =>
      props.isPrimary
        ? ThemeColor.WHITE_COLOR
        : props.isSecondary
        ? ThemeColor.STEEL_GRAY
        : ThemeColor.BLACK_COLOR};
  }
`;

const ButtonWithPriority = (props: IStyledButtonProps) => {
  const { children, ...rest } = props;
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default ButtonWithPriority;
