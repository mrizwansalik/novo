import { Col } from "reactstrap";
import InputGroup from "src/components/InputGroup";
import { ThemeColor } from "src/constants";
import { device } from "src/constants";
import styled from "styled-components";
// import InputGroup from "../../../../InputGroup";

export const Container = styled.div`
  padding-top: 40px;
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 15px;
`;

export const StyledCol = styled(Col)<{ isFlex?: boolean }>`
  display: ${(props) => (props.isFlex ? "flex" : "block")};
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;

  > div:nth-child(2) {
    width: 80%;
  }
  > span {
    margin-right: 8px;
    text-align: center;
  }
  @media only screen and (${device.mobile}) {
    margin-bottom: 8px;
  }
  @media only screen and (${device.tablet}) {
    margin-bottom: 8px;
  }
  @media only screen and (${device.desktop}) {
    margin-bottom: 0;
  }
`;

export const TopSheetTitle = styled.h1`
  margin-bottom: 25px;
  font-size: 44px;
  line-height: 54px;
  font-weight: 300;
`;

export const TopSheetInputField = styled(InputGroup)`
  input {
    background-color: #f6f6f6f6;
  }
  input:focus {
    background-color: #f6f6f6f6;
  }
`;

export const StyledInput = styled(InputGroup)`
  margin-bottom: 25px;

  label {
    margin-bottom: 16px;
  }

  input {
    height: 36px;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: ${ThemeColor.STEEL_GRAY};
    padding: 0 0 5px 0;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid #c8c8c8 !important;
    border-radius: 0;
    width: 100%;
    box-shadow: none !important;
    background: none;
  }
`;
