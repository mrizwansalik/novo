import { Input } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  width: 75%;
  margin-bottom: 25px;
`;

export const CheckboxWithLabel = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
`;

export const Checkbox = styled(Input)`
  margin-top: 0px;
`;

export const Label = styled.div`
  margin-left: 8px;
  font-size: 14px;
  line-height: 16px;
  color: ${ThemeColor.STEEL_GRAY};
  font-family: MuseoSans;
  font-weight: 300;
`;

export const CommonInput = styled(Input)<{ mediumSpacing: boolean }>`
  border-color: transparent;
  border-radius: 0px;
  padding-right: 0px;
  padding-left: 0px;
  margin-bottom: ${(props) => (props?.mediumSpacing ? "16px" : "0px")};

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

export const RelativeBlock = styled.div`
  position: relative;
`;

export const InputWithPrefix = styled.div`
  border-bottom: 1px solid ${ThemeColor.SILVER} !important;
  padding-left: 16px;
`;

export const PrefixSymbol = styled.span`
  position: absolute;
  left: 4px;
  top: 8px;
  color: ${ThemeColor.SLATE_GRAY};
`;
