import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const RelativeBlock = styled.div`
  position: relative;
`;

export const CommonTextarea = styled.textarea`
  border-color: transparent;
  border-radius: 0px;
  padding-right: 0px;
  padding-left: 0px;

  border-radius: 3px;
  width: 100%;
  background-color: #f7f7f7;
  min-height: 66px;
  padding: 10px 15px;

  border-bottom: 1px solid #ebebeb !important;
  border-right: 1px solid #ebebeb !important;
  border-left: 1px solid #ebebeb !important;
  border-top: 1px solid ${ThemeColor.MANATEE} !important;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
`;
