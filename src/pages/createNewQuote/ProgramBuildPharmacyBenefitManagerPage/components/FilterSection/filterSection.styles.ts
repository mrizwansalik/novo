import { Input } from "reactstrap";
import Icon from "src/components/Icon";
import { ColNoSpacing } from "src/components/Pages/ProspectDashboard/prospectDashboard.styles";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
`;

export const SearchWrapper = styled.div`
  position: relative;

  ${breakpoints("margin-bottom", [
    {
      xl: "0px",
    },
    {
      lg: "0px",
    },
    {
      md: "20px",
    },
    {
      sm: "20px",
    },
    {
      xs: "20px",
    },
  ])}
`;

export const SearchInput = styled(Input)`
  min-width: 242px;
  padding-right: 32px;
  font-size: 16px;
  line-height: 24px;
  color: #212135;

  &:focus {
    outline: none;
    box-shadow: none;
    border: 1px solid #ced4da;
  }
`;

export const SearchIcon = styled(Icon)`
  position: absolute;
  top: calc(50% - 16px);
  right: 5px;

  img {
    height: 32px;
    width: 32px;
  }
`;
