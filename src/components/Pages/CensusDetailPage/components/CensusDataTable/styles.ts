import TableWithSelect from "src/components/TableWithSelect";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  margin: 0;
`;

export const PageTitle = styled.div`
  width: 100%;
  min-height: 71px;
  background-color: #f5f5f5;
  padding: 22px;

  > div {
    width: 100%;
    max-width: 1357px;
    margin: auto;
    box-sizing: border-box;
    padding: 0 15px;

    h1 {
      font-size: 24px;
      line-height: 27px;
      margin-bottom: 0;
      color: ${ThemeColor.STEEL_GRAY};
      font-weight: 700;
    }
  }
`;

export const TableContainer = styled.div`
  padding: 0 22px 40px 0;

  > div {
    width: 100%;
    max-width: 1357px;
    margin: auto;
    box-sizing: border-box;
    padding: 0 15px;
  }
`;

export const DataTable = styled(TableWithSelect)``;
