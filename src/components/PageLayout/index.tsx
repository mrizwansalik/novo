import React from "react";
import Helmet from "react-helmet";
import Header from "../Header";
import {
  ContentContainer,
  LoadingSpinner,
  StyledContainer,
} from "./pageLayout.style";

interface IPageLayoutProps {
  isLoading?: boolean;
  children: React.ReactElement;
  title?: string;
  hasGrayBackground?: boolean;
}

const PageLayout = (props: IPageLayoutProps) => {
  const { isLoading, children, title, hasGrayBackground } = props;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <StyledContainer hasGrayBackground={hasGrayBackground}>
        <Header />
        <ContentContainer>
          {isLoading && (
            <LoadingSpinner>
              <div></div>
            </LoadingSpinner>
          )}
          {children}
        </ContentContainer>
      </StyledContainer>
    </>
  );
};
export default PageLayout;
