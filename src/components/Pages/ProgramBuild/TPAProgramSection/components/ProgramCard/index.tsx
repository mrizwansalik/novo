import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Collapse } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import { ITpa } from "src/interfaces/benefit";
import useStore from "src/utils/useStore";
import Contents from "./components/Contents";
import Header from "./components/Header";
import { Container } from "./programCard.styles";

interface IProgramCardProps {
  tpa: ITpa;
  tpaOrder: number;
  totalOfProviderAccesses: number;
  totalOfPharmacyBenefitManager: number;
  totalOfOthers: number;
}

const ProgramCard = (props: IProgramCardProps) => {
  const {
    tpa,
    tpaOrder,
    totalOfProviderAccesses,
    totalOfPharmacyBenefitManager,
    totalOfOthers,
  } = props;
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const { programBuildStore } = useStore();

  function handleClickCollapse(nextValue: boolean): void {
    setIsCollapse(nextValue);

    if (!nextValue) {
      programBuildStore.setTpasCollapsed(false);
    }
    setTimeout(() => {
      window?.scrollBy({ top: 0.5, left: 0, behavior: "smooth" });
    }, 500);
  }

  useEffect(() => {
    if (programBuildStore?.tpasCollapsed) {
      setIsCollapse(true);
    }
  }, [programBuildStore?.tpasCollapsed]);

  return (
    <Container>
      <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
        <Header
          tpa={tpa}
          tpaOrder={tpaOrder}
          isCollapse={isCollapse}
          setIsCollapse={(nextValue: boolean) => handleClickCollapse(nextValue)}
          totalOfProviderAccesses={totalOfProviderAccesses}
          totalOfPharmacyBenefitManager={totalOfPharmacyBenefitManager}
          totalOfOthers={totalOfOthers}
        />
      </ColNoSpacing>
      <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
        <Collapse isOpen={!isCollapse}>
          <Contents tpaOrder={tpaOrder} tpa={tpa} />
        </Collapse>
      </ColNoSpacing>
    </Container>
  );
};

export default observer(ProgramCard);
