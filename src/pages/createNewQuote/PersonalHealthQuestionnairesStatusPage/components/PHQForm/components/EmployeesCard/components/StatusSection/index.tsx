import { observer } from "mobx-react";
import { IAssignedDocumentsTree } from "../../../../../../utils";
import { useUsers } from "../../hooks";
import StatusCard from "../StatusCard";
import { Container, CardWrapper } from "./statusSection.styles";

interface IStatusSectionProps {
  onClickArrow: (assignedDocument: IAssignedDocumentsTree) => void;
}

const StatusSection = (props: IStatusSectionProps) => {
  const { onClickArrow } = props;
  const [awaitUsers, submitUsers, submittedUsers] = useUsers();

  return (
    <Container>
      <CardWrapper lg="4" md="6">
        <StatusCard
          users={awaitUsers}
          title="Awaiting User"
          onClickArrow={onClickArrow}
        />
      </CardWrapper>
      <CardWrapper lg="4" md="6">
        <StatusCard
          users={submitUsers}
          title="Submit Forms"
          onClickArrow={onClickArrow}
        />
      </CardWrapper>
      <CardWrapper lg="4" md="6">
        <StatusCard
          users={submittedUsers}
          title="Submitted"
          onClickArrow={onClickArrow}
        />
      </CardWrapper>
    </Container>
  );
};

export default observer(StatusSection);
