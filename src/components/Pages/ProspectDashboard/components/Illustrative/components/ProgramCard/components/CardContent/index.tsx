import React, { Fragment, useEffect, useState } from "react";
import { LoaderDots } from "@thumbtack/thumbprint-react";
import { get } from "lodash";
import { PROGRAM_TYPE } from "src/constants";
import { ICarrierPlan, IVersion } from "src/interfaces/benefit";
import SwitchButton, { ISwitchOption } from "../../../SwitchButton";
import ArrowSelect from "../ArrowSelect";
import {
  DividerNoSpacing,
  Container,
  SwitchButtonSpacing,
  SmallSpacing,
  ArrowSection,
  LoadingContainer,
} from "./cardContent.styles";
import GraphContent from "./components/GraphContent";
import TableContent from "./components/TableContent";

export enum ViewMode {
  GRAPH = "graph",
  LIST = "list",
  PENDING = "pending",
}
interface ICardContentProps {
  program: ICarrierPlan;
  version: IVersion;
  setProgramVersion: (version: IVersion) => void;
}

const CardContent = ({
  program,
  version,
  setProgramVersion,
}: ICardContentProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRAPH);
  const [stopLossDisplay, setStopLossDisplay] = useState([
    {
      value: "1",
      label: `Stop Loss`,
    },
  ]);

  const allVersions = get(program, "versions", []);
  const versionCount = allVersions.length;

  const viewOptions: ISwitchOption[] = [
    { label: "Graph", value: ViewMode.GRAPH },
    { label: "List", value: ViewMode.LIST },
  ];

  function handleViewMode(value: ViewMode) {
    if (viewMode !== ViewMode.PENDING) {
      setViewMode(value);
    }
  }

  function onChangeVersion(selected: string) {
    const selectedVersion = allVersions[Number(selected) - 1];
    setProgramVersion(selectedVersion);
  }

  useEffect(() => {
    const programPriceIsPending =
      get(version, "status") === PROGRAM_TYPE.PENDING;
    if (programPriceIsPending) {
      setViewMode(ViewMode.GRAPH);
    }
  }, [version]);

  useEffect(() => {
    if (versionCount) {
      const displayItems = allVersions.map((item: IVersion, index: number) => {
        const displayName = get(item, "display_name", "");
        return {
          value: (index + 1).toString(),
          label: `Stop Loss ${displayName}`,
        };
      });
      setStopLossDisplay(displayItems);
    }
  }, [program]);

  return (
    <Fragment>
      <SwitchButtonSpacing>
        <SwitchButton
          options={viewOptions}
          onChange={(value: ViewMode) => handleViewMode(value)}
        />
      </SwitchButtonSpacing>
      <Container>
        {viewMode === ViewMode.PENDING && (
          <LoadingContainer>
            <LoaderDots />
          </LoadingContainer>
        )}
        {viewMode === ViewMode.GRAPH && (
          <GraphContent program={program} version={version} />
        )}
        {viewMode === ViewMode.LIST && (
          <TableContent program={program} version={version} />
        )}
      </Container>
      <DividerNoSpacing>
        <hr />
      </DividerNoSpacing>
      <ArrowSection>
        <ArrowSelect options={stopLossDisplay} onChange={onChangeVersion} />
      </ArrowSection>
      <DividerNoSpacing>
        <SmallSpacing>
          <hr />
        </SmallSpacing>
      </DividerNoSpacing>
    </Fragment>
  );
};

export default CardContent;
