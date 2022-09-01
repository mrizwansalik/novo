import { Modal, ModalBody, Row, Col, Container } from "reactstrap";
import Button from "src/components/Button";
import Icon from "src/components/Icon";
import SingleSelect from "src/components/SingleSelect";
import { ThemeColor } from "src/constants";
import styled from "styled-components";
interface IQuestionnaireProps {
  isSigned?: boolean;
}
export const StyledModal = styled(Modal)`
  &&& {
    max-width: unset;
    width: 80%;
    max-height: unset;
    height: 100%;
    margin-top: 0px;
    > div {
      padding: 16px 24px;
    }
  }
  position: absolute;
  top: 0;
  right: 0;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const ModalTitle = styled.h1`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 24px;
  line-height: 27px;
  font-weight: 700;
  display: block;
  position: relative;
`;

export const DeleteButton = styled(Button)`
  background-color: ${ThemeColor.WHITE_COLOR};
  color: ${ThemeColor.AZURE_RADIANCE};
  padding: 8px 18px;
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  border-radius: 3px;
  font-size: 14px;
  font-weight: 300;
  line-height: 21px;

  :focus,
  :active {
    background-color: ${ThemeColor.WHITE_COLOR};
    color: ${ThemeColor.AZURE_RADIANCE};
  }
  :hover {
    background-color: ${ThemeColor.MERCURY};
    color: ${ThemeColor.AZURE_RADIANCE};
  }
`;

export const EmployeeName = styled.h2`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 18px;
  line-height: 27px;
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
`;

export const StyledModalBody = styled(ModalBody)`
  padding: 0;
  max-height: unset;
  min-height: 100vh;
`;

export const Email = styled.a`
  color: ${ThemeColor.AZURE_RADIANCE};
  text-decoration: none;
  font-weight: 700;
  :hover {
    color: ${ThemeColor.AZURE_RADIANCE};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const PhoneNumber = styled.div`
  display: inline-block;
  margin-left: 8px;
`;

export const StyledContainer = styled(Container)`
  margin-top: 16px;
  margin-bottom: 20px;
  border: 1px solid ${ThemeColor.BORDER_COLOR};
  border-collapse: collapse;
`;

export const TableHeader = styled(Row)`
  padding: 21px 8px;
  background-color: ${ThemeColor.BLACK_SQUEEZE};
  color: ${ThemeColor.RIVER_BED};
  border-bottom: 1px solid ${ThemeColor.BORDER_COLOR};
`;
export const HeaderContent = styled(Col)`
  font-weight: 300;
  line-height: 21px;
  padding: 0px 15px;
`;
export const TableBodyRow = styled(Row)<IQuestionnaireProps>`
  padding: 24px 5px;
  border-bottom: 1px solid #e3e9ec;
  :hover .download {
    ${(props) => props.isSigned && "display: initial"}
  }
`;
export const BodyContent = styled(Col)`
  padding: 0px 15px;
  font-weight: 300;
  align-self: center;
  display: flex;
  flex-direction: row;
`;

export const CloseIcon = styled(Icon)`
  position: absolute;
  left: -5px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  background-color: ${ThemeColor.FOAM};
  position: absolute;
  left: -40px;
  cursor: pointer;
  img {
    margin-left: 7px;
  }
`;

export const DownloadIcon = styled.div`
  display: none;
  margin-left: 12px;
  height: 24px;
  cursor: pointer;
`;

export const Questionnaire = styled.div<IQuestionnaireProps>`
  :hover {
    ${(props) =>
      props.isSigned && "text-decoration: underline; cursor: pointer"}
  }
`;

export const StyledSingleSelect = styled(SingleSelect)`
  flex: 1;
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

export const DeleteModalBody = styled.div`
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
    text-transform: capitalize;
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
