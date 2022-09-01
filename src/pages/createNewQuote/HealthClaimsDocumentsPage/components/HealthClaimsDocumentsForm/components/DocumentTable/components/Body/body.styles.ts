import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const NameContent = styled.td`
  width: 35%;

  span {
    margin-left: 4px;
  }

  img {
    height: 24px;
    width: 24px;
  }
`;

export const EmptyTable = styled.div`
  padding: 24px 16px;
  color: ${ThemeColor.RIVER_BED};
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
`;
