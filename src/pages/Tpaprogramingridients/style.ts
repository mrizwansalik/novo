import { Col, Row, DropdownToggle, Button } from "reactstrap";

import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Head = styled.h1`
  margin-bottom: 25px;
  font-size: 44px;
  line-height: 54px;
  font-weight: 300;
`;

export const MainContent = styled.div`
  width: 100%;
  height: 100%;
  // height: 100vh;
`;

export const ActionSheetLayout = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${ThemeColor.MYSTIC};
  border-radius: 3px;
  padding: 15px;
  margin-bottom: 5rem;
`;

export const EditButton2 = styled(DropdownToggle)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 36px;
  padding-left: 0px;
  padding-right: 0px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColor.EUCALYPTUS};
`;

export const AddLabel = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: white;
`;

// export const AddIcon = styled(Icon)`
//   width: fit-content;
//   // margin-right: 6px;

//   img {
//     width: 26px;
//     height: 26px;
//     background-color: #4af62a;
//     border-radius: 50px;
//   }
// `;

export const CarrierCount = styled(Col)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
`;

export const CarrierSearch = styled(Col)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
`;

export const TpaFilter = styled(Col)`
  font-size: 12px;
  line-height: 15px;
  font-weight: 200;
`;

export const InputSearch = styled.input`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
  width: 80%;
`;

///////////////////////////////////////////////////////////////////////////////////
export const ButtonSheetLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  back
  border: 1px solid #e0e0e0;
  // padding: 15px;
`;

export const BigPlus = styled(Button)<{ active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 36px;
  padding-left: 0px;
  padding-right: 0px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props?.active ? ThemeColor.SHAMROCK : ThemeColor.SLATE_GRAY};
  color: ${ThemeColor.WHITE_COLOR};
  align-self: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props?.active ? ThemeColor.EUCALYPTUS : ThemeColor.SLATE_GRAY};
    color: ${ThemeColor.WHITE_COLOR};
  }
`;

export const LButton = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  margin-top: 10px;
  border: 1px solid ${ThemeColor.MYSTIC};
  align-items: center;
  padding: 2px 12px;
  background-color: #23cdfc;

  color: black;
  border-radius: 3px;
  width: fit-content;
`;

export const AddIcon = styled(Icon)`
  width: fit-content;
  margin-right: 6px;

  img {
    width: 12px;
    height: 12px;
  }
`;

export const EditButton = styled(Icon)`
  margin-left: 20rem;
  cursor: pointer;
  padding: 5px;
  margin-top: "5px";
`;

export const AddButton = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  border: 1px solid ${ThemeColor.MYSTIC};
  align-items: center;
  width:9rem
  padding: 2px 12px;
  background-color: ${ThemeColor.WHITE_COLOR};
  border-radius: 50px;
  width: fit-content;

`;
export const ListSheetLayout = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center
  align-items: center;
  background-color: ${ThemeColor.BLACK_SQUEEZE};
  margin: auto;
  float: right;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  // padding: 15px;
`;

export const SubHead = styled.h3`
  font-size: 12px;
  line-height: 54px;
  font-weight: 30;
  color: black;
`;
///////////////////////////tooltipp////////////////////////////////////////////////
export const menu = styled.div`
  background: #ffffff;
  // border-radius: 8px;
  position: absolute;
  top: 60px;
  right: 0;
  width: 300px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
`;
