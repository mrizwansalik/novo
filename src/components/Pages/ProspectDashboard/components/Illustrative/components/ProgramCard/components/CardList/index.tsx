import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { IVersion } from "src/interfaces/benefit";
import ArrowSelect from "../ArrowSelect";
import {
  Container,
  Layout,
  ArrowSection,
  DividerNoSpacing,
} from "./cardList.styles";
import Rows from "./components/Rows";

interface ILabel {
  label: string;
}

interface ICardListProps {
  version: IVersion;
}

const CardList = (props: ICardListProps) => {
  const { version } = props;
  const [currentPage, setCurrentPage] = useState("1");
  const [arrowTabs, setArrowTabs] = useState([
    {
      value: "1",
      label: "",
    },
  ]);

  const networkIngredients = get(version, "network_ingredients", []);
  const pageCount = Math.ceil(networkIngredients.length / 6);

  const itemsToShow = networkIngredients.slice(
    (Number(currentPage) - 1) * 6,
    Number(currentPage) * 6
  );

  useEffect(() => {
    if (pageCount > 0) {
      let tabs = [];
      for (let i = 1; i <= pageCount; i++) {
        tabs.push({
          value: i.toString(),
          label: "",
        });
      }
      setArrowTabs(tabs);
    }
  }, [pageCount]);

  return (
    <Container>
      <Layout md="12">
        {Array.isArray(itemsToShow) &&
          itemsToShow.map((networkIngredient, index: number) => {
            const title = get(networkIngredient, "network_ingredient.name", "");
            return <Rows key={index} title={title} />;
          })}
      </Layout>
      <ArrowSection md="12">
        <ArrowSelect
          options={arrowTabs}
          onChange={(value) => setCurrentPage(value)}
        />
        <DividerNoSpacing>
          <hr />
        </DividerNoSpacing>
      </ArrowSection>
    </Container>
  );
};

export default CardList;
