import { Input } from "reactstrap";
import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled.div``;

export const TagWrapper = styled.div<{ active: boolean }>`
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
`;

export const Label = styled.div<{ active: boolean }>`
  font-size: 14px;
  line-height: 19px;
  font-weight: 700;
  text-align: center;
  color: ${(props) =>
    props.active ? ThemeColor.WHITE_COLOR : ThemeColor.AZURE_RADIANCE};
`;

export const InputWrapper = styled.div`
  padding: 10px;
  background-color: ${ThemeColor.WHITE_COLOR};

  display: flex;
  flex-direction: row;
`;

export const CommonInput = styled(Input)`
  padding: 0px;
  border-color: transparent;
  border-bottom: 1px solid ${ThemeColor.SILVER} !important;

  border-radius: 0px;
  padding-right: 0px;
  padding-left: 0px;

  min-width: 140px;

  font-size: 16px;
  line-height: 24px;
  color: #212135;
  font-weight: 300;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

export const CommonIcon = styled(Icon)`
  margin-left: 12px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;
