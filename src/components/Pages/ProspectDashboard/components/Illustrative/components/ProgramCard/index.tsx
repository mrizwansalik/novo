import { useEffect, useState } from "react";
import ColNoSpacing from "src/components/ColNoSpacing";
import { PROGRAM_TYPE } from "src/constants";
import { ICarrierPlan, IVersion } from "src/interfaces/benefit";
import CardContent from "./components/CardContent";
import CardHeader from "./components/CardHeader";
import CardList from "./components/CardList";
import VendorSwitch from "./components/VendorSwitch";
import { ViewMode } from "./components/VendorSwitch";
import { Container, ContentLayout } from "./programCard.styles";
import { getCurrentProgramVersion } from "./utils";

interface IProgramCardProps {
  program: ICarrierPlan;
}

const ProgramCard = ({ program }: IProgramCardProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.EXPAND);
  const [programVersion, setProgramVersion] = useState<IVersion>();

  // TODO: Need logic for underwritten
  useEffect(() => {
    const currentVersion = getCurrentProgramVersion(
      program,
      PROGRAM_TYPE.ILLUST
    );
    setProgramVersion(currentVersion);
  }, [program]);

  return (
    <Container>
      <CardHeader program={program} />
      <ColNoSpacing md="12">
        <ContentLayout>
          {viewMode === ViewMode.EXPAND && (
            <CardContent
              program={program}
              version={programVersion}
              setProgramVersion={setProgramVersion}
            />
          )}
          {viewMode === ViewMode.COLLAPSED && (
            <CardList version={programVersion} />
          )}
        </ContentLayout>
      </ColNoSpacing>
      <VendorSwitch
        version={programVersion}
        viewMode={viewMode}
        onClick={() =>
          setViewMode(
            viewMode === ViewMode?.EXPAND
              ? ViewMode?.COLLAPSED
              : ViewMode?.EXPAND
          )
        }
      />
    </Container>
  );
};

export default ProgramCard;
