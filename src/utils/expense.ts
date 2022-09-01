export function getEmptyExpense(feeType?, name?) {
  return {
    name: feeType === "broker" ? "Advisor Fee" : name ? name : "",
    amount_type: "fixed_per_employee_per_month",
    fee_type: feeType || "other",
    amount_text: "",
    amount_number: feeType === "broker" ? 35 : 0,
    group_size_amount: [],
    amount_children: 0,
    amount_employee: 0,
    amount_family: 0,
    amount_spouse: 0,
  };
}
