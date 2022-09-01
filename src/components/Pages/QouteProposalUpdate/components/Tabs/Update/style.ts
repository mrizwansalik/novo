import { Col, Row, Button, Label } from "reactstrap";
import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants/index";
import styled from "styled-components";

export const ActionSheetContainer = styled.div`
  margin-right: 1%;
  margin-left: 1%;
  height: 80%;
  border-bottom: 1px solid #7f868c;
`;

export const SearchInput = styled.input`
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-box-pack: space-between;
  -moz-box-pack: space-between;
  -ms-flex-pack: space-between;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  border: 1px solid #c8c8c8;
  border-radius: 3px;
  background-color: transparent !important;
  width: 200px;
  height: 38px;
  padding: 8px;
`;

export const SearchIcon = styled(Icon)`
  margin-left: 8px;
  margin: -33px 0px 0px 175px;
  cursor: pointer;
`;
export const MessageBox = styled.div`
  width: 100%;
  padding: 16px 30px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  color: #212135;
  background-color: #fff;
  border-right: 4px solid transparent;
  border-bottom: 1px solid #c8c8c8;
`;
export const BoxItem = styled.div`
  outline: 0 !important;
  box-sizing: border-box;
`;

export const ContentHead = styled(Col)`
  border-bottom: 1px solid #7f868c;
  width: 100%;
  height: 80px;
  padding: 20px 10px 20px;
`;
export const ComposeButoom = styled(Col)`
  border-top: 1px solid #7f868c;
  border-bottom: 1px solid #7f868c;
  text-align: center;
  vertical-align: middle;
  background-color: #fafafa;
  width: 100%;
  padding: 10%;
`;

export const UpdateButton = styled(Button)`
  height: 38px;
  min-width: 166px;
  padding: 8px 18px;
  border-radius: 3px;
  background-color: #0097f5;
  border: 1px solid #0097f5;
  color: #fff;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

export const Pill = styled(Button)`
  height: 36px;
  min-width: 0;
  padding: 8px 16px;
  border-radius: 18px;
  border: 1px solid #c8c8c8;
  background-color: #f5f5f5;
  margin-right: 10px;
  margin-top: 5px;
  color: #212135;
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-box-pack: space-between;
  -moz-box-pack: space-between;
  -ms-flex-pack: space-between;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
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
  width: -webkit-fill-available;
  --bs-gutter-x: 0px;
  // border-top: 1px solid #7f868c;
  // padding-left: 8%;
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
  width: auto;
  height: auto;
  padding-top: 16px;
  border: none;
  box-shadow: none;
  background-color: transparent;
  resize: none;
  white-space: pre-wrap;
  width: inherit;
  height: 100vh;
  outline: none;
`;
export const HeaderLayout = styled(Col)`
  padding-left: 0px;
  padding-right: 0px;
  // display: flex;
  // flex-wrap: wrap;
`;
export const UpdateMenu = styled(Col)`
  border-right: 1px solid #c8c8c8;
  border-bottom: 1px solid #c8c8c8;
`;
export const AddButtonGroup = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 10px 24px 50px;
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
