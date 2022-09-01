import { IAssignedDocumentsTree } from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import { Container, CardWrapper } from "./cardBody.styles";
import WorkerDetail from "./components/WorkerDetail";

interface ICardBodyProps {
  onClickArrow: (assignedDocument: IAssignedDocumentsTree) => void;
  users: IAssignedDocumentsTree[];
}

const CardBody = (props: ICardBodyProps) => {
  const { onClickArrow, users } = props;

  return (
    <Container>
      {Array.isArray(users) &&
        users?.map((user: IAssignedDocumentsTree, index: number) => {
          return (
            <CardWrapper key={index}>
              <WorkerDetail
                worker={user?.worker}
                documents={user?.documents}
                onClickArrow={() => onClickArrow(user)}
              />
            </CardWrapper>
          );
        })}
    </Container>
  );
};

export default CardBody;
