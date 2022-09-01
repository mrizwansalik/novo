import { Col, Row, Button, Label } from "reactstrap";
import styled from "styled-components";
import { ThemeColor } from "../../../../../constants/index";

export const ActionSheetContainer = styled.div`
  margin-right: 1%;
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
  border-left: 1px solid #7f868c;
  @media (max-width: 768px) {
    border-left: None;
  }
`;
export const RightContainerHeaders = styled.div`
  padding: 4% 0px;
  font-size: 18px;
  line-height: 27px;
  color: #212135;
  font-weight: 700;
  border-bottom: 1px solid #c8c8c8;
`;
export const RightContainerSection = styled.div`
  position: relative;
  padding: 24px 27px;
  background-color: #fff;
  width: 100%;
  .react-datepicker-wrapper {
    width: 100%;
    display: block !important;
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

export const Pill = styled(Button)<{ isActive?: boolean }>`
  height: 36px;
  min-width: 0;
  padding: 8px 16px;
  border-radius: 18px;
  border: 1px solid #c8c8c8;
  background-color: ${(props) =>
    props.isActive ? ThemeColor.AZURE_RADIANCE : "#f5f5f5"};
  margin-right: 10px;
  margin-top: 5px;
  color: #212135;
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    background-color: ${(props) =>
      props.isActive ? ThemeColor.AZURE_RADIANCE : "#f5f5f5"};

    color: #212135;
  }
`;

export const CarrierWraper = styled.div`
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
`;

export const BrokerageCount = styled(Col)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
`;
export const HeaderContainer = styled(Row)`
  --bs-gutter-x: 0px;
  border-top: 1px solid #7f868c;
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
  width: 100%;
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
  border-right: 1px solid #c8c8c8;
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

  &:hover {
    background-color: #0078c2;
    border: 1px solid #0078c2;
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
