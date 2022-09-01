import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Title = styled.h3`
  padding: 40px 0 25px 0;
`;

export const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #9797a7;
  margin-bottom: 6px;
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

export const StyledInput = styled.input`
  width: 100%;
  margin: 15px 0px;
  font-weight: 300;
  padding-bottom: 5px;
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: ${ThemeColor.BLACK_SQUEEZE};
  &:focus {
    outline: none;
  }
`;

export const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  margin-right: 10px;
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

export const EditCarrierPageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${ThemeColor.BLACK_SQUEEZE};
`;
