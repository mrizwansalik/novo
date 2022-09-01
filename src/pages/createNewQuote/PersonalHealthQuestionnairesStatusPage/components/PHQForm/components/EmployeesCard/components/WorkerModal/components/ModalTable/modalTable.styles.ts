import Icon from "src/components/Icon";
import RowNoSpacing from "src/components/RowNoSpacing";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  margin-top: 16px;
  margin-bottom: 16px;

  table {
    thead {
      tr {
        th {
          padding-left: 12px;
          padding-right: 12px;

          &:first-child {
            width: 30% !important;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          padding-left: 12px !important;
          padding-right: 12px !important;

          ${breakpoints("width", [
            {
              md: "100% !important",
            },
            {
              sm: "100% !important",
            },
            {
              xs: "100% !important",
            },
          ])}

          &:first-child {
            width: 30% !important;
          }
        }
      }
    }
  }
`;

export const Questionnaire = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  text-decoration: none;
  color: #424152;

  &:hover {
    text-decoration: ${(props) => (props?.active ? "underline" : "none")};
    color: #424152;

    img {
      display: block;
    }
  }

  img {
    display: none;
  }
`;

export const QuestionnaireLabel = styled.div``;

export const QuestionnaireIcon = styled(Icon)`
  margin-left: 12px;

  img {
    width: 24px;
    height: 24px;
  }
`;
