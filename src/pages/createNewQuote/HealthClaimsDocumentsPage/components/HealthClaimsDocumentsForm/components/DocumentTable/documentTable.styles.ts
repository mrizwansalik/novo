import ColNoSpacing from "src/components/ColNoSpacing";
import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const TableContainer = styled(ColNoSpacing)`
  width: 100%;
  border: 1px solid ${ThemeColor.SILVER};
  border-radius: 3px;

  table {
    margin-bottom: 0px;

    thead {
      background-color: ${ThemeColor.BLACK_SQUEEZE};

      tr {
        th {
          font-size: 16px;
          font-weight: 300;
          padding: 21px 8px;
          padding-left: 16px;
          color: ${ThemeColor.RIVER_BED};
          line-height: 21px;

          min-width: 125px;
          width: fit-content;

          &:first-child {
            min-width: 250px;
          }

          &:last-child {
            min-width: 50px;
          }
        }
      }
    }
    tbody {
      tr {
        &:not(:last-child) {
          border-bottom: 1px solid ${ThemeColor.SILVER};
        }

        td {
          vertical-align: middle;
          font-size: 16px;
          line-height: 24px;
          font-weight: 300;
          padding: 24px 8px;
          padding-left: 16px;

          &:last-child {
            div {
              display: flex;
              justify-content: center;
              img {
                width: 24px;
                height: 24px;
              }
            }
          }
        }
      }
    }
  }
`;

export const TitleSection = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TableLabel = styled.div`
  font-size: 18px;
  line-height: 27px;
  font-weight: 700;
  color: ${ThemeColor.RIVER_BED};
`;

export const RemoveButton = styled(Icon)`
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;
