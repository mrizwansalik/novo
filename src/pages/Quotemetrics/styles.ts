import { Col, Row } from "reactstrap";

import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const ContainerMain = styled.div`
  background-color: ${ThemeColor.TWILIGHT_BLUE};
  display: flex;
  flex-direction: column;
  box-sizing: borderbox;
  overflow: hidden;
  margin: auto;
`;
export const Main = styled.div`
  display: flex;
  content: center;
  flex-direction: column;

  align-items: center;
`;
// export const FeaturedWraper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-left: 6rem;
`;

export const TopSheetTitle = styled.h1`
  margin-bottom: 25px;
  margin-bottom: 6rem;

  font-size: 44px;
  line-height: 54px;
  font-weight: 300;
  // padding-left: 18rem;
`;
export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: -20px;
`;
export const SlectionOption = styled.div`
  display: flex;
  justify-content: left;
`;
export const GetContainer = styled.div`
  display: flex;
  justify-content: left;
  padding: 0 20px 0 0;
  //
`;

// export const ActionSheetContainer = styled(Row)`
//   margin-top: 24px;
//   margin-bottom: 24px;
// `;

// export const ActionSheetLayout = styled(Col)`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   background-color: ${ThemeColor.MYSTIC};
//   border-radius: 3px;
//   padding: 15px;
// `;

export const TopSheetsubtitle = styled.div`
  margin-bottom: 25px;
  font-size: 44px;
  line-height: 54px;
  font-weight: 300;
  // padding-left: 18rem;
  height: 4rem;
`;

export const CsvButton = styled(Col)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
  margin: auto;
  padding-left: 24px;
  padding-right: 24px;
  border: 1px solid ${ThemeColor.MYSTIC};
  background-color: ${ThemeColor.WHITE_COLOR};
  border-radius: 3px;

  &:hover {
    background-color: ${ThemeColor.MYSTIC};
    border: 1px solid ${ThemeColor.WHITE_COLOR};
  }
`;

export const Sublabel = styled.link`
  color: ${ThemeColor.TWILIGHT_BLUE};
`;

export const Subsheet = styled(Col)`
  padding-right: 24px;

display grid;
grid-templatre-column;

  // padding-left: 20rem;
  margin-top: 10px;
  margin-bottom: 24px;
`;

export const ActionSheetLayout = styled.div`
  align-items: center;

  background-color: ${ThemeColor.MYSTIC};
  border-radius: 3px;
  padding: 15px;
`;

export const Monthlycsv = styled.div`


  float:left;
  margin: 10px;
  border: 1px solid: ${ThemeColor.MYSTIC};
  background-color: ${ThemeColor.WHITE_COLOR};
  border-radius: 3px;

  &:hover {
    background-color: ${ThemeColor.MYSTIC};
    border: 1px solid ${ThemeColor.WHITE_COLOR};
  }
`;

export const Getmetrics = styled.div`
width: 100%;
  border: 1px solid: ${ThemeColor.MYSTIC};
  background-color: ${ThemeColor.WHITE_COLOR};
  border-radius: 3px;
  &:hover {
    background-color: ${ThemeColor.MYSTIC};
    border: 1px solid ${ThemeColor.WHITE_COLOR};
  }
`;

export const Label = styled.div`
  font-size: 15px;
  line-height: 14px;
  // padding-left: 18rem;
  margin: 4px;
  // letter-spacing: 3px;
  color: ${ThemeColor.SLATE_GRAY};
`;
export const CsvLabel = styled.div`
  width: 100%;
  font-size: 15px;
  line-height: 14px;
  padding: 15px;
  color: ${ThemeColor.SLATE_GRAY};
`;

export const AddLabel = styled.div`
  font-size: 18px;
  line-height: 14px;
  color: ${ThemeColor.BLACK_COLOR};
`;
export const ASContainer = styled(Row)`
  // padding-right: 24px;
  // padding-left: 20rem;
  margin-top: 3rem;
  margin-bottom: 24px;
`;

export const OPContainer = styled(Row)`
  margin-top: 1rem;
`;

export const OPsheetlayout = styled(Col)`
  display: flex;
  justify-content: flex-start;
  // align-items: center;
  background-color: ${ThemeColor.MYSTIC};
  border-radius: 3px;
  padding: 15px;
  // export const input = styled.input;
