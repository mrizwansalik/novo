import { useState } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { IPhqDocument } from "src/interfaces/benefit";
import routes from "src/routes";
import useStore from "src/utils/useStore";
import { handleAssignPhqsDocuments, updateRenderedState } from "../../utils";
import QuestionnaireCard from "./components/QuestionnaireCard";
import {
  Container,
  OutlineButton,
  CommonButton,
  ButtonLayout,
  MediumLeftSpacing,
  CompanyCollection,
} from "./phqForm.styles";

const PhqLayout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const { benefitStore } = useStore();
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const { phqDocuments } = benefitStore;
  async function handleClickAssign(): Promise<void> {
    if (loading) return;
    try {
      setLoading(true);
      benefitStore.setSelectedPhqDocuments(benefitStore.renderedPhqDocuments);
      await handleAssignPhqsDocuments(benefitStore, prospectId);
      history.push(
        routes.dashboard.brokerage.prospects.onBoarding.health.phqs.invite.value(
          prospectId
        )
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Technical error, please contact us!");
    }
  }

  return (
    <Container>
      <ButtonLayout>
        <CommonButton
          label="Back"
          onClick={() => {
            benefitStore.setRenderedPhqDocuments(
              benefitStore.selectedPhqDocuments
            );
            history.push(
              routes.dashboard.brokerage.prospects.onBoarding.health.phqs.invite.value(
                prospectId
              )
            );
          }}
        />
        <MediumLeftSpacing>
          <OutlineButton
            label={!loading ? "Assign" : "Loading..."}
            onClick={handleClickAssign}
          />
        </MediumLeftSpacing>
      </ButtonLayout>
      <CompanyCollection>
        {Array.isArray(phqDocuments) &&
          phqDocuments.map((phqDocument: IPhqDocument, index: number) => {
            const isActive: boolean =
              benefitStore?.renderedPhqDocuments?.findIndex(
                (phqDocumentDetail: IPhqDocument) =>
                  phqDocumentDetail?.id === phqDocument?.id
              ) > -1;

            return (
              <QuestionnaireCard
                isActive={isActive}
                onClick={() => updateRenderedState(benefitStore, phqDocument)}
                phqDocument={phqDocument}
                key={index}
              />
            );
          })}
      </CompanyCollection>
    </Container>
  );
};

export default observer(PhqLayout);
