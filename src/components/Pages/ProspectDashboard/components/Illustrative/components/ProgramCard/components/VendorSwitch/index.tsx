import { useEffect, useState } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { IVersion } from "src/interfaces/benefit";
import { truncateLongNames } from "src/utils/common";
import {
  Title,
  Description,
  TitleSection,
  SwitchButton,
} from "./vendorSwitch.styles";

export enum ViewMode {
  COLLAPSED = "collapsed",
  EXPAND = "expand",
}

interface IVendorSwitchProps {
  onClick: () => void;
  viewMode: ViewMode;
  version: IVersion;
}

const VendorSwitch = (props: IVendorSwitchProps) => {
  const { onClick, viewMode, version } = props;
  const [summary, setSummary] = useState("");

  useEffect(() => {
    let ingredientSummary = "No Vendors";
    if (get(version, "network_ingredients", []).length > 0) {
      ingredientSummary = get(
        version,
        "network_ingredients[0].network_ingredient.name"
      );
      if (version.network_ingredients.length > 1) {
        ingredientSummary +=
          ", " +
          get(version, "network_ingredients[1].network_ingredient.name") +
          ", ";
      }
      if (version.network_ingredients.length > 2) {
        ingredientSummary += get(
          version,
          "network_ingredients[2].network_ingredient.name"
        );
      }
    }
    setSummary(ingredientSummary);
  }, [version]);

  return (
    <RowNoSpacing>
      <ColNoSpacing md="12">
        <TitleSection md="12" onClick={onClick}>
          <Title>Vendors</Title>
          <SwitchButton
            active={viewMode === ViewMode.EXPAND}
            iconName="blue-chevron-up.png"
          />
        </TitleSection>
        {viewMode === ViewMode.EXPAND && (
          <Description md="12" onClick={onClick}>
            {truncateLongNames(summary)}
          </Description>
        )}
      </ColNoSpacing>
    </RowNoSpacing>
  );
};

export default observer(VendorSwitch);
