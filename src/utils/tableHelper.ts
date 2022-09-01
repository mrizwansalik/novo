import { get } from "lodash";
import { IOption } from "src/interfaces/common";

export function getOptionListFromArray<T>(
  items: Array<T>,
  valueProperty: string,
  labelProperty: string
): IOption[] {
  const options =
    Array.isArray(items) &&
    (items.map((item) => ({
      value: get(item, valueProperty),
      label: get(item, labelProperty),
    })) as IOption[]);

  return options;
}
