import { Link } from "react-router-dom";
import { device, ThemeColor } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  display: flex;
  padding: 4px 10px 0 10px;
  background: ${ThemeColor.STEEL_GRAY};
  color: white;
  font-size: 0;
  line-height: 0;

  @media only screen and (${device.mobile}) {
    flex-wrap: wrap;
  }
`;

export const GodButton = styled.div`
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 10px 16px;
  background: #ecf0f4;
  color: #6d8491;
  font-size: 16px;
  line-height: 18px;
  font-weight: 500;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const HeaderItem = styled(Link)<{ isActive?: boolean }>`
  padding: 10px 16px 7px 16px;
  margin-bottom: 4px;
  font-size: 16px;
  line-height: 18px;
  font-weight: 500;
  text-decoration: none;
  color: ${ThemeColor.WHITE_COLOR};
  border-bottom: ${(props) => (props.isActive ? " 3px solid white" : "none")};

  :hover {
    color: #e1e9ec;
  }

  @media only screen and (${device.mobile}) {
    width: 33%;
    text-align: center;
  }
`;
