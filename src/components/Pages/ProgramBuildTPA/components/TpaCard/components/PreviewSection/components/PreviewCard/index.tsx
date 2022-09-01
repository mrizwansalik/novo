import { Fragment } from "react";
import get from "lodash/get";
import { NetworkCategory } from "src/constants";
import { INetworkIngredientWithTPAs } from "src/interfaces/network";
import { getNetworkCategoryLabel } from "src/pages/createNewQuote/ProgramBuildThirdPartyAdministratorsPage/utils";
import CategoriesTab from "../CategoriesTab";
import {
  Container,
  Title,
  Description,
  CategoryWrapper,
} from "./previewCard.styles";

interface IPreviewCardProps {
  title: string;
  description?: string;
  networkCategoryTree: Record<NetworkCategory, INetworkIngredientWithTPAs[]>;
  categoriesKeys: string[];
}

const PreviewCard = (props: IPreviewCardProps) => {
  const { title, description, networkCategoryTree, categoriesKeys } = props;

  return (
    <Container>
      <Title xl={12} lg={12} md={12} sm={12} xs={12}>
        {title}
      </Title>
      {description && (
        <Description xl={12} lg={12} md={12} sm={12} xs={12}>
          {description}
        </Description>
      )}
      {Array.isArray(categoriesKeys) &&
        categoriesKeys?.map((categoriesKey: NetworkCategory, index: number) => {
          const tpasIngredientByCategory: INetworkIngredientWithTPAs[] = get(
            networkCategoryTree,
            `${categoriesKey}`,
            []
          );

          return (
            <Fragment key={index}>
              {Array.isArray(tpasIngredientByCategory) &&
                tpasIngredientByCategory?.length > 0 && (
                  <CategoryWrapper
                    key={index}
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                  >
                    <CategoriesTab
                      categoryId={categoriesKey}
                      categoryName={getNetworkCategoryLabel(categoriesKey)}
                      tpasIngredient={tpasIngredientByCategory}
                    />
                  </CategoryWrapper>
                )}
            </Fragment>
          );
        })}
    </Container>
  );
};

export default PreviewCard;
