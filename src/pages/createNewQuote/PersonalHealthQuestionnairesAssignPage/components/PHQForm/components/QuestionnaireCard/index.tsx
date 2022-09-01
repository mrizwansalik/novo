import { Input } from "reactstrap";
import { IPhqDocument } from "src/interfaces/benefit";
import {
  Container,
  CheckboxSection,
  CompanyImage,
  CompanyTitle,
  LayoutSpacing,
} from "./questionnaireCard.styles";

interface IQuestionnaireCardProps {
  phqDocument: IPhqDocument;
  onClick: () => void;
  isActive: boolean;
}

const DEFAULT_COMPANY_AVATAR: string = "/assets/images/default_logo_x2.png";
const QuestionnaireCard = (props: IQuestionnaireCardProps) => {
  const { phqDocument, onClick, isActive } = props;

  const companyAvatar: string =
    phqDocument?.carrier?.picture_thumbnail_512 || DEFAULT_COMPANY_AVATAR;

  return (
    <Container
      xl={{ size: 4 }}
      lg={{ size: 4 }}
      md={{ size: 4 }}
      sm={{ size: 12 }}
      xs={{ size: 12 }}
      onClick={onClick}
    >
      <LayoutSpacing>
        <CheckboxSection>
          <Input type="checkbox" checked={isActive} />
        </CheckboxSection>
        <CompanyImage source={companyAvatar} />
        <CompanyTitle>{phqDocument?.name}</CompanyTitle>
      </LayoutSpacing>
    </Container>
  );
};

export default QuestionnaireCard;
