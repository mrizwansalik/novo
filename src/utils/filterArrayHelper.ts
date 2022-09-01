export function filterArray(items) {
  let filters = [];
  let obj = { label: "", value: "", sub_type: "" };
  for (let i = 0; i <= items.length; i++) {
    obj.label = items[i]?.name;
    obj.value = items[i]?.id;
    obj.sub_type = items?.sub_type;

    filters.push(obj);
    obj = { label: "", value: "", sub_type: "" };
  }
  return filters;
}
