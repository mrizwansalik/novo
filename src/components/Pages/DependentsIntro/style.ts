import { Row, Input, Button } from "reactstrap";
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
  // padding-bottom: 15%;
  background-color: #f5f9fc;
  overflow-y: hidden;
  height: 100vh;
  width: auto;
`;

export const InputCard = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;

  height: max-content;
  color: #2e2e41;
  background-color: white;

  border: 1px solid #b1b1bd;

  border-radius: 5px;

  @media only screen and (min-width: 728px) {
    width: 80%;
  }
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

export const Paragraph = styled.p`
  font-size: 12px;
`;

export const MainHeading = styled.p`
font-size: 15px;
color: #b1b1bd;
margin-left: 2rem;
margin-top: 15px;
}
`;

export const SubHeading = styled.p`
  font-size: 15px;

  color: #b1b1bd;
  margin-top: 30px;
  margin-left: 30px;
`;

export const SubHeading2 = styled.div`
  margin-bottom: 15px;
  margin-left: 2rem;
  margin-bottom: 15px;
  font-size: 2.25rem;
`;
export const LButton = styled(Button)`

  border: 1px solid ${ThemeColor.MYSTIC};

  text-align:center
  padding: -2px 12px;
  background-color: #23cdfc;
  font-size: 20px;

  color: #ffffff;
  border-radius: 3px;
  width: 10rem;
  height: 3rem;
`;

export const SubButton = styled.div`
  margin-bottom: 15px;
  margin-top: 12px;
  margin-left: rem;
  &:hover {
    text-decoration: underline;
  }
`;
export const ActionButtonsContainer = styled(Row)`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
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
