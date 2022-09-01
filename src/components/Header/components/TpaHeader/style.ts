import Icon from "src/components/Icon";
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

export const LeftArrow = styled(Icon)`
  cursor: pointer;
  margin-right: 12px;
  margin-left: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
  img {
    width: 18px;
    height: 18px;
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

export const HeaderItem = styled.div`
  padding: 10px 16px 7px 16px;
  margin-bottom: 4px;
  font-size: 16px;
  line-height: 18px;
  font-weight: 500;
  text-decoration: none;
  color: ${ThemeColor.WHITE_COLOR};
  cursor: pointer;

  :hover {
    color: #e1e9ec;
  }

  @media only screen and (${device.mobile}) {
    width: 33%;
    text-align: center;
  }
`;
