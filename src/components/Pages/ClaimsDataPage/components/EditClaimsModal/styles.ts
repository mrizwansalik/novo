/* eslint-disable max-lines */
import { Modal, ModalBody, Col, Container } from "reactstrap";
import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import Icon from "src/components/Icon";
import InputGroup from "src/components/InputGroup";
import SingleSelect from "src/components/SingleSelect";
import { ThemeColor } from "src/constants";
import { device } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled, { css } from "styled-components";

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
    @media only screen and (${device.mobile}) {
      width: 85%;
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

export const StyledModalBody = styled(ModalBody)`
  padding: 0;
  max-height: unset;
  min-height: 100%;
  min-height: 100vh;
`;

export const StyledContainer = styled(Container)`
  margin-top: 16px;
  margin-bottom: 20px;
  border: 1px solid ${ThemeColor.BORDER_COLOR};
  border-collapse: collapse;
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

export const StyledSingleSelect = styled(SingleSelect)`
  flex: 1;
`;

export const StyledLabel = styled.label<{ noMarginBottom?: boolean }>`
  display: block;
  margin-bottom: 16px;
  ${(props) => props.noMarginBottom && `margin-bottom: 0px`}
`;

export const StyledDropdownInput = styled(SingleSelect)`
  /* margin-bottom: 25px; */

  label {
    margin-bottom: 16px !important;
  }
`;

export const StyledTextInput = styled(InputGroup)`
  margin-bottom: 25px;

  label {
    margin-bottom: 16px;
  }

  input {
    height: 36px;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: ${ThemeColor.STEEL_GRAY};
    padding: 0 0 5px 0;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid #c8c8c8 !important;
    border-radius: 0;
    width: 100%;
    box-shadow: none !important;
  }
`;

export const StyledCol = styled(Col)<{ hasNoMarginBottom?: boolean }>`
  margin-bottom: 25px;
  ${(props) =>
    props.hasNoMarginBottom &&
    css`
      margin-bottom: 0px;
    `}
`;

export const SaveButton = styled(Button)`
  height: 38px;
  min-width: 166px;
  padding: 8px 18px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  align-self: center;
  color: ${(props) => (props.disabled ? "#a6a6a6" : ThemeColor.WHITE_COLOR)};
  border: 1px solid;
  border-color: ${(props) =>
    props.disabled ? "#e3e9ec" : ThemeColor.AZURE_RADIANCE};
  background-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.AZURE_RADIANCE};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")} !important;
  :focus,
  :active {
    background-color: #0078c2;
    color: ${ThemeColor.WHITE_COLOR};
  }
  :hover {
    color: ${(props) => (props.disabled ? "#a6a6a6" : ThemeColor.WHITE_COLOR)};
    background-color: ${(props) =>
      props.disabled ? ThemeColor.SILVER : "#0078c2"};
    border-color: ${(props) => (props.disabled ? "#e3e9ec" : "#0078c2")};
  }
`;

export const YearTagContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props?.active ? ThemeColor.LOCH_MARA : ThemeColor.SAIL};
  border-color: ${ThemeColor.AZURE_RADIANCE};
  padding: 8px 16px;
  border-radius: 18px;
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  cursor: pointer;
  height: 36px;
  position: relative;
  ${breakpoints("margin-bottom", [
    {
      xl: "0px",
    },
    {
      lg: "0px",
    },
    {
      md: "8px",
    },
    {
      sm: "8px",
    },
    {
      xs: "8px",
    },
  ])}
  margin-right: 8px;
`;

export const YearLabel = styled.div<{ active: boolean }>`
  font-size: 14px;
  line-height: 19px;
  font-weight: 700;
  text-align: center;
  color: ${(props) =>
    props.active ? ThemeColor.WHITE_COLOR : ThemeColor.AZURE_RADIANCE};
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 48px;
`;

