import ColNoSpacing from "src/components/ColNoSpacing";
import Image from "src/components/Image";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(ColNoSpacing)`
  border-radius: 5px;
  margin-bottom: 40px;
  background-color: ${ThemeColor.WHITE_COLOR};
  cursor: pointer;

  ${breakpoints("padding-left", [
    {
      xl: "15px",
    },
    {
      lg: "15px",
    },
    {
      md: "15px",
    },
    {
      sm: "0px",
    },
    {
      xs: "0px",
    },
  ])}

  ${breakpoints("padding-right", [
    {
      xl: "15px",
    },
    {
      lg: "15px",
    },
    {
      md: "15px",
    },
    {
      sm: "0px",
    },
    {
      xs: "0px",
    },
  ])}

  &:nth-child(3n + 3) {
    ${breakpoints("padding-right", [
      {
        xl: "0px !important",
      },
      {
        lg: "0px !important",
      },
      {
        md: "0px !important",
      },
    ])}
  }

  &:nth-child(3n + 1) {
    ${breakpoints("padding-left", [
      {
        xl: "0px !important",
      },
      {
        lg: "0px !important",
      },
      {
        md: "0px !important",
      },
    ])}
  }
`;

export const LayoutSpacing = styled.div`
  padding: 11px;
  min-height: 240px;
  border: 1px solid ${ThemeColor.MYSTIC};
  display: flex;
  flex-direction: column;
`;

export const CheckboxSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  input {
    width: 20px;
    height: 20px;
    border-width: 0px;
  }

  input:checked {
    border-radius: 50%;
  }
`;

export const CompanyImage = styled(Image)`
  display: flex;
  justify-content: center;
  flex: 1;

  img {
    max-width: 150px;
    max-height: 150px;
    object-fit: contain;
  }
`;

export const CompanyTitle = styled.div`
  font-size: 15px;
  color: ${ThemeColor.RIVER_BED};
  text-align: center;
  padding: 15px 0px 0px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
`;
