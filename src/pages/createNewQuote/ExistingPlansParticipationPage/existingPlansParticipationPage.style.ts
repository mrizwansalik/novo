import Switch from "react-switch";
import { Row } from "reactstrap";
import InputGroup from "src/components/InputGroup";
import { device, ThemeColor } from "src/constants";
import styled from "styled-components";
interface IInputProps {
  disabled?: boolean;
  isShort?: boolean;
  isMedium?: boolean;
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

export const StyledForm = styled.form``;

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

export const FormBorder = styled.div`
  padding: 23px 23px 32px 23px;
  margin-bottom: 32px;
  margin-right: 24px;
  margin-top: 0px;
  border: 1px solid #c8c8c8;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: inset 0 2px 0 0 rgb(35 205 252 / 50%), 0 0 6px 0 rgb(0 0 0 / 15%);

  @media only screen and (${device.mobile}) {
    margin-right: 0px;
  }
`;

export const PaddingRow = styled(Row)`
  padding: 8px 4px;
`;

export const Title = styled.div`
  margin-bottom: 12px;

  h2 {
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    color: #212135;
    margin: 0 0 8px;
  }

  h3 {
    font-size: 16px;
    line-height: 24px;
    color: #212135;
    font-weight: 500;
    margin-bottom: 0 0 8px;
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 36px;
  min-width: 190px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 300;
  padding: 8px;
  margin-top: 25px;
  border-radius: 3px;
  background-color: ${ThemeColor.AZURE_RADIANCE};
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  color: ${ThemeColor.WHITE_COLOR};
  cursor: pointer !important;
  opacity: 1;

  :hover {
    background-color: #0078c2;
    border-color: #0078c2;
  }
`;

export const StyledInput = styled(InputGroup)<IInputProps>`
  margin: 16px 0 25px;

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

export const SwitchArea = styled.div`
  display: flex;
  padding-left: 15px;
  margin-bottom: 25px;

  h3 {
    font-size: 16px;
    line-height: 26px;
    font-weight: 300;
    margin-left: 12px;
  }
`;

export const SwitchButton = styled(Switch)`
  border: 1px solid #c8c8c8;
`;

export const CensusButton = styled.button`
  background-color: #ffffff;
  color: #0097f5;
  height: 38px;
  min-width: 166px;
  padding: 8px 18px;
  border-radius: 3px;
  border: 1px solid #0097f5;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 300 !important;

  :hover {
    background-color: #e6e6e6;
  }
`;
