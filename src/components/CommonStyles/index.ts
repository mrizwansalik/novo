import styled from "styled-components";

export const MarginLeft = styled.div<{ size: number }>`
  margin-left: ${(props) => props?.size}px;
  padding-left: 0;
  padding-right: 0;
`;

export const MarginRight = styled.div<{ size: number }>`
  margin-right: ${(props) => props?.size}px;
  padding-left: 0;
  padding-right: 0;
`;

export const MarginTop = styled.div<{ size: number }>`
  margin-top: ${(props) => props?.size}px;
  padding-left: 0;
  padding-right: 0;
`;

export const MarginBottom = styled.div<{ size: number }>`
  margin-bottom: ${(props) => props?.size}px;
  padding-left: 0;
  padding-right: 0;
`;
