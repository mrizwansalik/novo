import styled from "styled-components";
import { ThemeColor } from "../../../../../../../constants";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const WrapperButton = styled.div`
  width: 50%;
  background-color: ${ThemeColor.FOAM};
  border-radius: 100px;
  display: flex;
  flex-direction: row;
`;

export const LeftButton = styled.div<{ active: boolean }>`
  border-radius: 100px;
  background-color: ${(props) =>
    props?.active ? ThemeColor.AZURE_RADIANCE : ThemeColor.FOAM};
  color: ${(props) =>
    props?.active ? ThemeColor.WHITE_COLOR : ThemeColor.AZURE_RADIANCE};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
  padding: 8px;
  flex: 1;
`;

export const RightButton = styled.div<{ active: boolean }>`
  border-radius: 100px;
  background-color: ${(props) =>
    props?.active ? ThemeColor.AZURE_RADIANCE : ThemeColor.FOAM};
  color: ${(props) =>
    props?.active ? ThemeColor.WHITE_COLOR : ThemeColor.AZURE_RADIANCE};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  flex: 1;
  text-align: center;
  padding: 8px;
  flex: 1;
`;
