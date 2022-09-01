import styled from "styled-components";
import { device } from "../../constants";
import InputCheckbox from "../InputCheckbox";

export const TableContainer = styled.div`
  table {
    width: 100%;
    margin-bottom: 35px;

    thead {
      @media only screen and (${device.mobile}) {
        display: none;
      }
      @media only screen and (${device.tablet}) {
        display: none;
      }
      @media only screen and (${device.desktop}) {
        display: table-header-group;
      }

      tr {
        text-align: left;
        padding: 5px 0;
        margin-bottom: 15px;
        font-size: 12px;
        line-height: 16px;
        font-weight: 500;
        color: #728490;
      }
      th {
        padding: 0 15px;
      }
    }
    tbody {
      display: block;

      tr {
        display: flex;
        max-width: 100%;
        flex-wrap: wrap;
        margin-bottom: 15px;
        background: #fff;
        border: none;
        border-radius: 5px;
        box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%);
        font-size: 14px;
        line-height: 32px;
      }
      td {
        padding: 15px 4px !important;
      }

      @media only screen and (${device.mobile}) {
        tr {
          display: flex;
          max-width: 100%;
          flex-wrap: wrap;
          padding: 15px 0;
        }
        td {
          padding: 8px 15px 0 !important;
        }
      }

      @media only screen and (${device.tablet}) {
        tr {
          display: flex;
          max-width: 100%;
          flex-wrap: wrap;
          padding: 15px;
        }
        td {
          padding: 12px;
          white-space: pre-wrap;
        }
      }
    }
  }
`;

export const StyledCheckbox = styled(InputCheckbox)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    margin-top: 0;
  }
`;
