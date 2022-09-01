import { Col, Row, Button, Label } from "reactstrap";
import Icon from "src/components/Icon";
import NumberInput from "src/components/NumberInput";
import { ThemeColor } from "src/constants/index";
import styled from "styled-components";

export const ActionSheetContainer = styled(Row)`
  margin-right: 1%;
  width: 100%;
`;
export const StyledNumberInput = styled(NumberInput)`
  width: 100%;
  font-weight: 300;
  padding-bottom: 5px;
  border-top: none;
  border-left: none;
  border-right: none;
  &:focus {
    outline: none;
  }
`;

export const DueDateButton = styled(Button)`
  background-color: #fff;
  width: 100%;
  color: #0097f5;
  border-color: #0078c2;
  &:hover: {
    background-color: #e6e6e6;
  }
`;
export const RightContainer = styled(Col)`
  padding: 15px 0 25px;
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  flex-wrap: wrap;
  background-color: #fafafa;
`;
export const RightContainerHeaders = styled.div`
  // padding: 4% 0px;
  font-size: 18px;
  line-height: 27px;
  color: #212135;
  font-weight: 700;
  border-bottom: 1px solid #c8c8c8;
`;
export const RightContainerSection = styled.div`
  position: relative;
  padding: 24px 0px;
  width: 100%;
`;
export const RightSectionContent = styled.div`
  padding: 8px 24px;
  font-size: 16px;
  line-height: 24px;
  color: #212135;
  font-weight: 500;
  border-bottom: 1px solid #c8c8c8;
  position: relative;
  :hover {
    .style__ActionButton-vefk71-20 {
      visibility: visible;
    }
  }
`;
export const ActionSheetLayout = styled(Col)`
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  padding: 24px;
  margin-bottom: 50px;
`;
export const Header = styled.h5`
  margin-bottom: 16px;
  display: block;
`;

export const BrokerageCount = styled(Col)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
`;
export const HeaderContainer = styled(Row)`
  --bs-gutter-x: 0px;
  // border-top: 1px solid #7f868c;
  padding-left: 8%;
`;

export const InputLabel = styled(Label)`
  display: inline-block;
  color: #4b565e;
  margin-top: 24px;
  margin-bottom: 16px;
`;
export const Content = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #212135;
  font-weight: 500;
  margin-bottom: 12px;
  overflow: hidden;
`;

export const TextBox = styled.textarea`
  width: 90%;
  padding: 16px;
  border: 1px solid #c8c8c8 !important;
  border-radius: 3px;
  box-shadow: none;
  background-color: transparent;
  resize: none;
  white-space: pre-wrap;
`;
export const HeaderLayout = styled(Col)`
  padding: 15px 0 25px;
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  flex-wrap: wrap;
`;
export const AddButtonGroup = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 0 24px 50px;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: flex-end;
  -moz-box-pack: flex-end;
  -ms-flex-pack: end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
`;
export const AddButton = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  align-items: center;
  padding: 2px 12px;
  background-color: ${ThemeColor.AZURE_RADIANCE};
  border-radius: 3px;
  width: Auto;
  height: 35px;
  margin-right: 10px;
  margin-top: 1%;

  &:hover {
    background-color: #0078c2;
    border: 1px solid #0078c2;
  }
`;
export const StyledInput = styled.input`
  width: 100%;
  font-weight: 300;
  padding-bottom: 5px;
  border-top: none;
  border-left: none;
  border-right: none;
  &:focus {
    outline: none;
  }
`;
export const CancelButton = styled(Button)`
  font-size: 12px;
  line-height: 14px;
  margin-right: 2%;
  height: 35px;
  border-radius: 3px;
  color: ${ThemeColor.BLACK_SQUEEZE};
`;

export const AddLabel = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: ${ThemeColor.WHITE_COLOR};
`;

export const ActionButton = styled.div`
  visibility: hidden;
  position: absolute;
  top: -12px;
  right: 24px;
  background-color: #fff;
  box-shadow: 0 0 6px 0 rgb(0 0 0 / 15%);
  border-radius: 2px;
  padding: 8px;
`;

export const IconWraper = styled(Icon)`
  display: inline-block;
  padding-right: 8px;
  margin-right: 8px;
  // border-right: 1px solid #c8c8c8;
  display: inline-block;
  width: 24px;
  height: 24px;
  overflow: hidden;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 24px 24px;
`;
