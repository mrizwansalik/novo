export interface ICard {
  title: string;
  description: string;
  buttonLabel: string;
  withTooltip: boolean;
}

export const cards: ICard[] = [
  {
    title: "Match existing",
    description: "Start with existing plans and customize",
    buttonLabel: "Match",
    withTooltip: true,
  },
  {
    title: "Create your own",
    description: "Customize new plans",
    buttonLabel: "Create",
    withTooltip: false,
  },
];
