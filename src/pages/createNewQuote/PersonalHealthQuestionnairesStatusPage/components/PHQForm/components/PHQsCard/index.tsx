import { observer } from "mobx-react";
import { IPhqDocument } from "src/interfaces/benefit";
import { extractAssignedDocument } from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import useStore from "src/utils/useStore";
import CompanyCard from "./components/CompanyCard";
import { Container, CardWrapper } from "./phqsCard.styles";

const PHQsCard = () => {
  const { benefitStore } = useStore();
  const { phqDocuments, assignedDocuments } = benefitStore;

  return (
    <Container>
      {assignedDocuments?.map(
        (assignedDocument: IPhqDocument, index: number) => {
          const foundDocument: IPhqDocument = extractAssignedDocument(
            phqDocuments,
            assignedDocument
          );
          return (
            <CardWrapper key={index} lg="3" md="3" sm="6" xs="12">
              <CompanyCard assignedDocument={foundDocument} />
            </CardWrapper>
          );
        }
      )}
    </Container>
  );
};

export default observer(PHQsCard);
