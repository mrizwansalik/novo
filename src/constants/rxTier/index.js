export const rxTierFields = [
  {
    name: "Preventative",
    mapping: "medical_plan.rx_preventative",
    default: 0,
  },
  {
    name: "Generic",
    mapping: "medical_plan.rx_generic",
    default: 5,
  },
  {
    name: "Preferred",
    mapping: "medical_plan.rx_preferred",
    default: 15,
  },
  {
    name: "Non-Preferred",
    mapping: "medical_plan.rx_non_preferred",
    default: 25,
  },
  {
    name: "Specialty",
    mapping: "medical_plan.rx_specialty",
    default: 75,
  },
];

export const RX_TIER_OPTIONS = [
  {
    label: "Preventative.Generic.Preferred.Non-preferred.Specialty",
    value: "preventative_generic_preferred_non_preferred_specialty",
    fields: [
      _.find(rxTierFields, { mapping: "medical_plan.rx_preventative" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_generic" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_preferred" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_non_preferred" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_specialty" }),
    ],
  },
  {
    label: "Preventative.Generic.Preferred.Non-preferred",
    value: "preventative_generic_preferred_non_preferred",
    fields: [
      _.find(rxTierFields, { mapping: "medical_plan.rx_preventative" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_generic" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_preferred" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_non_preferred" }),
    ],
  },
  {
    label: "Generic.Preferred.Non-preferred.Specialty",
    value: "generic_preferred_non_preferred_specialty",
    fields: [
      _.find(rxTierFields, { mapping: "medical_plan.rx_generic" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_preferred" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_non_preferred" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_specialty" }),
    ],
  },
  {
    label: "Generic.Preferred.Non-preferred",
    value: "generic_preferred_non_preferred",
    fields: [
      _.find(rxTierFields, { mapping: "medical_plan.rx_generic" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_preferred" }),
      _.find(rxTierFields, { mapping: "medical_plan.rx_non_preferred" }),
    ],
  },
  {
    label: "None",
    value: "",
    fields: ["medical_plan.rx_tier"],
  },
];
