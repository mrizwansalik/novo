import { escapeRegExp, cloneDeep, get } from "lodash";

export function filterSearch(
  data,
  propertiesToFilter: string[],
  filterValue: string
) {
  const re = new RegExp(escapeRegExp(filterValue), "i");
  const clonedData = cloneDeep(data);

  const result = clonedData.filter((item) => {
    return propertiesToFilter.some((property) => re.test(get(item, property)));
  });

  return result;
}
