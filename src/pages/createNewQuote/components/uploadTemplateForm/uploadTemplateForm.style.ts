import { Col, FormGroup, Label, Row } from "reactstrap";
import InputGroup from "src/components/InputGroup";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

interface IRowProps {
  isLastRow?: boolean;
}

interface IColProps {
  noPaddingLeft?: boolean;
}

interface IInputProps {
  hasMarginTop?: boolean;
  isShort?: boolean;
  isMedium?: boolean;
}

export const StyledRow = styled(Row)<IRowProps>`
  background-color: #fafafa;
  padding: 24px 12px;
  margin: 0;
  margin-bottom: ${(props) => (props.isLastRow ? "25px" : "0px")};
`;

export const StyledCol = styled(Col)<IColProps>`
  padding-left: ${(props) => (props.noPaddingLeft ? "0px" : "inherit")};

  h2 {
    font-size: 18px;
    line-height: 27px;
    color: #212135;
    font-weight: 700;
    margin-bottom: 25px;
  }
`;

export const StyledInput = styled(InputGroup)<IInputProps>`
  margin-top: ${(props) => (props.hasMarginTop ? "25px" : "inherit")};

  label {
    font-size: 16px;
    line-height: 24px;
    color: #212135;
    margin-bottom: 16px;
    font-weight: 500;
  }

  label:nth-of-type(2) {
    color: ${ThemeColor.RIVER_BED};
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
    box-shadow: none !important;
    background-color: transparent !important;
    width: ${(props) =>
      props.isShort ? "120px" : props.isMedium ? "170px" : "100%"};
    display: block !important;
  }
`;

export const StyledRadioGroup = styled(FormGroup)`
  margin-bottom: 25px;

  > div {
    display: flex;

    label {
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      color: ${ThemeColor.STEEL_GRAY};
      vertical-align: middle;
      margin-right: 18px;
    }
  }

  legend {
    font-size: 16px;
    line-height: 24px;
    color: ${ThemeColor.STEEL_GRAY};
    margin-bottom: 16px;
    font-weight: 500;
  }
`;

export const StyledLabel = styled(Label)`
  font-size: 16px;
  line-height: 24px;
  color: #212135;
  margin-bottom: 16px;
  font-weight: 500;

  display: flex;

  img {
    margin-left: 12px;
  }
`;

export const TooltipContent = styled.span`
  color: ${ThemeColor.RIVER_BED} !important;
  font-size: 16px !important;
  line-height: 24px !important;
  text-align: left !important;
  font-style: normal !important;
  font-weight: 500 !important;
`;
