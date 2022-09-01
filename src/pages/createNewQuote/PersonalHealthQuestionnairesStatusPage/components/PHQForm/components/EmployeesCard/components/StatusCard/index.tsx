import { IAssignedDocumentsTree } from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import CardBody from "./components/CardBody";
import CardHeader from "./components/CardHeader";
import { Container } from "./statusCard.styles";

interface IStatusCardProps {
  title: string;
  onClickArrow: (assignedDocument: IAssignedDocumentsTree) => void;
  users: IAssignedDocumentsTree[];
}

const StatusCard = (props: IStatusCardProps) => {
  const { title, onClickArrow, users } = props;

  return (
    <Container>
      <CardHeader users={users} title={title} />
      <CardBody users={users} onClickArrow={onClickArrow} />
    </Container>
  );
};

export default StatusCard;
