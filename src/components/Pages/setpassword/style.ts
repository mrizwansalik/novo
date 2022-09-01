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

export const LogoSection = styled.img`

  width: 78px;
  height: 40px;
}
`;

export const Container = styled.div`
  padding-top: 40px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #f5f9fc;
  height: 100%;
  min-height: 100vh;
  width: 100%;
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
  margin-left: 5px;

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
  width: 90%;
  box-shadow: none !important;
  background: none;
`;

export const Paragraph = styled.p`
  font-size: 12px;
`;

export const MainHeading = styled.p`
  font-size: 2rem;
  margin-left: 2rem;
  padding: 30px;
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
  font-size: 12px;
  margin-top: 10px;
  justify-content: center;
  padding: 0 51px 0 65px;
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
  border-radius: 5px;

  background-color: #23cdfc;
  // font-size: 20px;

  // color: #ffffff;
  // border-radius: 3px;
  // width: 5rem;
  // height: 3.5rem;
`;
