import { Row, Input, Button } from "reactstrap";
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
  height: 100%;
  width: auto;
`;

export const InputCard = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  margin-bottom: 1rem;

  height: max-content;
  color: #2e2e41;
  background-color: white;
  border: 1px solid #9797a7;
  border-radius: 5px;

  @media only screen and (min-width: 728px) {
    width: 80%;
  }
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
export const StyledInput = styled(Input)`
  // margin-bottom: 25px;\
  margin-bottom: 1.5rem !important;

  line-height: 24px;
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

export const FormNumberInput = styled(NumberInput)`
  margin-bottom: 25px;
  line-height: 24px;
  border: 1px solid #9797a7;
  color: #9797a7;
  padding: 0 0 5px 0;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
  border-radius: 0;
  width: 100%;
  box-shadow: none !important;
  background: none;
`;

export const BottomCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  // width: 900px;
  height: max-content;
  color: #2e2e41;
  margin-top: 4rem;
`;

export const Paragraph = styled.p`
  font-size: 12px;
`;

export const MainHeading = styled.p`
  font-size: 1rem;
  // margin-left: 2rem;
  // padding: 30px;
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

export const Paragraphlast = styled.div`
  font-size: 12px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  // padding: 0 51px 0 65px;
`;

export const ActionButtonsContainer = styled(Row)`
  display: inline-block;
  margin-top: 2rem;
  // padding-right: 10px;
  // padding-left: 10px;
`;
export const BackButton = styled(Button)`
  text-align: center;

  cursor: pointer;

  float: left;
  margin-top: 10px;

  border: 1px solid ${ThemeColor.MYSTIC};

  background-color: #9797a7;
`;

export const NextButton = styled(Button)`
  text-align: center;

  cursor: pointer;
  margin-top: 10px;

  float: left;

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
