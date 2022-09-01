import { useHistory, useParams } from "react-router-dom";
import { IParamTypes } from "src/types";
import { ISideMenuChildren } from "../../interfaces";
import { handleEdit } from "../../utils";
import {
  Container,
  RemoveIcon,
  EditIcon,
  ProgramLabel,
} from "./subMenu.styles";

interface ISubMenuProps {
  sideMenuChildren: ISideMenuChildren;
  editMode?: boolean;
  routeId?: string;
  onDelete: (sideMenuChildren: ISideMenuChildren) => void;
}

const SubMenu = (props: ISubMenuProps) => {
  const { sideMenuChildren, editMode, routeId, onDelete } = props;
  const history = useHistory();
  const { brokerageId, prospectId, recipeId } = useParams<IParamTypes>();

  return (
    <Container>
      <RemoveIcon
        onClick={() => onDelete(sideMenuChildren)}
        iconName="red-trash.png"
      />
      {editMode && (
        <EditIcon
          onClick={() =>
            handleEdit(
              brokerageId,
              prospectId,
              recipeId,
              routeId,
              sideMenuChildren,
              history
            )
          }
          iconName="black_pencil.png"
        />
      )}
      <ProgramLabel>{sideMenuChildren?.title}</ProgramLabel>
    </Container>
  );
};

export default SubMenu;
