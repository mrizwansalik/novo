import { Table } from "reactstrap";
import Button from "src/components/Button";
import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import { device } from "src/constants/deviceSize";
import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const ModalBody = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-family: "MuseoSans";
  h5 {
    color: ${ThemeColor.STEEL_GRAY};
    font-size: 16px;
    line-height: 22px;
    margin: 0px;
    margin-bottom: 17px;
    font-weight: 500;
  }

  h4 {
    color: ${ThemeColor.AZURE_RADIANCE};
    margin: auto;
  }

  > div {
    display: flex;
    justify-content: space-between;
  }

  button {
    max-width: 48%;
    font-weight: 300;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
`;

export const CloseIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  background-color: ${ThemeColor.FOAM};
  position: absolute;
  top: 0;
  right: -45px;
  cursor: pointer;
  img {
    margin-left: 7px;
  }
  @media only screen and (${device.mobile}) {
    top: 5px;
    right: 5px;
  }
`;

export const ActionIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  cursor: pointer;
`;

export const TableHead = styled.thead`
  background-color: ${ThemeColor.BLACK_SQUEEZE};
`;

export const TableHeadRow = styled.tr`
  width: 650px;
`;

export const TableHeadContent = styled.th`
  border-style: none;
  color: ${ThemeColor.RIVER_BED};
  font-size: 18px;
  line-height: 21px;
  font-weight: 300;
  padding: 24px 32px 24px 32px !important;
  :nth-child(2) {
    text-align: center;
  }
`;

export const TableBody = styled.tbody`
  tr:last-child {
    td {
      border-style: none;
    }
  }
`;

export const TableBodyRow = styled.tr`
  border-bottom: 1px solid #e3e9ec;
`;

export const TemplateTable = styled(Table)`
  margin-bottom: 0;
`;
export const TemplateAction = styled.td`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 16px;
  line-height: 24px;
  font-weight: 300;
  padding: 16px 32px 16px 32px !important;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-style: none;
`;

export const TemplateName = styled.td`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 16px;
  line-height: 24px;
  font-weight: 300;
  padding: 16px 32px 16px 32px !important;
  border-style: none;

  @media only screen and (${device.mobile}) {
    width: 300px;
  }
`;

export const AddNewTemplateButton = styled(Button)`
  max-height: 100%;
  max-width: 100% !important;
  background-color: ${ThemeColor.AZURE_RADIANCE};

  :hover {
    background-color: ${ThemeColor.LOCH_MARA};
  }
`;

export const PrimaryButton = styled(Button)`
  max-height: 100%;
  width: 100%;
  background-color: ${ThemeColor.AZURE_RADIANCE};

  :hover {
    background-color: #0078c2;
  }
`;

export const SecondaryButton = styled(Button)`
  max-height: 100%;
  width: 100%;
  background-color: #ffffff;
  color: ${ThemeColor.STEEL_GRAY} !important;

  :hover {
    color: ${ThemeColor.STEEL_GRAY} !important;
    background-color: ${ThemeColor.MERCURY};
  }
`;
