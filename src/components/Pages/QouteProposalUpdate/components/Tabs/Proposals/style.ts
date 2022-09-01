import Button from "src/components/Button";
import Icon from "src/components/Icon";
import InputCheckbox from "src/components/InputCheckbox";
import InputGroup from "src/components/InputGroup";
import SingleSelect from "src/components/SingleSelect";
import { ThemeColor, device } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  padding: 25px;
  height: 100%;
  width: 100%;
`;
export const TableActionContainer = styled.div`
  // display: flex;
  // justify-content: space-between;
  // margin: 16px;
  webkit-box-align: center;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 24px;
  color: #212135;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
export const TableTitle = styled.div`
  color: ${ThemeColor.RIVER_BED};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;
export const DeleteButton = styled(Icon)`
  cursor: pointer;
`;
export const DocumentTypeSelect = styled(SingleSelect)``;
export const DownloadButton = styled(Icon)`
  cursor: pointer;
  margin-right: 2%;
`;
export const EditButton = styled(Icon)`
  margin-left: 12px;
  cursor: pointer;
`;
export const DocumentNameItem = styled.div`
  display: flex;
  flex-direction: row;
`;

export const EditNameContainer = styled.div``;
export const EditNameInput = styled(InputGroup)`
  margin-bottom: 16px;
`;
export const UpdateButton = styled(Button)`
  margin-right: 15px;
  color: #0097f5;
  font-size: 14px;
  font-weight: 300;
  line-height: 21px;
  :hover {
    color: #0097f5;
    background-color: #afe7f8;
    border-color: #afe7f8;
  }
  background-color: #def5fc;
  border-color: #def5fc;
`;
export const CancelButton = styled(Button)`
  background-color: #ffffff;
  border: 1px solid #e3e9ec;
  color: #728490;
  font-weight: 500;
  :hover {
    color: #728490;
    border: 1px solid #e3e9ec;
    background-color: #e6e6e6;
  }
`;

export const TableContainer = styled.div`
  max-width: 100%;
  height: 100%;
  overflow-y: visible;
  overflow-x: scroll;
`;

export const Table = styled.table`
  width: 100%;
  margin-bottom: 35px;
  border: 1px solid ${ThemeColor.BORDER_COLOR};
`;

export const UploadDateAndDownloadComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
`;

export const Checkbox = styled(InputCheckbox)`
  width: 20px;
  display: inline;
  margin-right: 5px;
  label {
    display: none;
  }
`;

export const TableHead = styled.thead`
  background-color: ${ThemeColor.BLACK_SQUEEZE};
  border-bottom: 1px solid ${ThemeColor.BORDER_COLOR};
  display: table-header-group !important;
`;

export const TableHeadRow = styled.tr`
  margin: 0 !important;
  padding: 0;
`;

export const TableHeadContent = styled.th`
  font-size: 18px;
  line-height: 21px;
  font-weight: 300;
  color: ${ThemeColor.RIVER_BED};
  padding: 24px;
  align-self: center;
  min-width: 200px;
`;

export const TableBody = styled.tbody`
  border-collapse: collapse;
`;

export const TableBodyRow = styled.tr`
  margin: 0;
  border-bottom: 1px solid #e3e9ec;
  padding: 0;

  @media only screen and (${device.tablet}) {
    padding: 15px 0;
  }
`;

export const TableBodyContent = styled.td`
  font-size: 16px;
  line-height: 24px;
  font-weight: 300;
  color: ${ThemeColor.STEEL_GRAY};
  padding: 24px !important;
  align-self: center;
  min-width: 200px;
`;

export const DocumentName = styled.div``;

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

export const EmptyTableRow = styled.td`
  padding: 24px 5px 32px 30px;
  color: #4b565e;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
`;
