import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Label = styled.div<{ underlineColor: string }>`
  width: fit-content;

  span {
    color: #909096;
    font-weight: 500;
    font-size: 16px;

    &:after {
      background-color: ${(props) => props?.underlineColor};
      content: ".";
      border-radius: 3px;
      height: 6px;
      width: 60px;
      color: transparent;
      overflow: hidden;
      margin-top: 10px;
      display: block;
      font-size: 16px;
    }
  }
`;

export const List = styled.div`
  margin-left: 8px;
`;
