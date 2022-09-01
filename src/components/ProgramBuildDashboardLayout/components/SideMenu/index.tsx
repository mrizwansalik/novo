import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
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

interface ISideMenuProps {
  step?: number;
}

const SideMenu = ({ step }: ISideMenuProps) => {
  const history = useHistory();
  const { programBuildStore, programStore } = useStore();
  const routeParams = useParams<IParamTypes>();
  const { brokerageId, prospectId, recipeId } = routeParams;

  const newSideMenu = getSideMenuData(
    programBuildStore,
    programStore,
    brokerageId,
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
                routeParams,
                programBuildStore,
                programStore,
                sideMenuChildren,
                history
              )
            }
            isEditEnabled={step === 5 || step === 7}
            isCurrentStep={step === index + 1}
            key={index}
            sideMenuDetail={sideMenuDetail}
          />
        ))}
    </Container>
  );
};

export default observer(SideMenu);
