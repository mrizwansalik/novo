import ColNoSpacing from "src/components/ColNoSpacing";
import Icon from "src/components/Icon";
import styled from "styled-components";

export const Container = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 18px;
  line-height: 27px;
  color: #212135;
  font-weight: 700;
`;

export const CloseButton = styled(Icon)`
  cursor: pointer;
`;
