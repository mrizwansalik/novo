import { Row, Input, Button, Label } from "reactstrap";
import NumberInput from "src/components/NumberInput";
import SingleSelect from "src/components/SingleSelect";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  padding-top: 40px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 15%;
  background-color: #f5f9fc;
  // height: 100vh;
  // width: auto;
  overflow-y: hidden;
`;

export const TopSheetTitle = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
  margin-bottom: 25px;
  font-size: 15px;
  margin-left: 14rem;
`;

export const InputCard = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  height: max-content;

  height: max-content;
  color: #2e2e41;
  background-color: white;
  border: 1px solid #b1b1bd;

  border-radius: 5px;

  @media only screen and (min-width: 728px) {
    width: 80%;
  }
`;

export const FormDropdown = styled(SingleSelect)`
  margin-bottom: 15px !important;
  margin-left: 15px;
  width: 80%;
  color: #9797a7;

  label {
    font-size: 14px;
    line-height: 18px;
    font-weight: 700;
    color: #9797a7;
    text-transform: uppercase;
    font-family: "MuseoSans";
  }
  input {
    font-family: "MuseoSans";
    font-size: 14px;
    line-height: 1px;
    margin-top: 30px;
    color: #9797a7;
    width: 90%;
  }
`;
export const AddBrokerageForm = styled.form`
  margin-top: 40px;
`;

export const DateInput = styled(Input)`
  margin-top: 10px;
  line-height: 18px;
  color: #9797a7;
  margin-left: 15px;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #c8c8c8 !important;
  border-radius: 0;
  width: 80%;
  box-shadow: none !important;
  background: none;
`;
export const StyledInput = styled(Input)`
  margin-top: 10px;
  line-height: 18px;
  // margin-bottom: 5px;
  color: #9797a7;
  margin-left: 15px;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #c8c8c8 !important;
  // border-bottom: none !important;
  border-radius: 0;
  width: 90%;
  box-shadow: none !important;
  background: none;
`;

export const InputLabel = styled(Label)`
  margin-top: 15px;
  margin-left: 30px;
  color: #9797a7;
  font-size: 20px;
`;

export const FormNumberInput = styled(NumberInput)`
  line-height: 1px;
  border: 1px solid #9797a7;
  color: #9797a7;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
  border-radius: 0;
  width: 90%;
  box-shadow: none !important;
  background: none;
`;

export const Paragraph = styled.p`
  font-size: 12px;
`;

export const MainHeading = styled.p`
  font-size: 2rem;
  margin-top: 25px;
  margin-bottom: 2rem;
  margin-left: 10px;
`;

export const SubHeading = styled.p`
  color: #b1b1bd;
  margin-top: 30px;
  margin-left: 30px;
`;

export const SubHeading2 = styled.p`
  color: #b1b1bd;

  margin-left: 30px;
`;

export const LButton = styled(Button)`
  text-align: center;
  margin-top: 2rem;
  cursor: pointer;

  float: right;

  border: 1px solid ${ThemeColor.MYSTIC};

  background-color: #23cdfc;
`;

export const AddEmployeeDetail = styled.div``;
