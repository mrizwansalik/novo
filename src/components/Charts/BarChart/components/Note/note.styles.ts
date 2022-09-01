import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
`;

export const SmallDot = styled.div<{ dotColor: string }>`
  background-color: ${(props) => props.dotColor};
  width: 7.5px;
  height: 7.5px;
  border-radius: 50%;
`;

export const BarTitle = styled.div`
  color: #8d959c;
  padding-left: 8px;
  padding-right: 2px;
  font-size: 14px;
  font-weight: 200;
`;

export const BarValue = styled.div`
  color: #8d959c;
  padding-right: 8px;
  font-size: 14px;
  font-weight: 200;
`;
