import { Col } from "reactstrap";
import InputGroup from "src/components/InputGroup";
import { device } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  padding: 10px;
  margin-top: 24px;
  margin-bottom: 20px;
  position: relative;
  background: #e8edf2;
  border-radius: 5px;
  font-size: 14px;
  line-height: 22px;

  div {
    align-items: center;
  }
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
  @media only screen and (${device.mobile}) {
    margin-bottom: 8px;
  }
  @media only screen and (${device.tablet}) {
    margin-bottom: 8px;
  }
  @media only screen and (${device.desktop}) {
    margin-bottom: 0;
  }
`;

export const SearchInput = styled(InputGroup)`
  input {
    font-family: "MuseoSans";
    font-size: 14px;
    line-height: 22px;
  }
`;

export const ActionButton = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 6px 12px;
  border: 1px solid #e1e9ec;
  border-radius: 3px;
  background: #fff;
  color: #6d8491;
  font-weight: 500;
  margin-right: 2px;
  cursor: pointer;

  img {
    width: 12px;
    height: 12px;
    margin-right: 8px;
  }

  :hover {
    background: #e1e9ec;
    border-color: #ffffff;
    text-decoration: none;
  }
`;
