import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  &:not(:last-child) {
    padding-bottom: 8px;
  }
`;

export const SmallDot = styled.div<{ dotColor: string }>`
  background-color: ${(props) => props.dotColor};
  width: 7.5px;
  height: 7.5px;
  border-radius: 50%;
`;

export const PieTitle = styled.div`
  color: #8d959c;
  padding-left: 8px;
  padding-right: 8px;
`;

export const PieValue = styled.div`
  color: #212135;
`;
