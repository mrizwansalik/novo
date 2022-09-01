import { Button } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  display: flex;
  background: ${ThemeColor.WHITE_COLOR} !important;
  border-bottom: 1px solid #e3e9ec;
  max-width: 100vw;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 0px;
  }
`;

export const ReturnItem = styled.div`
  display: inline-block;
  border-right: 1px solid #e3e9ec;
  cursor: pointer;
  min-width: 130px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 15px;
    margin: 0;
    color: ${ThemeColor.BLACK_COLOR};
    box-sizing: border-box;
    min-height: 82px;

    h3 {
      margin-left: 0px;
      font-size: 16px;
      line-height: 27px;
      font-weight: 500;
      margin-bottom: 0;
    }

    img {
      margin-right: 12px;
      transform: scaleX(-1);
    }
  }
`;

export const ButtonWrapper = styled.div`
  align-self: center;
  padding-left: 30px;
  padding-right: 30px;
`;

export const SelectButton = styled(Button)`
  width: fit-content;
  padding: 8px 18px;
  border-radius: 3px;
  background-color: ${ThemeColor.AZURE_RADIANCE};
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  color: ${ThemeColor.WHITE_COLOR};
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
  white-space: pre;
`;
