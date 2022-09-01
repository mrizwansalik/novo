import { FormGroup } from "reactstrap";
import CreatableSelect from "src/components/CreatableSelect";
import InputCheckbox from "src/components/InputCheckbox";
import InputGroup from "src/components/InputGroup";
import SingleSelect from "src/components/SingleSelect";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

interface IInputProps {
  disabled?: boolean;
  hasMarginTop?: boolean;
  isShort?: boolean;
  isMedium?: boolean;
}

interface IButtonProps {
  disabled?: boolean;
}

export const PageContainer = styled.div``;

export const ContentContainer = styled.div`
  max-width: 1290px;
  padding: 20px 15px 50px;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  position: relative;

  h2 {
    font-weight: 700;
    color: #4b565e;
    font-size: 18px;
    line-height: 24px;
    margin-top: 24px;
    margin-bottom: 25px;
  }
`;

export const PageHeader = styled.div`
  min-height: 138px;
  background-color: #f5f5f5;
  margin-bottom: 25px;
  padding: 25px 0 20px;

  div {
    max-width: 1290px;
    padding: 0 15px;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    position: relative;

    h2 {
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
      color: #4b565e;
      margin-bottom: 8px;
    }

    h1 {
      font-size: 24px;
      line-height: 36px;
      margin-bottom: 8px;
      color: #212135;
      font-weight: 700;
    }
  }
`;

export const StyledForm = styled.form``;

export const Title = styled.div`
  display: flex;

  h2 {
    font-size: 18px;
    line-height: 27px;
    color: #212135;
    font-weight: 700;
    margin: 24px 0 20px;

    :nth-child(2) {
      font-weight: 300;
      color: ${ThemeColor.TOWER_GRAY};
    }
  }
`;

export const StyledInput = styled(InputGroup)<IInputProps>`
  margin-top: ${(props) => (props.hasMarginTop ? "25px" : "inherit")};
  margin-bottom: 25px;

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

    :focus {
      outline: none;
    }

    :disabled {
      color: #a6a6a6 !important;
    }
  }
`;

export const StyledCheckbox = styled(InputCheckbox)`
  label {
    font-size: 14px;
    font-weight: 300;
    line-height: 16px;
    margin-top: 3px;
  }
`;

export const StyledCreatableSelect = styled(CreatableSelect)`
  margin-bottom: 25px;

  label {
    margin-bottom: 16px !important;
  }
`;

export const StyledSelect = styled(SingleSelect)`
  margin-bottom: 25px;
  max-width: 440px;

  label {
    margin-bottom: 16px !important;
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

export const PrimaryButton = styled.button<IButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 36px;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 300;
  padding: 8px;
  margin-top: 25px;
  border-radius: 3px;
  background-color: ${(props) =>
    props.disabled ? "#cbcbcb" : ThemeColor.AZURE_RADIANCE};
  border: 1px solid
    ${(props) => (props.disabled ? "#cbcbcb" : ThemeColor.AZURE_RADIANCE)};
  color: ${(props) => (props.disabled ? "a6a6a6" : ThemeColor.WHITE_COLOR)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")} !important;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};

  :hover {
    background-color: ${(props) => (props.disabled ? "#cbcbcb" : "#0078c2")};
    border-color: ${(props) => (props.disabled ? "#cbcbcb" : "#0078c2")};
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: ${(props) =>
    props.disabled ? "#cbcbcb" : ThemeColor.WHITE_COLOR};
  color: ${(props) => (props.disabled ? "a6a6a6" : ThemeColor.AZURE_RADIANCE)};

  :hover {
    background-color: #cbcbcb;
    color: ${(props) =>
      props.disabled ? "a6a6a6" : ThemeColor.AZURE_RADIANCE};
    border-color: ${(props) =>
      props.disabled ? "#cbcbcb" : ThemeColor.AZURE_RADIANCE};
  }
`;
