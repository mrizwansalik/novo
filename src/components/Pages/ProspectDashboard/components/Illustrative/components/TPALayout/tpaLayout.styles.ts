import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  margin-top: 26px;
  margin-bottom: 16px;
`;

export const Layout = styled(ColNoSpacing)`
  padding-left: 12px;
  padding-right: 12px;
`;

export const Label = styled(ColNoSpacing)`
  color: #728490;
`;

export const ButtonSection = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const ListButton = styled.div`
  cursor: pointer;
  padding-right: 16px;

  img {
    width: 16px !important;
    height: 16px !important;
  }
`;

export const GridButton = styled.div`
  cursor: pointer;

  img {
    width: 16px !important;
    height: 16px !important;
  }
`;
