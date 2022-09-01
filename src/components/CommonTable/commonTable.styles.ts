import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled.div`
  padding-left: 0px;
  padding-right: 0px;

  table {
    border: 1px solid ${ThemeColor.SILVER};
    border-radius: 3px;

    thead {
      ${breakpoints("display", [
        {
          xl: "block !important",
        },
        {
          lg: "block !important",
        },
        {
          md: "block !important",
        },
        {
          sm: "none !important",
        },
        {
          xs: "none !important",
        },
      ])}

      tr {
        padding: 21px 15px;
        background-color: ${ThemeColor.BLACK_SQUEEZE};
        border-bottom: 1px solid ${ThemeColor.SILVER};
        margin-bottom: 0px;

        th {
          padding-left: 0px;
          padding-right: 0px;
          color: ${ThemeColor.RIVER_BED};
          line-height: 21px;
          font-size: 16px;
          font-family: "MuseoSans";
          font-weight: 300;
        }
      }
    }

    tbody {
      tr {
        margin-bottom: 0px;
        border-radius: 0px;

        &:not(:last-child) {
          border-bottom: 1px solid ${ThemeColor.MYSTIC};
        }

        td {
          color: ${ThemeColor.STEEL_GRAY};
          font-size: 16px;
          line-height: 24px;
          font-weight: 300;
          font-family: "MuseoSans";
        }
      }
    }
  }
`;
