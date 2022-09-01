import styled from "styled-components";
import { ThemeColor } from "../../../../constants";

export const OptionContainer = styled.div`
  padding: 0px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: default;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px dotted ${ThemeColor.MANATEE};
  }

  &:hover,
  &:hover * {
    font-weight: 500;
  }

  &::after,
  &::after * {
    font-weight: 500;
  }
`;

export const NameStyle = styled.div`
  font-size: 14px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 200;
  text-align: center;
  padding-top: 16px;
  padding-bottom: 12px;
`;
