export const layouts = [
  {
    label: "Claims History",
    description:
      "Entering claims data now will result in more accurate illustrative rates.",
  },
  {
    label: "PHQs",
    description:
      "PHQs will be required for underwriting if there is insufficient claims data.",
  },
];

export const monthsOptions = [
  {
    label: "Jan",
    value: 1,
  },
  {
    label: "Feb",
    value: 2,
  },
  {
    label: "Mar",
    value: 3,
  },
  {
    label: "Apr",
    value: 4,
  },
  {
    label: "May",
    value: 5,
  },
  {
    label: "Jun",
    value: 6,
  },
  {
    label: "Jul",
    value: 7,
  },
  {
    label: "Aug",
    value: 8,
  },
  {
    label: "Sep",
    value: 9,
  },
  {
    label: "Oct",
    value: 10,
  },
  {
    label: "Nov",
    value: 11,
  },
  {
    label: "Dec",
    value: 12,
  },
];

export const defaultMonthlyClaims = Array.from({ length: 12 }).map((_) => ({
  checked: true,
  amount: "",
}));
