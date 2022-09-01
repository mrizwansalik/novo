import DateInput from "src/components/DateInput";
import InputGroup from "src/components/InputGroup";
import SingleSelect from "src/components/SingleSelect";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const ErrorComponent = styled.div`
  font-size: 16px;
  line-height: 24px;
`;

export const ErrorMessage = styled.p`
  color: ${ThemeColor.CINNABAR};
  margin-bottom: 16px;
  font-weight: 500;
`;

export const AdditionalData = styled.div`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 14px;
  line-height: 18px;
  font-weight: 300;

  span {
    color: ${ThemeColor.BLACK_COLOR};
  }
`;

export const StyledInput = styled(InputGroup)`
  margin-bottom: 25px;

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
  }
`;

export const StyledSelect = styled(SingleSelect)``;

export const StyledDateInput = styled(DateInput)`
  max-width: 100px;
  height: 38px;
  padding-left: 10px;
`;
