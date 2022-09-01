import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 40px;

  > div {
    display: flex;
  }
`;

export const AdditionalInformation = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  max-width: 100vw;
`;

export const AdditionalInformationItem = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 300;
  color: ${ThemeColor.STEEL_GRAY};
  margin-left: 16px;
  display: flex;
  align-items: center;

  span {
    color: #a9a9a9;
  }
`;

export const RowPerPageSelect = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 300;
  color: ${ThemeColor.STEEL_GRAY};
  margin: 0 24px 0 16px;
  display: flex;
  align-items: center;

  > div {
    margin-left: 8px;
  }

  input {
    width: 12px;
  }
`;

export const PaginationSelect = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 300;
  color: ${ThemeColor.STEEL_GRAY};
`;

export const PaginationButton = styled(({ ...rest }) => <Icon {...rest} />)`
  cursor: pointer;
  margin-left: 12px;
  transform: ${(props) => (props.isLeft ? "scaleX(-1)" : "none")};

  img {
    filter: ${(props) => (props.isDisabled ? "grayscale(100%)" : "none")};
  }
`;
