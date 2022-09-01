import React, { useState } from "react";
import { observer } from "mobx-react";
import { Col, Row } from "reactstrap";
import Icon from "src/components/Icon";
import useStore from "src/utils/useStore";
import { thousandSeparatorByComma } from "../../utils";
import LargeChart from "./components/LargeChart";
import LargeTable from "./components/LargeTable";
import {
  Container,
  TotalAmountContainer,
  TotalAmountTitle,
  Label,
  AmountValue,
  DiscountValue,
  TabLink,
  TabLinkContainer,
  EmptyGraphIcon,
  EmptyChart,
} from "./styles";
const years = ["2018", "2019", "2020", "2021"];

const ClaimsLargeTab = () => {
  const [activeTab, setActiveTab] = useState<Number>(0);
  const { benefitStore } = useStore();
  const {
    claimsYears,
    yearAssumedDiscounts,
    totalYearStopLossClaims,
    totalStopLossClaims,
  } = benefitStore;
  return (
    <Container>
      <TabLinkContainer xs={12}>
        <TabLink isActive={activeTab === 0} onClick={() => setActiveTab(0)}>
          <Icon
            iconName={activeTab === 1 ? "table-grey.png" : "table-white.png"}
            size={24}
          />
        </TabLink>
        <TabLink isActive={activeTab === 1} onClick={() => setActiveTab(1)}>
          <Icon
            iconName={activeTab === 0 ? "graph-grey.png" : "graph-white.png"}
            size={24}
          />
        </TabLink>
      </TabLinkContainer>
      <Row>
        {activeTab === 0 && (
          <Col xs={12}>
            <LargeTable />
          </Col>
        )}
        {activeTab === 1 && (
          <Col xs={12}>
            {totalStopLossClaims > 0 ? (
              <LargeChart />
            ) : (
              <EmptyChart>
                You have not added large claims data.
                <EmptyGraphIcon
                  iconName="graph_empty.jpg"
                  width={195}
                  height={93}
                />
              </EmptyChart>
            )}
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <TotalAmountContainer>
            <Col xs={12}>
              <TotalAmountTitle>Totals</TotalAmountTitle>
            </Col>
            {claimsYears.map((item, index) => (
              <Col xs={4} md={2}>
                <Label>{item}</Label>
                <AmountValue>{`$${thousandSeparatorByComma(
                  totalYearStopLossClaims[index]
                )}`}</AmountValue>
              </Col>
            ))}
            <Col xs={12}>
              <Label>Total amount</Label>
              <AmountValue>{`$${thousandSeparatorByComma(
                totalStopLossClaims
              )}`}</AmountValue>
            </Col>
          </TotalAmountContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          <TotalAmountContainer>
            <Col xs={12}>
              <TotalAmountTitle>Total Assumed Discount</TotalAmountTitle>
            </Col>
            {claimsYears.map((item, index) => (
              <Col xs={4} md={2}>
                <Label>{item}</Label>
                <DiscountValue>{`${yearAssumedDiscounts[index]}%`}</DiscountValue>
              </Col>
            ))}
          </TotalAmountContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default observer(ClaimsLargeTab);
