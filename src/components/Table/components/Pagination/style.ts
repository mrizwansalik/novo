import styled from "styled-components";
import Icon from "../../../Icon";

interface IPaginateButtonProps {
  isDisabled?: boolean;
  onClick?: () => void;
}

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;

  > div {
    display: flex;
  }
`;

export const PaginateButton = styled(Icon)<IPaginateButtonProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.isDisabled ? "#bcbcc0" : "#212135")};
  margin: 4px;
  cursor: pointer;
  -webkit-user-select: none;

  :hover {
    background: ${(props) => (props.isDisabled ? "#bcbcc0" : "#25a25a")};
  }

  img {
    width: 16px;
    height: 16px;
  }
`;
