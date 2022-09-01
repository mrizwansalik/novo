import { ISideMenuChildren } from "../../interfaces";
import {
  Container,
  RemoveIcon,
  EditIcon,
  ProgramLabel,
} from "./subMenu.styles";

interface ISubMenuProps {
  sideMenuChildren: ISideMenuChildren;
  editMode?: boolean;
  onDelete: (sideMenuChildren: ISideMenuChildren) => void;
}

const SubMenu = (props: ISubMenuProps) => {
  const { sideMenuChildren, editMode, onDelete } = props;

  return (
    <Container>
      <RemoveIcon
        onClick={() => onDelete(sideMenuChildren)}
        iconName="red-trash.png"
      />
      {editMode && <EditIcon iconName="black_pencil.png" />}
      <ProgramLabel>{sideMenuChildren?.title}</ProgramLabel>
    </Container>
  );
};

export default SubMenu;
