import PageLayout from "src/components/PageLayout";
import TPAListPage from "src/components/Pages/TPAListPage";

import { Container, MainContent } from "./style";
const TPAListLayout = () => {
  return (
    <PageLayout title="TPA | Novo Connection">
      <Container>
        <MainContent>
          <TPAListPage />
        </MainContent>
      </Container>
    </PageLayout>
  );
};

export default TPAListLayout;
