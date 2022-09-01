import { Container } from "reactstrap";
import { Col } from "reactstrap";
import Button from "src/components/Button";
import styled from "styled-components";

import { ThemeColor } from "../../../../../constants/index";
import Icon from "../../../../Icon";

export const Header = styled.h1`
  // margin-bottom: 25px;
  font-size: 22px;
  line-height: 27px;
  font-weight: 200;
`;

export const StyledInput = styled.input`
  width: 100%;
  margin: 15px 0px;
`;

export const WiderButton = styled(Button)`
  width: 100%;
  padding: 0 15px;
  text-align: center;
`;

export const ProgramDetailContainer = styled(Container)`
  padding: 25px;
`;

export const ActionSheetContainer = styled.div`
  margin-bottom: 24px;
  background-color: #f5f5f5;
`;

export const ActionSheetLayout = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 3px;
  padding: 35px;
`;

export const AddButton = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  border: 1px solid #0097f5;
  align-items: center;
  padding: 4px 25px;
  background-color: #0097f5;
  border-radius: 3px;
  width: fit-content;

  &:hover {
    background-color: #0078c2;
    border: 1px solid #0078c2;
  }
`;

export const AddLabel = styled.div`
  font-size: 20px;
  line-height: 25px;
  color: ${ThemeColor.WHITE_COLOR};
`;

export const AddIcon = styled(Icon)`
  width: fit-content;
  margin-right: 6px;

  img {
    width: 12px;
    height: 12px;
  }
`;

export const CarrierCount = styled(Col)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
`;

export const CarrierSearch = styled(Col)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
`;

export const InputSearch = styled.input`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
  width: 80%;
`;
