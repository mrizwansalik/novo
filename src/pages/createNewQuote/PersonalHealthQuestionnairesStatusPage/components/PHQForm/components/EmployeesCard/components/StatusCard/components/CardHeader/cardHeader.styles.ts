import { Input } from "reactstrap";
import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 22px;

  background-color: ${ThemeColor.BLACK_SQUEEZE};
`;

export const CommonCheckbox = styled(Input)``;

export const FlagIcon = styled(Icon)`
  margin-left: 12px;
  margin-right: 12px;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const Label = styled.div`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 18px;
  line-height: 27px;
  font-weight: 500;
`;
