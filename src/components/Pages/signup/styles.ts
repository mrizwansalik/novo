import { Row } from "reactstrap";

import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  background-color: ${ThemeColor.TWILIGHT_BLUE};
  height: 100%;
  width: 100%;
  top: 0;
  overflow-x: hidden;
  margin-bottom: 0px;
`;
export const LogoSection = styled.img`
  width: 26px;
  height: 19px;
  margin-top: 10px;
  margin-left: 5px; !important
`;

export const CardFont = styled.div`
  font-size: 12px;
`;
export const Card = styled.div`
  width: 80%;
  height: max-content;
  color: #2e2e41;
  margin-top: 10rem;
  margin-left: 3rem;
  margin-bottom: 3rem;
  background-color: white;
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 35%);
  border-radius: 5px;

  padding: 24px;
`;

export const Headinghello = styled.div`
  widht: 10rem;
  margin-top: 10rem;
  margin-bottom: 100px;
`;

export const Hello = styled.div`
  display: inline;
  font-size: 43px;
  float: left;
  margin-left: -18px;
`;

export const SubHeading = styled.div`
  margin-left: 10px;
  fontsize: 20px;
  color: #2e2e41;
`;

export const BuutonHeading = styled(Row)`
  // margin-left: 5rem;
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
  width: 55%;
  height: 4rem;
`;

export const RighttArrow = styled.image`
  cursor: pointer;
  margin-right: 12px;
  img {
    width: 18px;
    margin-right: 12px;

    height: 18px;
    transform: scaleX(-1);
  }
`;

export const Bottomsignin = styled(Row)`
  margin-top: 10px;
  color: black;
  font-size: 14px;
  color: #212135;
  padding: 3px;
`;

export const Bottompgrah = styled(Row)`
  color: #7070a1;
  margin-top: 20px;
  font-size: 11px;
`;
