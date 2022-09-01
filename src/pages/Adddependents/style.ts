import { Row, Input, Button, Label } from "reactstrap";
import NumberInput from "src/components/NumberInput";
import SingleSelect from "src/components/SingleSelect";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

// export const Container = styled.div`
//   background-color: ${ThemeColor.TWILIGHT_BLUE};
//   height: 100%;
//   width: 100%;
//   position: fixed;

//   top: 0;
//   overflow-x: hidden;
// `;

// export const top

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
  margin-top: 10px;
  margin-bottom: 10px;

  color: #9797a7;
  margin-left: 15px;
  label {
    font-size: 14px;
    line-height: 18px;
    font-weight: 700;
    color: #9797a7;
    text-transform: uppercase;
    font-family: "MuseoSans";
  }
  input {
    font-size: 14px;
    line-height: 18px;

    color: #9797a7;
  }
`;
export const StyledSelect = styled(SingleSelect)`
  margin-bottom: 25px;
  // border-top: none !important;
  // border-left: none !important;
  // border-right: none !important;
  // border-bottom: 1px solid #c8c8c8 !important;

  label {
    margin-bottom: 16px !important;
  }
`;

export const StyledInput = styled(Input)`
  margin-bottom: 10px;
  margin-top: 10px;
  color: #9797a7;
  margin-left: 15px;

  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #c8c8c8 !important;
  border-radius: 0;
  width: 100%;
  box-shadow: none !important;
  background: none;
`;

export const InputLabel = styled(Label)`
  margin-top: 15px;
  margin-left: 30px;
  color: #9797a7;
`;

export const FormNumberInput = styled(NumberInput)`
  border: 1px solid #9797a7;

  margin-top: 10px;
  margin-bottom: 10px;

  color: #9797a7;
  margin-left: 15px;

  // color: ${ThemeColor.STEEL_GRAY};
  // padding: 0 0 5px 0;

  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
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

export const SubHeading2 = styled.p`
  color: #b1b1bd;

  margin-left: 30px;
`;

export const LButton = styled(Button)`
  text-align: center;
  // display: flex;
  // flex-direction: row;
  cursor: pointer;
  // justify-content: center;
  float: right;
  // align-items: center;
  // margin-left: 15rem;
  border: 1px solid ${ThemeColor.MYSTIC};

  background-color: #23cdfc;
  // font-size: 20px;

  // color: #ffffff;
  // border-radius: 3px;
  // width: 5rem;
  // height: 3.5rem;
`;
