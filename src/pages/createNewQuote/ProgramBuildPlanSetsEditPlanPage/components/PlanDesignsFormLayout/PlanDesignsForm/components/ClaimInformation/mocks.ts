export function getHeaderList() {
  const headerList = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Category Type",
      accessor: "categoryType",
    },
    {
      Header: "Year",
      accessor: "year",
    },
    {
      Header: "Upload date",
      accessor: "uploadDate",
    },
  ];

  return headerList;
}

export function getTableValues() {
  const rows = [
    {
      name: "Axe Capital - Illustrativ...",
      categoryType: "Axe Capital - Illustrative.xlsx",
      year: "Axe Capital - Illustrative.xlsx",
      uploadDate: "Axe Capital - Illustrative.xlsx",
    },
    {
      name: "Axe Capital - Illustrativ...",
      categoryType: "",
      year: "",
      uploadDate: "",
    },
    {
      name: "Axe Capital - Illustrativ...",
      categoryType: "",
      year: "",
      uploadDate: "",
    },
  ];

  return rows;
}
