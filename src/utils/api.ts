import {
  cloneDeep,
  each,
  get,
  isArray,
  isDate,
  isNull,
  isObject,
  isUndefined,
} from "lodash";
import moment from "moment";

export function formatData(data, removeNullValues?: boolean) {
  //Do a deep copy
  let rval = cloneDeep(data);

  //First remove all null and undefined stuff
  if (isUndefined(removeNullValues) || removeNullValues) {
    Object.keys(rval).forEach((property) => {
      const value = rval[property];
      if (isNull(value) || isUndefined(value)) {
        delete rval[property];
      }
    });
  }

  each(rval, function (value, key) {
    //Do the dates
    if (isDate(value)) {
      rval[key] = moment(value).format("YYYY-MM-DD");
    }

    if (moment.isMoment(value)) {
      rval[key] = value.format("YYYY-MM-DD");
    }
    if (isObject(value)) {
      const id = get(value, "id");
      if (id) {
        rval[key] = id;
      }
    }

    //Flatten the arrays as well
    if (isArray(value)) {
      each(value, function (arrVal, arrKey) {
        const arrValId = get(arrVal, "id");
        if (isObject(arrVal) && !isUndefined(arrValId)) {
          value[arrKey] = arrValId;
        }
      });
    }
  });

  return rval;
}
