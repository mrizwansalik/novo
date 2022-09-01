import { NetworkCategory } from "src/constants";
import { INetworkIngredientWithTPAs } from "src/interfaces/network";
import { Container, Label, List } from "./categoriesTab.styles";
import { getCategoryColor } from "./utils";

interface ITpasIngredientProps {
  categoryId: NetworkCategory;
  categoryName: string;
  tpasIngredient: INetworkIngredientWithTPAs[];
}

const TpasIngredient = (props: ITpasIngredientProps) => {
  const { categoryId, categoryName, tpasIngredient } = props;
  const tpaNames: string = tpasIngredient
    ?.map((tpa: INetworkIngredientWithTPAs) => tpa?.name)
    ?.join(", ");

  return (
    <Container>
      <Label underlineColor={getCategoryColor(categoryId)}>
        <span>{`${categoryName}:`}</span>
      </Label>
      <List>{tpaNames}</List>
    </Container>
  );
};

export default TpasIngredient;
