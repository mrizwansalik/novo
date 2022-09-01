import { observer } from "mobx-react";
import { useParams } from "react-router";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import MenuCard from "./components/MenuCard";
import { ISideMenu, ISideMenuChildren } from "./interfaces";
import { Container } from "./sideMenu.styles";
import { getSideMenuData, handleDeleteSubNetwork } from "./utils";

export interface IProgram {
  title: string;
}

export interface IRecipe {
  title: string;
  checked: boolean;
  programs: IProgram[];
}

const SideMenu = () => {
  const { programBuildStore, programStore } = useStore();
  const { orgId, prospectId, recipeId } = useParams<IParamTypes>();
  const newSideMenu = getSideMenuData(
    programBuildStore,
    programStore,
    orgId,
    prospectId,
    recipeId
  );

  return (
    <Container>
      {Array.isArray(newSideMenu) &&
        newSideMenu?.map((sideMenuDetail: ISideMenu, index: number) => (
          <MenuCard
            onDelete={(sideMenuChildren: ISideMenuChildren) =>
              handleDeleteSubNetwork(
                sideMenuDetail?.routeId,
                prospectId,
                recipeId,
                programBuildStore,
                sideMenuChildren
              )
            }
            key={index}
            sideMenuDetail={sideMenuDetail}
          />
        ))}
    </Container>
  );
};

export default observer(SideMenu);
