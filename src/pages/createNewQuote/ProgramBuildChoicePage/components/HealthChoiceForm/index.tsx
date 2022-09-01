import get from "lodash/get";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router-dom";
import { ColNoSpacing } from "src/components/Pages/ProspectDashboard/prospectDashboard.styles";
import useStore from "src/utils/useStore";
import SelectGroup from "../SelectGroup";
import { selectGroup } from "./constants";
import { Container } from "./healthChoiceForm.styles";
import { handleNextStep } from "./utils";

const HealthChoiceForm = () => {
  const { orgStore } = useStore();
  const params = useParams();
  const history = useHistory();
  const { orgDetail } = orgStore;
  const prospectId: string = get(params, "prospectId", "");

  return (
    <Container>
      <ColNoSpacing
        xl={{ size: 6 }}
        lg={{ size: 6 }}
        md={{ size: 12 }}
        sm={{ size: 12 }}
        xs={{ size: 12 }}
      >
        <SelectGroup
          description={selectGroup.description}
          onClick={() => {
            handleNextStep(orgDetail?.id, prospectId, history);
          }}
        />
      </ColNoSpacing>
    </Container>
  );
};

export default observer(HealthChoiceForm);
