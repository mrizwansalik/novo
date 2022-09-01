import get from "lodash/get";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { ISubNetwork } from "src/interfaces/network";
import useStore from "src/utils/useStore";
import ProgramCard from "./components/ProgramCard";
import { Container, CardWrapper, ProgramReference } from "./programList.styles";
import { isSubNetworkActive, handleClickProgramCard } from "./utils";

interface IProgramListProps {
  title: string;
  subNetworks: ISubNetwork[];
  selectedSubNetworks: ISubNetwork[];
}

export const ProgramList = (props: IProgramListProps) => {
  const { programBuildStore } = useStore();
  const { title, subNetworks, selectedSubNetworks } = props;
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const recipeId: string = get(params, "recipeId", "");

  async function onClickCard(
    subNetwork: ISubNetwork,
    status: boolean
  ): Promise<void> {
    try {
      programBuildStore.setLoadingProgress(0);
      await handleClickProgramCard(subNetwork, status, prospectId, recipeId);
      programBuildStore.fetchOrgRecipe(prospectId, recipeId);
      programBuildStore.setLoadingProgress(100);
    } catch (error) {
      programBuildStore.setLoadingProgress(0);
    }
  }

  return (
    <Container withSpacing={!title}>
      {title && subNetworks?.length > 0 && (
        <ProgramReference>{title}</ProgramReference>
      )}
      {Array.isArray(subNetworks) &&
        subNetworks?.map((subNetwork: ISubNetwork, index: number) => {
          const isActive = isSubNetworkActive(subNetwork, selectedSubNetworks);
          return (
            <CardWrapper key={index} xl="3" lg="4" md="4" sm="12" xs="12">
              <ProgramCard
                isChecked={isActive}
                onClick={() => onClickCard(subNetwork, isActive)}
                subNetwork={subNetwork}
              />
            </CardWrapper>
          );
        })}
    </Container>
  );
};

export default observer(ProgramList);
