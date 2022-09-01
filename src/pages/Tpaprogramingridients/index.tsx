import TpasubHeader from "src/components/Header/components/TpaHeader";
import PageLayout from "src/components/PageLayout";
import TPAProgramIndredient from "src/components/Pages/TPAProgramIngredient";

const Tpaprogramingridients = (props) => {
  const { title } = props;

  return (
    <PageLayout title="TPA Program Ingredient | Novo Connection">
      <>
        <TpasubHeader title={title} />
        <TPAProgramIndredient />
      </>
    </PageLayout>
  );
};

export default Tpaprogramingridients;
