import { Row, Col } from "reactstrap";
import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled, { css } from "styled-components";
interface ITabLinkProps {
  isActive: boolean;
}
export const Container = styled.div``;

export const TotalAmountContainer = styled(Row)`
  margin-top: 30px;
`;
export const TotalAmountTitle = styled.h3`
  display: block;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
  font-weight: 700;
  color: ${ThemeColor.STEEL_GRAY};
`;
export const TotalDiscountContainer = styled.div``;
export const Label = styled.h3`
  color: ${ThemeColor.RIVER_BED};
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
  font-weight: 700;
  display: block;
`;

export const AmountValue = styled.h1`
  display: block;
  font-size: 24px;
  margin-bottom: 8px;
  font-weight: 700;
  line-height: 36px;
  color: ${ThemeColor.STEEL_GRAY};
`;

export const DiscountValue = styled.h3`
  color: ${ThemeColor.RIVER_BED};
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
  font-weight: 700;
`;

export const TabLink = styled.div<ITabLinkProps>`
  width: 37px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #e3e9ec;
  cursor: pointer;
  ${(props) =>
    props.isActive &&
    css`
      background-color: ${ThemeColor.AZURE_RADIANCE};
      cursor: default;
    `}
`;

export const TabLinkContainer = styled(Col)`
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 12px;
`;

export const EmptyGraphIcon = styled(Icon)`
  margin-top: 24px;
  img {
    width: 195px;
    height: 93px;
  }
`;

export const EmptyChart = styled.div`
  display: flex;
  flex-direction: column;
  color: #8d959c;
  font-size: 16px;
  font-weight: 500;
`;
