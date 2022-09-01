import ColNoSpacing from "src/components/ColNoSpacing";
import Icon from "src/components/Icon";
import RowNoSpacing from "src/components/RowNoSpacing";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)``;

export const LabelWrapper = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.div`
  font-weight: 700;
  color: #4b565e;
  font-size: 18px;
  line-height: 24px;
`;

export const MenuIcon = styled(Icon)`
  img {
    cursor: pointer;
    opacity: 0.4;
    width: 60px;
    height: 60px;

    &:hover {
      opacity: 1;
    }
  }
`;

export const Description = styled.div`
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 20px;
  padding-bottom: 45px;

  font-size: 18px;
  line-height: normal;
`;
