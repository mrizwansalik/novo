import { Input, Label } from "reactstrap";
import Icon from "src/components/Icon";

import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  background-color: #f5f9fc;
  height: 100%;
  width: 100%;
  position: fixed;

  top: 0;
  overflow-x: hidden;
`;

export const LButton = styled.div`
display: flex;
flex-direction: row;
cursor: pointer;
margin-left: 5px;
text-align:center
border: 1px solid ${ThemeColor.MYSTIC};
align-items: center;
padding: 14px;
background-color: #23cdfc;
font-size: 22px;
border-bottom: 2px solid black;
color: #ffffff;
border-radius: 5px;
width: 60%;
height: 4rem;
`;

export const RighttArrow = styled(Icon)`
  cursor: pointer;
  margin-right: 12px;
  img {
    width: 18px;
    margin-right: 12px;

    height: 18px;
    transform: scaleX(-1);
  }
`;

export const LogoSection = styled.img`
width: 26px;
height: 19px;
margin-top: 10px;
margin-left: 5px; !important
`;

export const StyledInput = styled(Input)`
  margin-bottom: 25px;
  margin-right: 20px;
  line-height: 24px;
  color: #9797a7;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #c8c8c8 !important;
  border-radius: 0;
  width: 100%;
  box-shadow: none !important;
  background-color: #f5f9fc;
  background: none;
`;

export const Styledlabel = styled(Label)`
  font-size: 22px;
  line-height: 14px;
  padding-left: 1rem;
  margin-bottom: 2rem;
  color: #9797a7;
`;
