import { Row, Input, Button, Label } from "reactstrap";
import NumberInput from "src/components/NumberInput";
import SingleSelect from "src/components/SingleSelect";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const LogoSection = styled.img`
  // margin-top: 1rem;

  width: 5rem;
  height: 3rem;
}
`;

export const Container = styled.div`
  padding-top: 40px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 15%;
  background-color: #f5f9fc;
  overflow-y: hidden;
  height: 100vh;
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

export const FormNumberInput = styled(NumberInput)`
  margin-bottom: 10px;

  line-height: 24px;
  border: 1px solid #9797a7;
  color: #9797a7;
  // padding-right: -12px;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
  border-radius: 0;
  width: 100%;
  box-shadow: none !important;
  background: none;
`;
export const FormDropdown = styled(SingleSelect)`
  margin-bottom: 1.5rem !important;
  color: #b1b1bd;

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
    line-height: 18px;

    color: #9797a7;
  }
`;
export const StyledSelect = styled(SingleSelect)`
  margin-bottom: 25px;

  label {
    margin-bottom: 16px !important;
  }
`;

export const AddBrokerageForm = styled.form`
  margin-top: 40px;
`;

export const InputLabel = styled(Label)`
  margin-top: 15px;
  margin-left: 30px;
  color: #9797a7;
`;

export const StyledInput = styled(Input)`
  margin-top: 15px;
  margin-left: 16px;
  color: #9797a7;

  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #c8c8c8 !important;
  border-radius: 0;
  width: 100%;
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

export const Paragraphlast = styled.p`
  font-size: 12px;6
  margin-top: 10px;
  justify-content: center;
  padding: 0 51px 0 65px;
`;

export const ActionButtonsContainer = styled(Row)`
  display: inline-block;
  // padding-right: 10px;
  // padding-left: 10px;
`;
export const BackButton = styled(Button)`
  text-align: center;
  margin-right: 10px;
  cursor: pointer;
  float: right;
  margin-top: 10px;
  color: black;
  background-color: white;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    text-decoration: underline;
  }
`;

export const NextButton = styled(Button)`
  text-align: center;

  cursor: pointer;
  margin-top: 10px;

  float: right;

  border: 1px solid ${ThemeColor.MYSTIC};

  background-color: #23cdfc;
`;

// export const RighttArrow = styled(Icon)`
//   cursor: pointer;
//   margin-right: 12px;
//   img {
//     width: 18px;
//     margin-right: 12px;

//     height: 18px;
//     transform: scaleX(-1);
//   }
// `;
