import styled from "styled-components";
import Table from "../../components/Table";
import { ThemeColor } from "../../constants";

export const PageLayout = styled.div`
  min-height: 100vh;
  background-color: ${ThemeColor.BLACK_SQUEEZE};
`;

export const PageContainer = styled.div`
  max-width: 1357px;
  padding: 0 15px;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  position: relative;
  background-color: transparent;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${ThemeColor.BLACK_SQUEEZE};
`;

export const ProspectTable = styled(Table)`
  table {
    thead {
      th {
        padding: 0 15px !important;
      }
    }

    tbody {
      tr {
        padding: 15px 0;
      }
      td {
        padding: 15px !important;
      }
    }
  }
`;

export const ProspectName = styled.div`
  display: flex;

  img {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }
`;

export const AdvisorLink = styled.a<{ isBold?: boolean }>`
  text-transform: capitalize;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 32px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: ${(props) => (props.isBold ? 700 : 300)};

  :hover {
    text-decoration: underline;
  }
`;

export const GrayText = styled.div`
  display: flex;
  align-items: center;
  color: ${ThemeColor.MANATEE};
`;
