import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div``;

export const CheckedIcon = styled(Icon)`
  img {
    border-radius: 50%;
    background-color: ${ThemeColor.LA_PALMA} !important;
    width: 20px;
    height: 20px;
  }
`;

export const UnCheckIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${ThemeColor.BORDER_COLOR} !important;
`;
