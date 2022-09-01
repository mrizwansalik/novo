import { Row, Input, Button } from "reactstrap";
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

export const Container = styled.div`
  padding-top: 40px;
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 15px;
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

export const StyledInput = styled(Input)`
  margin-bottom: 25px;
  padding: 24px;
  margin-left: 34px;

  height: 36px;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  // padding: 0 0 5px 0;

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
  margin-left: 2rem;
`;

export const MiniHeading = styled.p`
  font-size: 15px;
  // padding: 30px;
  color: #b1b1bd;
  margin-left: 2rem;
  margin-top: 15px;
`;

export const SubHeading = styled.div`
  margin-top: 13px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #b1b1bd;
  widht: 80%;
  margin-left: 30px;
  margin-top: 15px;
  margin-bottom: 20px;
`;

export const LButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  margin-left: 2rem;

  border: 1px solid ${ThemeColor.MYSTIC};
  align-items: center;
  // padding: -2px 12px;
  background-color: #23cdfc;
  font-size: 20px;
  // width: 11rem;
  color: #ffffff;
  border-radius: 5px;
`;

export const LogoSection = styled.img`
  // margin-top: 1rem;

  width: 25px;
  height: 19px;
}
`;

export const Border = styled.div`
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #c8c8c8 !important;
  border-radius: 0;
  width: 100%;
  margin-left: 2rem;
  margin-top: 12px;
  margin-bottom: 12px;
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
