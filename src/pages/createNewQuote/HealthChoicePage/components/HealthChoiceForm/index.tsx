import get from "lodash/get";
import { useHistory, useParams } from "react-router";
import routes from "src/routes";
import SelectGroup from "../SelectGroup";
import { layouts } from "./constants";
import {
  Container,
  RowSeparator,
  LeftSection,
  RightSection,
} from "./healthChoiceForm.styles";

const HealthChoiceForm = () => {
  const history = useHistory();
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");

  return (
    <Container>
      <LeftSection
        xl={{ size: 5, offset: 1 }}
        lg={{ size: 5, offset: 1 }}
        md={{ size: 5, offset: 1 }}
        sm={{ size: 12 }}
        xs={{ size: 12 }}
      >
        <SelectGroup
          label={layouts[0].label}
          description={layouts[0].description}
          onClick={() =>
            history.push(
              routes.dashboard.brokerage.prospects.onBoarding.health.claimsDocuments.value(
                prospectId
              )
            )
          }
        />
      </LeftSection>
      <RowSeparator />
      <RightSection
        xl={{ size: 5 }}
        lg={{ size: 5 }}
        md={{ size: 5 }}
        sm={{ size: 12 }}
        xs={{ size: 12 }}
      >
        <SelectGroup
          label={layouts[1].label}
          description={layouts[1].description}
          onClick={() =>
            history.push(
              routes.dashboard.brokerage.prospects.onBoarding.health.phqs.invite.value(
                prospectId
              )
            )
          }
        />
      </RightSection>
    </Container>
  );
};

export default HealthChoiceForm;
