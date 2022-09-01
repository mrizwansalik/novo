import { IPhqDocument } from "src/interfaces/benefit";
import { Container, Avatar, Label } from "./companyCard.styles";

interface ICompanyCardProps {
  assignedDocument: IPhqDocument;
}

const CompanyCard = (props: ICompanyCardProps) => {
  const { assignedDocument } = props;

  return (
    <Container>
      <Avatar source={assignedDocument?.carrier?.picture_thumbnail_256} />
      <Label>{assignedDocument?.name}</Label>
    </Container>
  );
};

export default CompanyCard;
