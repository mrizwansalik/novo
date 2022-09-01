import { observer } from "mobx-react";
import useStore from "src/utils/useStore";
import {
  Container,
  SwitchSection,
  SwitchWrapper,
  SwitchLabel,
  CategorySection,
  CategoryLabel,
  CategoryWrapper,
} from "./collapseHeader.styles";

const CollapseHeader = () => {
  const { programBuildTpaStore } = useStore();
  const { collapseAll } = programBuildTpaStore;

  function handleSwitchChange() {
    programBuildTpaStore.setCollapseAll(true);
  }

  return (
    <Container>
      <SwitchSection xl="4" lg="12" md="12" sm="12" xs="12">
        <SwitchWrapper
          width={50}
          height={26}
          offColor="#f7f7f7"
          onColor="#def8ff"
          checkedIcon={false}
          uncheckedIcon={false}
          disabled={collapseAll}
          onChange={handleSwitchChange}
          checked={collapseAll}
        />
        <SwitchLabel>Collapse all</SwitchLabel>
      </SwitchSection>
      <CategorySection xl="7" lg="12" md="12" sm="12" xs="12">
        <CategoryWrapper>
          <CategoryLabel xl="4" lg="4" md="4" sm="4" sx="12">
            Provider Access
          </CategoryLabel>
          <CategoryLabel xl="4" lg="4" md="4" sm="4" sx="12">
            PBMs
          </CategoryLabel>
          <CategoryLabel xl="4" lg="4" md="4" sm="4" sx="12">
            Vendors
          </CategoryLabel>
        </CategoryWrapper>
      </CategorySection>
    </Container>
  );
};

export default observer(CollapseHeader);
