import React, { useState } from "react";
import { observer } from "mobx-react";
import { Col, Row } from "reactstrap";
import Icon from "src/components/Icon";
import useStore from "src/utils/useStore";
import { thousandSeparatorByComma } from "../../utils";
import MonthlyChart from "./components/MonthlyChart";
import MonthlyTable from "./components/MonthlyTable";
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
const ClaimsMonthlyTab = () => {
  const [activeTab, setActiveTab] = useState<Number>(0);
  const { benefitStore } = useStore();
  const {
    claimsYears,
    yearClaimsAmount,
    totalClaimsAmount,
    yearAssumedDiscounts,
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
            <MonthlyTable />
          </Col>
        )}
        {activeTab === 1 && (
          <Col xs={12}>
            {totalClaimsAmount > 0 ? (
              <MonthlyChart />
            ) : (
              <EmptyChart>
                You have not added monthly claims data.
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
                  yearClaimsAmount[index]
                )}`}</AmountValue>
              </Col>
            ))}
            <Col xs={12}>
              <Label>Total amount</Label>
              <AmountValue>
                {`$${thousandSeparatorByComma(totalClaimsAmount)}`}
              </AmountValue>
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

export default observer(ClaimsMonthlyTab);
