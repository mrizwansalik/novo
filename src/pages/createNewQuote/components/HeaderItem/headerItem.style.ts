import { device, ThemeColor } from "src/constants";
import styled from "styled-components";

interface IHeaderItemProps {
  isActive?: boolean;
  isCompleted?: boolean;
  isShownOnMobile?: boolean;
}

interface IStepNumberProps {
  isActive?: boolean;
  isComplete?: boolean;
}

export const ComponentWrapper = styled.div<IHeaderItemProps>`
  display: inline-block;
  cursor: pointer;
  box-sizing: border-box;

  border-bottom: ${(props) =>
    props.isActive
      ? `3px solid ${ThemeColor.AZURE_RADIANCE}`
      : props.isCompleted
      ? `3px solid #def8ff`
      : "none"};
  background-color: ${(props) =>
    props.isActive ? ThemeColor.TWILIGHT_BLUE : "inherit"};
  border-right: 1px solid #e3e9ec;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    box-sizing: border-box;
    padding: 12px 16px;
    min-width: 118px;
    flex-wrap: wrap;

    h3 {
      margin-bottom: 0;
      font-size: 16px;
      line-height: 27px;
      font-weight: 500;
      color: ${(props) =>
        props.isActive || props.isCompleted
          ? ThemeColor.BLACK_COLOR
          : "#8d959c"};
    }
  }

  @media only screen and (${device.mobile}) {
    display: ${(props) => (props.isShownOnMobile ? "inline-block" : "none")};
  }
`;

export const CardWrapper = styled.div`
  height: 100%;
  justify-content: space-between !important;

  h3 {
    white-space: pre;
  }
`;

export const StepContainer = styled.div`
  display: flex;

  span {
    font-weight: 300;
  }
`;

export const StepCount = styled.div<{ isActive?: boolean }>`
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  font-weight: 300;
  color: ${(props) => (props.isActive ? ThemeColor.BLACK_COLOR : "#aeb8c0")};
`;

export const StepNumber = styled.div<IStepNumberProps>`
  font-size: 14.399999999999999px;
  line-height: 24px;
  color: ${(props) =>
    props.isActive
      ? ThemeColor.AZURE_RADIANCE
      : props.isComplete
      ? ThemeColor.WHITE_COLOR
      : "#aeb8c0"};
  border-color: ${(props) =>
    props.isActive || props.isComplete
      ? ThemeColor.AZURE_RADIANCE
      : "#aeb8c0"} !important;
  border-radius: 50%;
  border: 1px solid;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  background: ${(props) =>
    props.isComplete ? ThemeColor.AZURE_RADIANCE : ThemeColor.WHITE_COLOR};
`;
