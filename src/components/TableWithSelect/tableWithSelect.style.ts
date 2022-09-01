import { device, ThemeColor } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  > div {
    max-width: 100%;
    overflow-x: scroll;
    min-height: 70vh;
    clear: both;
  }

  table {
    border: 1px solid ${ThemeColor.BORDER_COLOR};
    border-bottom: none;

    thead {
      background-color: ${ThemeColor.BLACK_SQUEEZE};
      border-bottom: 1px solid ${ThemeColor.BORDER_COLOR};
      display: table-header-group !important;

      tr {
        margin: 0 !important;
        padding: 0;

        th {
          font-size: 18px;
          line-height: 21px;
          font-weight: 300;
          color: ${ThemeColor.RIVER_BED};
          padding: 24px;
          align-self: center;
        }
      }
    }

    tbody {
      border-collapse: collapse;

      tr {
        margin: 0;
        border-bottom: 1px solid #e3e9ec;
        padding: 0;

        td {
          font-size: 16px;
          line-height: 24px;
          font-weight: 300;
          color: ${ThemeColor.STEEL_GRAY};
          padding: 24px !important;
          align-self: center;
        }
      }

      @media only screen and (${device.tablet}) {
        tr {
          padding: 15px 0;
        }
      }
    }
  }
`;
