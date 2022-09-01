import { Input } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const RelativeBlock = styled.div`
  position: relative;
`;

export const InputWithPrefix = styled.div`
  border-bottom: 1px solid ${ThemeColor.SILVER} !important;
  padding-left: 18px;
`;

export const CommonInput = styled(Input)<{ underline: boolean }>`
  border-color: transparent;
  border-radius: 0px;
  padding-right: 0px;
  padding-left: 0px;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  border-bottom: ${(props) =>
    props?.underline ? `1px solid ${ThemeColor.SILVER} !important` : "none"};
  &:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

export const PercentageSymbol = styled.span`
  position: absolute;
  left: 4px;
  top: 8px;
  color: ${ThemeColor.SLATE_GRAY};
`;
