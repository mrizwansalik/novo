import ColNoSpacing from "src/components/ColNoSpacing";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const TitleSection = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 32px;
  margin-bottom: 30px;

  padding-left: 20px;
  padding-right: 20px;

  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #f7f7f7;
`;

export const TableLabel = styled.div`
  display: flex;
  align-items: center;

  ${breakpoints("flex-direction", [
    {
      xl: "row",
    },
    {
      lg: "row",
    },
    {
      md: "column",
    },
    {
      sm: "column",
    },
    {
      xs: "column",
    },
  ])}

  & > div:not(:last-child) {
    margin-right: 10px;
  }
`;
