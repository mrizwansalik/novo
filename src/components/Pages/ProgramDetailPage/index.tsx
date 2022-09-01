import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import Expense from "./components/Expenses";
import Headers from "./components/Header";
import Plans from "./components/Plans";
import StopLoss from "./components/Stop-loss";
import SubHeader from "./components/SubHeader";
import {
  ProgramDetailContainer,
  SubHeaderContainer,
  MainContainer,
  Header,
} from "./style";

const ProgramDetail = () => {
  const { programId } = useParams<IParamTypes>();
  const { illustrativeStore } = useStore();

  const [orgPlans, setOrgplans] = useState([]);
  const { illustrative } = illustrativeStore;
  useEffect(() => {
    if (illustrative && illustrative.versions) {
      setOrgplans(illustrative?.versions[0]?.org_plans);
    }
  }, [illustrative]);
  return (
    <ProgramDetailContainer>
      <Headers />
      <MainContainer>
        <SubHeaderContainer>
          <SubHeader />
        </SubHeaderContainer>
        <Header>Stop-loss</Header>
        <SubHeaderContainer>
          <StopLoss />
        </SubHeaderContainer>
        <Header>Plans</Header>
        <SubHeaderContainer>
          {Array.isArray(orgPlans) &&
            orgPlans.map((item) => <Plans data={item} />)}
        </SubHeaderContainer>
        <Header>Expenses</Header>
        <SubHeaderContainer>
          <Expense />
        </SubHeaderContainer>
      </MainContainer>
    </ProgramDetailContainer>
  );
};

export default observer(ProgramDetail);
