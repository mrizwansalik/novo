import routes from "src/routes";

// TODO: Update url when open page
export const subHeaderItems = [
  {
    title: "Brokerages",
    url: routes.dashboard.god.brokerages.list.value,
  },
  {
    title: "TPAs",
    url: routes.dashboard.god.tpa.list.value,
  },
  {
    title: "Carriers",
    url: routes.dashboard.god.carriers.list.value,
  },
  // {
  //   title: "Edit Carrier",
  //   url: routes.dashboard.god.carriers.edit.value,
  // },
  {
    title: "Program Ingredients",
    url: routes.dashboard.god.programIngredients.list.value,
  },
  // {
  //   title: "Product Metrics",
  //   url: routes.dashboard.god.orgs.quoteMetrics.value,
  // },
];

export const TPA = [
  {
    title: "Program Ingredients",
    url: routes.dashboard.god.tpa.programingredients.value,
  },
];
