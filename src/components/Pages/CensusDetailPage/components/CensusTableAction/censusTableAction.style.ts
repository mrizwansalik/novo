import { Col, Row } from "reactstrap";
import Button from "src/components/Button";
import Icon from "src/components/Icon";
import SingleSelect from "src/components/SingleSelect";
import { device, ThemeColor } from "src/constants";
import styled from "styled-components";

interface IColProps {
  isFlex?: boolean;
}

interface IIconProps {
  isDisabled?: boolean;
}

export const selectControlStyle = {
  borderColor: `${ThemeColor.AZURE_RADIANCE} !important`,
};

export const selectPlaceholderStyle = {
  color: `${ThemeColor.AZURE_RADIANCE} !important`,
};

export const ComponentContainer = styled(Row)`
  margin: 25px 0;
`;

export const StyledCol = styled(Col)<IColProps>`
  padding: 0;
  display: ${(props) => (props.isFlex ? "flex" : "block")};
  padding-left: ${(props) => (props.isFlex ? "20px" : "0")};

  @media only screen and (${device.mobile}) {
    margin-bottom: 8px;
    padding-left: 0;
  }
`;

export const StyledSelect = styled(SingleSelect)``;

export const StyledIcon = styled(Icon)<IIconProps>`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 15px;

  img {
    cursor: ${(props) => (props.isDisabled ? "inherit" : "pointer")};
  }
`;

export const SearchInput = styled.div`
  position: relative;

  input {
    font-family: "MuseoSans";
    font-size: 14px;
    line-height: 22px;
    height: 38px;
  }

  > span {
    position: absolute;
    top: 0;
    right: 8px;
    display: flex;
    height: 100%;

    > div {
      margin: auto 0;
    }
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

export const ModalBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  h5 {
    color: #212135;
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
