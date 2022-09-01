import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  padding-left: 0px;
  padding-right: 0px;
`;

export const Label = styled(ColNoSpacing)`
  text-align: center;
  color: ${ThemeColor.MANATEE};
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const ArrowSection = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
`;

export const LeftArrow = styled(ColNoSpacing)`
  display: flex;
  justify-content: flex-end;
  transform: scaleX(-1);
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const RightArrow = styled(ColNoSpacing)`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const CenterSection = styled(ColNoSpacing)`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DotSymbol = styled.div<{ isActive: boolean }>`
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props?.isActive ? ThemeColor.AZURE_RADIANCE : "transparent"};
  margin-left: 8px;
  margin-right: 8px;
  border: 1px solid
    ${(props) => (props?.isActive ? "transparent" : ThemeColor.MYSTIC)};
`;