`;
export const Tpaoption = styled(Col)`
  font-size: 12px;
  line-height: 15px;
  font-weight: 200;
  margining-left: 20rem;
`;

export const BrokerOption = styled(Col)`
  font-size: 18px;
  line-height: 22px;
  font-weight: 300;
  padding-top: 10px;
`;

///////////////////////////////////////////////Date/////////////////////////////////////////////
export const ActionSheetContainer = styled(Row)`
dispaly:flex:start;
justify-content:;
  padding-right: 24px;
  // padding-left: 20rem;
  margin-top: 24px;
  margin-bottom: 24px;

  // height: 4rem;
`;
export const SheetLayout = styled(Col)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${ThemeColor.MYSTIC};
  border-radius: 3px;
  padding: 15px;
`;

export const GetMetsheet = styled(Col)`
  font-size: 12px;
  line-height: 15px;
  font-weight: 200;
  margining-left: 20rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DataContainer = styled(Row)`
  padding-right: 24px;
  padding-left: 24px;
  margin-top: 24px;
  background-color: ${ThemeColor.BLACK_COLOR};

  margin-bottom: 24px;
`;

export const ActiveBoxes = styled.div`
  cursor: pointer;
  border: 1px solid ${ThemeColor.MYSTIC};
  margin: auto;
  display: inline-block;
  padding: 12px 12px;
  background-color: ${ThemeColor.WHITE_COLOR};
  border-radius: 3px;
  width: fit-content;
  height: 7rem;
  &:hover {
    background-color: ${ThemeColor.MYSTIC};csv
    border: 1px solid ${ThemeColor.WHITE_COLOR};
  }
`;

export const ApiSheetLayout = styled.div`
  display: flex;
  justify-content: CENTER;
  align-items: center;
  // background-color: ${ThemeColor.MYSTIC};
  border-radius: 3px;
  padding: 20px;
`;

export const ApiSheettitle = styled.h6`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
`;

export const Counter = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 44px;
  // margin: auto;
  line-height: 54px;
  font-weight: 300;
  // margin-left: 3rem;
  text-color: ${ThemeColor.BLACK_COLOR};
`;

export const ABSheetContainer = styled(Row)`
  padding-right: 24px;
  padding-left: 0rem;
  margin-top: 15rem;
  margin-bottom: 24px;
  height: 3rem;
`;

export const select = styled.div`
  height: 3rem;
`;

export const TableSheetContainer = styled.div`
  padding-right: 24px;
  padding-left: 20rem;
  margin-top: 2rem;
  margin-bottom: 24px;
`;

export const TsubSheetLayout = styled(Col)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // background-color: ${ThemeColor.MYSTIC};
  border-radius: 3px;
  padding: 15px;
`;

export const TableContainer = styled.div`
  background-color: ${ThemeColor.BLACK_SQUEEZE};
  //
`;

export const StyledCol = styled(Col)<{ isFlex?: boolean }>`
  display: ${(props) => (props.isFlex ? "flex" : "block")};
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;

  > div:nth-child(2) {
    width: 80%;
  }
  > span {
    margin-right: 8px;
    text-align: center;
  }

  ////////////////////////////////////////////////////////////////////////////////

  // export const AddBrokerageFormWrapper = styled(Row)
`;
//   width: 60rem;
//   height: 5rem;
//   margin-left: 19rem
//   background-color: white;
//   box-sizing: border-box;
//   box-shadow: 0 1px 6px 0 rgb(0 0 0 / 35%);
//   border-radius: 5px;
//   background-color: ${ThemeColor.MYSTIC};

//   // position: relative;
//   // padding: 24px;
//   // margin-left: 16px;
//   // margin-right: 16px;
//   // margin-top: 25px;
//   // display: flex;
//   // flex-direction: column;

//   @media (min-width: 768px) {
//     padding: 40px 120px;
//     margin: 50px auto 0 auto;
//   }
// `;

// export const AllBrokerageSheetLayout = styled(Col)`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   background-color: ${ThemeColor.MYSTIC};
//   border-radius: 3px;
//   padding: 15px;
//   margin-top: 18rem;
//   margin-left: 19em;
// `;
