import { Col } from "reactstrap";

import InputGroup from "src/components/InputGroup";
import SingleSelect from "src/components/SingleSelect";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

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
`;
export const Circle = styled.i`
  float: right;
  cursor: pointer;
  background-image: url(${process.env
    .PUBLIC_URL}/assets/icons/xCircle64px-red.png);
  display: inline-block;
  padding: 50px;
  margin: 0 4px;
  width: 14px;
  height: 14px;
  overflow: hidden;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: text-top; // looks best when eyeballed
`;

export const FormDropdown = styled(SingleSelect)`
  margin-bottom: 15px !important;
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
    color: red;
  }
`;

export const BigPlus = styled.div<{ active: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 10px;
  padding-left: 0px;

  padding-right: 0px;
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

export const ACircle = styled.i`
  marginleft: auto;
  marginright: auto;
  float: center;
  cursor: pointer;
  background-image: url(${process.env
    .PUBLIC_URL}/assets/icons/xCircle64px-red.png);
  display: inline-block;
  padding: 50px;
  margin: 0 4px;
  width: 14px;
  height: 14px;
  overflow: hidden;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: text-top; // looks best when eyeballed
`;

export const Container = styled.div`
  // background-color: ${ThemeColor.TWILIGHT_BLUE};
  margin: 2% 10% 10%;

  display: flex;
  justify-content: center;
`;
export const CB = styled(Col)`
  margin-top: 4rem;
  font-size: 13px;

  // padding-left: 20px;
`;

export const CBC = styled(Col)`
  // margin-top: 4rem;
  font-size: 13px;
  margin: auto;
  // padding-left: 20px;
`;
export const CCb = styled(Col)`
  margin-top: 4rem;

  margin-left: -2rem;

  font-size: 13px;

  padding-left: 24px;
`;

export const Del = styled.div`
  display: flex;
  justify-content: right;
`;

export const CCcb = styled(Col)`
  margin-top: 4rem;
  margin-left: 0rem;
  padding-left: 24px;
  font-size: 13px;
`;

export const Ab = styled(Col)`
  margin-left: 14rem;
  margin-top: -3rem;

  // padding-left: 24px;
  //
`;

export const Ccircle = styled.i`
  float: right;
  cursor: pointer;
  background-image: url(${process.env
    .PUBLIC_URL}/assets/icons/xCircle64px-red.png);
  display: inline-block;
  padding: 50px;
  margin: 0 4px;
  width: 14px;
  height: 14px;
  overflow: hidden;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: text-top; // looks best when eyeballed
`;

export const Styledcol = styled(Col)<{ isFlex?: boolean }>`
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
`;
export const StyledInput = styled(InputGroup)`
  margin-bottom: 25px;
  margin-left: 1rem;

  label {
    margin-bottom: 16px;
  }

  input {
    height: 36px;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: ${ThemeColor.STEEL_GRAY};
    padding: 0 0 5px 0;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid #c8c8c8 !important;
    border-radius: 0;
    width: 100%;
    box-shadow: none !important;
    background: none;
  }
`;

// export const AddBrokerageFormWrapper = styled.div`
//   width: 700px;
//   height: max-content;
//   background-color: white;
//   box-sizing: border-box;
//   box-shadow: 0 1px 6px 0 rgb(0 0 0 / 35%);
//   border-radius: 5px;
//   position: relative;
//   padding: 24px;
//   margin-left: 16px;
//   margin-right: 16px;
//   margin-top: 25px;

//   @media (min-width: 768px) {
//     padding: 40px 120px;
//     margin: 50px auto 0 auto;
//   }
// `;

export const Label = styled(Col)`
  font-size: 12px;
  line-height: 14px;

  // display: flex;
  // justify-content: center;
  padding-left: 0rem;
  // letter-spacing: 3px;
  color: ${ThemeColor.SLATE_GRAY};
`;

export const SubLabel = styled(Col)`
  font-size: 8px;
  line-height: 14px;

  // display: flex;
  // justify-content: center;
  padding-left: 0rem;
  margin-bottom: 2rem;
  // letter-spacing: 3px;
  color: ${ThemeColor.SLATE_GRAY};
`;

export const SSLabel = styled(Col)`
  font-size: 12px;
  line-height: 14px;

  display: flex;
  justify-content: center;
  padding-left: 0rem;
  margin-bottom: 2rem;
  // letter-spacing: 3px;
  color: ${ThemeColor.SLATE_GRAY};
`;
export const SLabel = styled.div`
  font-size: 10px;
  line-height: 14px;

  padding-left: 0rem;
  margin-bottom: 10px;
  // letter-spacing: 3px;
  color: ${ThemeColor.SLATE_GRAY};
`;

export const Added = styled.div`
  margin-left: -2rem;
`;

export const Logo = styled.div`
  // margin-left: 6rem;
`;

export const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
`;

export const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #9797a7;
  // margin-bottom: 4px;
`;

export const Bottom = styled.div`
  margin-left: 0rem;
margin-top:2rem;
display: grid;
grid-templatre-column;

`;

export const Save = styled.div`
  // margin-left: 14rem;
  margin-top: 3rem;
`;

export const Check = styled.div`
  margin-left: 14rem;
  margin-top: 3rem;
  display: inline;
`;
export const StyledButton = styled.button`
  font-size: 18px;
  font-weight: 500;
  background: none;
  color: inherit;
  border: none;
  margin: 15px 0;
  cursor: pointer;
  outline: inherit;
  &:focus {
    border-bottom: 3px solid #0097f5;
  }
`;

export const CommonTextarea = styled.textarea`
  border-color: transparent;
  border-radius: 0px;
  padding-right: 0px;
  padding-left: 0px;

  border-radius: 3px;
  width: 100%;
  background-color: #f7f7f7;
  min-height: 66px;
  padding: 10px 15px;

  border-bottom: 1px solid #ebebeb !important;
  border-right: 1px solid #ebebeb !important;
  border-left: 1px solid #ebebeb !important;
  border-top: 1px solid ${ThemeColor.MANATEE} !important;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
`;
