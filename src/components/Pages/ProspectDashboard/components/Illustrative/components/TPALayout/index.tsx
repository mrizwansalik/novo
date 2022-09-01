import { useState } from "react";
import { observer } from "mobx-react";
import { get } from "lodash";
import Icon from "src/components/Icon";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ITpa } from "src/interfaces/benefit";
import GridLayout from "./components/GridLayout";
import ListLayout from "./components/ListLayout";
import {
  Container,
  Layout,
  Label,
  ButtonSection,
  ListButton,
  GridButton,
} from "./tpaLayout.styles";

export enum ViewMode {
  LIST_VIEW = "list-view",
  GRID_VIEW = "grid-view",
}

interface ITPALayoutProps {
  tpa: ITpa;
}

const TPALayout = ({ tpa }: ITPALayoutProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.LIST_VIEW);

  const tpaName = get(tpa, "name");
  const programs = get(tpa, "programs");

  return (
    <Container>
      <Layout xl="12" lg="12" md="12" sm="12" xs="12">
        <RowNoSpacing>
          <Label xl="6" lg="6" md="6" sm="6" xs="6">
            {tpaName}
          </Label>
          <ButtonSection xl="6" lg="6" md="6" sm="6" xs="6">
            <ListButton onClick={() => setViewMode(ViewMode.LIST_VIEW)}>
              <Icon
                iconName={
                  viewMode === ViewMode.LIST_VIEW
                    ? "select-all-active.png"
                    : "select-all-grey.png"
                }
              />
            </ListButton>
            <GridButton onClick={() => setViewMode(ViewMode.GRID_VIEW)}>
              <Icon
                iconName={
                  viewMode === ViewMode.GRID_VIEW
                    ? "grid-grey-active.png"
                    : "grid-grey.png"
                }
              />
            </GridButton>
          </ButtonSection>
        </RowNoSpacing>
      </Layout>
      {viewMode === ViewMode.LIST_VIEW && (
        <Layout xl="12" lg="12" md="12" sm="12" xs="12">
          <ListLayout programs={programs} />
        </Layout>
      )}
      {viewMode === ViewMode.GRID_VIEW && (
        <Layout xl="12" lg="12" md="12" sm="12" xs="12">
          <GridLayout programs={programs} />
        </Layout>
      )}
    </Container>
  );
};

export default observer(TPALayout);
