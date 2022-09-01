import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled.div<{ active: boolean }>`
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

export const CloseIcon = styled(Icon)`
  display: flex;

  img {
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }
`;
