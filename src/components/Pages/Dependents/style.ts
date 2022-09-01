import { Row, Button, Label } from "reactstrap";
import Icon from "src/components/Icon";
import NumberInput from "src/components/NumberInput";
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
  min-height: 100vh;
  width: 100%;
  overflow-y: scroll;
`;

export const InputCard = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  margin-bottom: 2rem;
  height: max-content;
  color: #2e2e41;
  background-color: white;
  border: 1px solid #9797a7;
  border-radius: 5px;

  @media only screen and (min-width: 728px) {
    width: 80%;
  }
`;

export const StyledInput = styled(Label)`
  margin-top: 10px;
  margin-bottom: 10px;

  color: #9797a7;
  margin-left: 30px;

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
export const DataRow = styled.div``;

export const Paragraph = styled.p`
  font-size: 12px;
`;

export const MainHeading = styled.p`
  font-size: 2rem;
  margin-top: 25px;
  margin-bottom: 2rem;
  margin-left: 10px;
  // padding: 30px;
`;

export const SubHeading = styled.p`
  color: #b1b1bd;
  margin-top: 30px;
  margin-left: 30px;
`;

export const LButton = styled(Button)`

  border: 1px solid ${ThemeColor.MYSTIC};

  text-align:center
  padding: 0px;
  background-color: #23cdfc;
  font-size: 15px;
  margin: auto;
// margin-top:15px;
  color: #ffffff;
  border-radius: 3px;
  width: max-content;
  height: 3rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`;

export const RemoveIcon = styled(Icon)`
  img {
    cursor: pointer;
    margin-left: 12px;
    margin-top: 15px;
    width: 24px;
    height: 24px;
  }
  margin-bottom: 16px;
`;

export const EditIcon = styled(Icon)`
  img {
    cursor: pointer;
    margin-left: 0px;
    margin-top: 15px;

    width: 24px;
    height: 24px;
  }
  margin-bottom: 16px;
`;

export const SubHeading2 = styled.div`
  margin-bottom: 15px;
  margin-top: 12px;
  margin-left: rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const ActionButtonsContainer = styled(Row)`
  // display: inline-block;

  display: flex;
  flex-direction: row;
  margin-top: 15px;
  // padding-right: 10px;
  // padding-left: 10px;
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
