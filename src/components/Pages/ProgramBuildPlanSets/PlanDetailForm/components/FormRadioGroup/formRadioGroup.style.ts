import { Row } from "reactstrap";
import { FormGroup } from "reactstrap";
import InputRadio from "src/components/InputRadio";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  padding-right: 15px;
  margin-bottom: 40px;
`;

export const StyledRow = styled(Row)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  margin-top: 12px;

  label {
    display: flex;
    align-item: center;
  }
`;

export const StyledLabel = styled.label`
  font-size: 16px;
  line-height: 24px;
  color: #212135;
  margin-bottom: 16px;
  font-weight: 500;
`;

export const StyledRadioGroup = styled(FormGroup)`
  margin-bottom: 16px;

  > div {
    label {
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      color: ${ThemeColor.STEEL_GRAY};
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

export const StyledInputRadio = styled(InputRadio)`
  min-height: 24px;
  min-width: 24px;
  border: 2px solid #c8c8c8;
  background-color: #FFF;
  border-radius: 12px;
  padding: 0;
  cursor: pointer;
  position: relative;

  :checked {
    background: transparent;
    box-shadow: none;
    border-color: #0097f5;

    :before {
      position: absolute;
      left: 2px;
      top: 2px;
      width: 16px;
      height: 16px;
      content: " ";
      background-color: #0097f5 !important;
      border-radius: 8px;
    }
  }
  :disabled {
    color: #A6A6AE;
    border-color: #e3e9ec;
    background-color: #cbcbcb;
    position: relative;
    cursor: not-allowed;

    :before {
      background-color: #6e8391 !important;
    }
  }
}
`;
