import InputGroup from "src/components/InputGroup";
import styled from "styled-components";
import { ThemeColor } from "../../../../constants/enum/theme";

export const ValueContainer = styled.div`
  display: flex;

  img {
    margin-left: 8px;
    cursor: pointer;
  }
`;

export const EditContainer = styled.div``;

export const StyledInput = styled(InputGroup)`
  margin-bottom: 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
`;

interface IButtonProps {
  isUpdate?: boolean;
}
export const StyledButton = styled.button<IButtonProps>`
  min-width: 104px;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  padding: 8px 18px;
  border: 1px solid;
  margin-right: 12px;
  border-radius: 3px;

  background-color: ${(props) =>
    props.isUpdate ? ThemeColor.FOAM : ThemeColor.WHITE_COLOR};
  border-color: ${(props) =>
    props.isUpdate ? ThemeColor.FOAM : ThemeColor.MERCURY};
  color: ${(props) =>
    props.isUpdate ? ThemeColor.AZURE_RADIANCE : ThemeColor.SLATE_GRAY};
`;
