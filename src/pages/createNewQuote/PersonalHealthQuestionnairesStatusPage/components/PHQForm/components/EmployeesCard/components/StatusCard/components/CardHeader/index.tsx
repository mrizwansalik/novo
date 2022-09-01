import { useFormContext } from "react-hook-form";
import { IAssignedDocumentsTree } from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import {
  Container,
  CommonCheckbox,
  FlagIcon,
  Label,
} from "./cardHeader.styles";
import { handleChangeCheckbox } from "./utils";
interface ICardHeaderProps {
  title: string;
  users: IAssignedDocumentsTree[];
}

const CardHeader = (props: ICardHeaderProps) => {
  const { setValue } = useFormContext();
  const { title, users } = props;

  return (
    <Container>
      <CommonCheckbox
        onChange={(event) =>
          handleChangeCheckbox(users, setValue, event?.target?.checked)
        }
        type="checkbox"
      />
      <FlagIcon iconName="grey-flag.png" />
      <Label>{title}</Label>
    </Container>
  );
};

export default CardHeader;