export const TableLabel = styled(Col)`
  display: flex;
  flex-direction: row;

  & > div:not(:last-child) {
    margin-right: 10px;
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

export const AddNewClaimButton = styled(Button)`
  background-color: ${ThemeColor.WHITE_COLOR};
  color: ${ThemeColor.AZURE_RADIANCE};
  padding: 8px 18px;
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  border-radius: 3px;
  font-size: 14px;
  font-weight: 300;
  line-height: 21px;
  margin-bottom: 16px;
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

export const FormTitle = styled(Col)`
  font-weight: 700;
  color: ${ThemeColor.RIVER_BED};
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 24px;
`;

export const DeleteYearIcon = styled(Icon)`
  display: flex;

  img {
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }
`;

export const AddButton = styled(Button)`
  min-width: 104px;
  align-items: center;
  background-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.FOAM} !important;
  border-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.FOAM} !important;
  color: ${(props) =>
    props.disabled
      ? ThemeColor.SILVER_CHALICE
      : ThemeColor.AZURE_RADIANCE} !important;
  font-size: 14px;
  line-height: 21px;
  height: 32px;
  &:hover {
    background-color: ${ThemeColor.FOAM} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    border-color: ${ThemeColor.FOAM};
  }

  ${breakpoints("margin-left", [
    {
      xl: "16px",
    },
    {
      lg: "16px",
    },
    {
      md: "8px",
    },
    {
      sm: "8px",
    },
    {
      xs: "8px",
    },
  ])}

  ${breakpoints("margin-top", [
    {
      xl: "0px",
    },
    {
      lg: "0px",
    },
    {
      md: "16px",
    },
    {
      sm: "16px",
    },
    {
      xs: "16px",
    },
  ])}

  @media only screen and (${device.mobile}) {
    min-width: 80px;
  }
`;

export const CancelButton = styled(Button)`
  min-width: 104px;
  background-color: ${ThemeColor.WHITE_COLOR} !important;
  border-color: ${ThemeColor.AZURE_RADIANCE};
  color: ${ThemeColor.AZURE_RADIANCE} !important;
  font-size: 14px;
  line-height: 21px;
  height: 32px;
  &:hover {
    background-color: ${ThemeColor.WHITE_COLOR} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    border-color: ${ThemeColor.AZURE_RADIANCE};
  }

  ${breakpoints("margin-left", [
    {
      xl: "16px",
    },
    {
      lg: "16px",
    },
    {
      md: "8px",
    },
    {
      sm: "8px",
    },
    {
      xs: "8px",
    },
  ])}

  ${breakpoints("margin-top", [
    {
      xl: "0px",
    },
    {
      lg: "0px",
    },
    {
      md: "16px",
    },
    {
      sm: "16px",
    },
    {
      xs: "16px",
    },
  ])}

  @media only screen and (${device.mobile}) {
    min-width: 80px;
  }
`;

export const AddNewClaimInput = styled(Col)`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  flex-direction: row;
`;

export const AmountGroup = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 16px;
  line-height: 24px;
  margin-top: 16px;
`;

export const RemoveIcon = styled(Icon)`
  img {
    cursor: pointer;
    margin-left: 12px;
    width: 24px;
    height: 24px;
  }
  margin-bottom: 16px;
`;

export const EditIcon = styled(Icon)`
  img {
    cursor: pointer;
    margin-left: 12px;
    width: 24px;
    height: 24px;
  }
  margin-bottom: 16px;
`;

export const InputWithSuffix = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const SuffixText = styled.div`
  margin-bottom: 25px;
`;

export const SaveAmountButton = styled(Button)`
  margin-left: 8px;
  min-width: 104px;
  background-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.FOAM} !important;
  border-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.FOAM} !important;
  color: ${(props) =>
    props.disabled
      ? ThemeColor.SILVER_CHALICE
      : ThemeColor.AZURE_RADIANCE} !important;
  font-size: 14px;
  line-height: 21px;

  &:hover {
    background-color: ${ThemeColor.FOAM} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    border-color: ${ThemeColor.FOAM};
  }

  @media only screen and (${device.mobile}) {
    min-width: 80px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
