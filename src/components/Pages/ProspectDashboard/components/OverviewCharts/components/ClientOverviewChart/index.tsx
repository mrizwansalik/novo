import { get } from "lodash";
import { observer } from "mobx-react";
import { truncateLongNames } from "src/utils/common";
import useStore from "src/utils/useStore";
import {
  Container,
  OverviewLayout,
  SectionName,
  OverviewContent,
} from "./clientOverviewChart.styles";
import OverviewTab from "./components/OverviewTab";

const ClientOverviewChart = () => {
  const { onboardingQuoteStore } = useStore();
  const { prospectDetail } = onboardingQuoteStore;

  const prospectName = truncateLongNames(get(prospectDetail, "name", ""));
  const effectiveDate = get(
    prospectDetail,
    "census_data.health_plan.effective_date"
  );
  const location = `${get(prospectDetail, "city.name")}, ${get(
    prospectDetail,
    "state_abbreviation"
  )} ${get(prospectDetail, "postal")}`;
  const industry = truncateLongNames(
    get(prospectDetail, "naics_description", "") ||
      get(prospectDetail, "sic_description", "")
  );

  return (
    <Container>
      <OverviewLayout md="12">
        <SectionName>Client Overview</SectionName>
        <OverviewContent>
          <OverviewTab label="Client" value={prospectName} />
          <OverviewTab label="Effective" value={effectiveDate} />
          <OverviewTab label="Location" value={location} />
          <OverviewTab label="Industry" value={industry} />
        </OverviewContent>
      </OverviewLayout>
    </Container>
  );
};

export default observer(ClientOverviewChart);
