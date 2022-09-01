import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Icon from "src/components/Icon";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { StyledLabel } from "../SubHeader/styles";
import {
  StopLossContainer,
  StopLossItem,
  StopLossMenu,
  StopLossMenuItem,
  StopLossMenuHeading,
  StopLossMenuRow,
  StopLossItemHeading,
  ArrowSection,
  StopLossHeaderItem,
  StopLossHeaderRow,
} from "./style";
const EmptyState = {
  display_name: "",
  id: "",
  name: "",
  network_ingredients: [],
  risk_corridor: null,
  status: "",
  stop_loss_title: "",
  total_annual_admin_fees: 0,
  total_annual_cost_no_corridor: 0,
  total_annual_maximum_cost: 0,
  total_annual_stop_loss_cost: 0,
  total_expected_claims_fund: 0,
  version_type: "",
};
const Plans = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { illustrativeStore } = useStore();
  const { summaryPricing } = illustrativeStore;
  const [menuItemHead, setMenuItemHead] = useState("rates");
  const [item, setItem] = useState(EmptyState);
  const { programId } = useParams<IParamTypes>();
  useEffect(() => {
    setItem(
      summaryPricing.find((i) => i?.id === programId)?.versions[0] || EmptyState
    );
  }, []);

  return (
    <StopLossContainer>
      <StopLossMenuHeading style={{ borderLeft: "4px solid #998bfd" }}>
        <StopLossHeaderItem md={3}>
          <StopLossHeaderRow>
            <StyledLabel>{data.name}</StyledLabel>
            <StopLossHeaderItem>{`$${data?.carrier_plan?.deductible_in}/ ${
              data?.carrier_plan?.coinsurance_in * 100
            }%/ $${
              data?.carrier_plan?.out_of_pocket_max_in
            }`}</StopLossHeaderItem>
          </StopLossHeaderRow>
        </StopLossHeaderItem>
        <StopLossHeaderItem md={3}>
          <StopLossHeaderRow>
            <StyledLabel>Maximum Cost</StyledLabel>
            <StopLossHeaderItem>
              {` $${
                item.total_annual_maximum_cost
                  ? item.total_annual_maximum_cost / 12
                  : "0"
              }/mo`}{" "}
              <StyledLabel>
                {" "}
                {` $${
                  item.total_annual_maximum_cost
                    ? item.total_annual_maximum_cost
                    : "0"
                }/yr`}
              </StyledLabel>
            </StopLossHeaderItem>
          </StopLossHeaderRow>
        </StopLossHeaderItem>
      </StopLossMenuHeading>
      <StopLossMenuRow style={{ borderBottom: "1px solid #cbcbcb" }}>
        <StopLossMenuItem md={3}>
          <StyledLabel>Monthly Totals</StyledLabel>
        </StopLossMenuItem>
        <StopLossMenuItem md={2}>
          {`$${
            data?.family_status_pricings[0]?.price
              ? data?.family_status_pricings[0]?.price
              : 0
          }`}{" "}
          EE({data.participation_estimation_employee})
        </StopLossMenuItem>
        <StopLossMenuItem md={2}>
          {`$${
            data?.family_status_pricings[1]?.price
              ? data?.family_status_pricings[1]?.price
              : 0
          }`}{" "}
          ES({data.participation_estimation_employee_spouse})
        </StopLossMenuItem>
        <StopLossMenuItem md={2}>
          {`$${
            data?.family_status_pricings[2]?.price
              ? data?.family_status_pricings[2]?.price
              : 0
          }`}{" "}
          EC({data.participation_estimation_employee_child})
        </StopLossMenuItem>
        <StopLossMenuItem md={2}>
          {`$${
            data?.family_status_pricings[3]?.price
              ? data?.family_status_pricings[3]?.price
              : 0
          }`}{" "}
          EF({data.participation_estimation_employee_family})
        </StopLossMenuItem>
        <StopLossMenuItem md={1}>
          {" "}
          <ArrowSection
            xl="1"
            lg="12"
            md="12"
            sm="12"
            xs="12"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            <Icon
              iconName={
                isExpanded ? "upArrow32px-blue.png" : "downArrow32px-blue.png"
              }
            />
          </ArrowSection>
        </StopLossMenuItem>
      </StopLossMenuRow>
      {isExpanded && (
        <StopLossItemHeading>
          <StopLossItem md={3}>
            <StopLossMenu
              isActive={menuItemHead === "rates" ? true : false}
              onClick={() => setMenuItemHead("rates")}
            >
              Rates
            </StopLossMenu>
            <StopLossMenu
              isActive={menuItemHead === "plan" ? true : false}
              onClick={() => setMenuItemHead("plan")}
            >
              Plan Design
            </StopLossMenu>
          </StopLossItem>
          <StopLossItem md={9}>
            {menuItemHead === "rates" && (
              <>
                <StopLossMenuRow>
                  <StopLossMenuItem md={4}>
                    <StyledLabel>All rates are PEPM.</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={2}>EE</StopLossMenuItem>
                  <StopLossMenuItem md={2}>ES</StopLossMenuItem>
                  <StopLossMenuItem md={2}>EC</StopLossMenuItem>
                  <StopLossMenuItem md={2}>EF</StopLossMenuItem>
                </StopLossMenuRow>
                <StopLossMenuRow>
                  <StopLossMenuItem md={4}>
                    <StyledLabel>Specific Premium</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[0]?.specific_premium
                      ? data?.family_status_pricings[0]?.specific_premium
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[1]?.specific_premium
                      ? data?.family_status_pricings[1]?.specific_premium
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[2]?.specific_premium
                      ? data?.family_status_pricings[2]?.specific_premium
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[3]?.specific_premium
                      ? data?.family_status_pricings[3]?.specific_premium
                      : 0
                  }`}</StopLossMenuItem>
                </StopLossMenuRow>
                <StopLossMenuRow>
                  <StopLossMenuItem md={4}>
                    <StyledLabel>Aggregate Premium</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[0]?.aggregate_premium
                      ? data?.family_status_pricings[0]?.aggregate_premium
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[1]?.aggregate_premium
                      ? data?.family_status_pricings[1]?.aggregate_premium
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[2]?.aggregate_premium
                      ? data?.family_status_pricings[2]?.aggregate_premium
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[3]?.aggregate_premium
                      ? data?.family_status_pricings[3]?.aggregate_premium
                      : 0
                  }`}</StopLossMenuItem>
                </StopLossMenuRow>
                <StopLossMenuRow>
                  <StopLossMenuItem md={4}>
                    <StyledLabel>100% Expected Claims</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[0]?.expected_claims_fund
                      ? data?.family_status_pricings[0]?.expected_claims_fund
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[1]?.expected_claims_fund
                      ? data?.family_status_pricings[1]?.expected_claims_fund
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[2]?.expected_claims_fund
                      ? data?.family_status_pricings[2]?.expected_claims_fund
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[3]?.expected_claims_fund
                      ? data?.family_status_pricings[3]?.expected_claims_fund
                      : 0
                  }`}</StopLossMenuItem>
                </StopLossMenuRow>
                <StopLossMenuRow>
                  <StopLossMenuItem md={4}>
                    <StyledLabel>Aggregate Corridor</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[0]?.aggregate_corridor
                      ? data?.family_status_pricings[0]?.aggregate_corridor
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[1]?.aggregate_corridor
                      ? data?.family_status_pricings[1]?.aggregate_corridor
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[2]?.aggregate_corridor
                      ? data?.family_status_pricings[2]?.aggregate_corridor
                      : 0
                  }`}</StopLossMenuItem>
                  <StopLossMenuItem md={2}>{`$${
                    data?.family_status_pricings[3]?.aggregate_corridor
                      ? data?.family_status_pricings[3]?.aggregate_corridor
                      : 0
                  }`}</StopLossMenuItem>
                </StopLossMenuRow>
              </>
            )}
            {menuItemHead === "plan" && (
              <>
                <StopLossMenuRow>
                  <StopLossMenuItem md={5}>
                    <StyledLabel>Plan Class</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={7}>
                    {data?.carrier_plan?.plan_class}
                  </StopLossMenuItem>
                </StopLossMenuRow>
                <StopLossMenuRow>
                  <StopLossMenuItem md={5}>
                    <StyledLabel>In & Out of Network</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={7}>{`${
                    data?.carrier_plan?.coinsurance_in * 100
                  }% / ${
                    data?.carrier_plan?.coinsurance_out * 100
                  }%`}</StopLossMenuItem>
                </StopLossMenuRow>
                <StopLossMenuRow>
                  <StopLossMenuItem md={5}>
                    <StyledLabel>Deductibles</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={7}>
                    {` $${data?.carrier_plan?.deductible_in} (individual), $${data?.carrier_plan?.deductible_family_in} (family)`}
                  </StopLossMenuItem>
                </StopLossMenuRow>
                <StopLossMenuRow>
                  <StopLossMenuItem md={5}>
                    <StyledLabel>Out-of-Pocket</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={7}>
                    {` $${data?.carrier_plan?.out_of_pocket_max_in} (individual),
                    $${data?.carrier_plan?.out_of_pocket_max_family_in} (family)`}
                  </StopLossMenuItem>
                </StopLossMenuRow>
                <StopLossMenuRow>
                  <StopLossMenuItem md={5}>
                    <StyledLabel>Co-insurance</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={7}>
                    {data?.carrier_plan?.copay_office_visit_type ===
                    "deductible_coinsurance"
                      ? "Primary Care Office Visit,"
                      : "" ||
                        (data?.carrier_plan?.copay_specialist_type ===
                        "deductible_coinsurance"
                          ? "Specialist Office Visit,"
                          : "") ||
                        (data?.carrier_plan?.copay_urgent_care_type ===
                        "deductible_coinsurance"
                          ? "Urgent Care Facility"
                          : "") ||
                        (data?.carrier_plan?.copay_ambulatory_type ===
                        "deductible_coinsurance"
                          ? "Ambulatory Surgery Center,"
                          : "") ||
                        (data?.carrier_plan?.copay_emergency_room_type ===
                        "deductible_coinsurance"
                          ? "Emergency Room,"
                          : "") ||
                        (data?.carrier_plan?.copay_hospital_type ===
                        "deductible_coinsurance"
                          ? "Hospital,"
                          : "")}
                  </StopLossMenuItem>
                </StopLossMenuRow>
                <StopLossMenuRow>
                  <StopLossMenuItem md={5}>
                    <StyledLabel>Co-pay</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={7}>
                    {`${
                      data?.carrier_plan?.copay_office_visit
                        ? "Primary Care Office Visit(" +
                          data?.carrier_plan?.copay_office_visit +
                          "),"
                        : ""
                    }
                       ${
                         data?.carrier_plan?.copay_specialist
                           ? "Specialist Office Visit(" +
                             data?.carrier_plan?.copay_specialist +
                             "),"
                           : ""
                       }
                       ${
                         data?.carrier_plan?.copay_urgent_care
                           ? "Urgent Care Facility(" +
                             data?.carrier_plan?.copay_urgent_care +
                             "),"
                           : ""
                       }
                        ${
                          data?.carrier_plan?.copay_ambulatory
                            ? "Ambulatory Surgery Center(" +
                              data?.carrier_plan?.copay_ambulatory +
                              "),"
                            : ""
                        }
                        ${
                          data?.carrier_plan?.copay_emergency_room
                            ? "Emergency Room(" +
                              data?.carrier_plan?.copay_emergency_room +
                              "),"
                            : ""
                        }
                        ${
                          data?.carrier_plan?.copay_hospital
                            ? "Hospital(" +
                              data?.carrier_plan?.copay_hospital +
                              "),"
                            : ""
                        }
                      `}
                  </StopLossMenuItem>
                </StopLossMenuRow>
                <StopLossMenuRow>
                  <StopLossMenuItem md={5}>
                    <StyledLabel>Rx Co-pay</StyledLabel>
                  </StopLossMenuItem>
                  <StopLossMenuItem md={7}>
                    {`${data?.carrier_plan?.rx_generic && "Generic."}${
                      data?.carrier_plan?.rx_preferred && "Preferred."
                    }${
                      data?.carrier_plan?.rx_non_preferred && "Non-preferred."
                    }${data?.carrier_plan?.rx_specialty && "Special"}`}{" "}
                    <br />
                    {`${
                      data?.carrier_plan?.rx_generic
                        ? "$" + data?.carrier_plan?.rx_generic + "."
                        : ""
                    } ${
                      data?.carrier_plan?.rx_preferred
                        ? "$" + data?.carrier_plan?.rx_preferred + "."
                        : ""
                    }  ${
                      data?.carrier_plan?.rx_non_preferred
                        ? "$" + data?.carrier_plan?.rx_non_preferred + "."
                        : ""
                    }${
                      data?.carrier_plan?.rx_specialty
                        ? "$" + data?.carrier_plan?.rx_specialty
                        : ""
                    } `}
                  </StopLossMenuItem>
                </StopLossMenuRow>
              </>
            )}
          </StopLossItem>
        </StopLossItemHeading>
      )}
    </StopLossContainer>
  );
};

export default Plans;
