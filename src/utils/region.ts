import { each, isArray, isNumber, isObject, isString } from "lodash";
import { countries, defaultCountry, usStates } from "src/constants";
import { IRegion } from "../interfaces/location";

export function mapRegionsToReactSelectProps(regions: IRegion[]) {
  return regions.map((item) => {
    item.value = item.id;
    item.label = item.name;
    return item;
  });
}

export function getIsoCountry(country: IRegion) {
  if (country) {
    if (isString(country)) {
      return country.trim().toUpperCase();
    }
    if (isObject(country) && country.id) {
      const found = getCountry(country.id);
      if (found.iso3166) {
        return found.iso3166;
      }
    }
  }
  return defaultCountry.iso3166;
}

export function getCountry(countryId) {
  const rval = countries.find((country) => country.id === countryId);
  return rval;
}

export function isValidZip(zip) {
  const zipPrefixNum = getZipPrefix(zip);
  return (
    isInZipPrefixRange(zipPrefixNum) &&
    getUsedZipPrefixMap(usStates)[zipPrefixNum] === true
  );
}

export function getZipPrefix(zip) {
  // convert zip from string or number
  let zipString = "";
  if (isString(zip)) {
    zipString = zip;
  } else if (isNumber(zip) && zip % 1 === 0) {
    zipString = zip.toString();
  } else {
    return -1;
  }

  // valid length?
  if (zipString.length !== 5) {
    return -1;
  }

  const zipPrefix = zipString.substr(0, 3);
  const zipPrefixNum = parseInt(zipPrefix);
  if (isFinite(zipPrefixNum)) {
    return zipPrefixNum;
  }
  return -1;
}

export function isInZipPrefixRange(num) {
  return num > -1 && num < 1000;
}

export function getUsedZipPrefixMap(states) {
  let prefixMap = {};

  each(states, function (state) {
    getZipPrefixMapForState(state, prefixMap);
  });

  return prefixMap;
}

export function getZipPrefixMapForState(state, mergeMap) {
  let statePrefixMap = {};
  if (!isValidStateObject(state)) {
    state = findState(state);
  }

  if (state) {
    let toks = state.zip_prefixes.split(",");
    for (let i = 0; i < toks.length; ++i) {
      let tok = toks[i].trim();

      // is it a range?
      if (tok.indexOf("-") > -1) {
        const rangeNumbers = tok.split("-");
        if (rangeNumbers.length === 2) {
          const min = parseInt(rangeNumbers[0]);
          const max = parseInt(rangeNumbers[1]);
          if (isInZipPrefixRange(min) && isInZipPrefixRange(max) && min < max) {
            for (let n = min; n < max + 1; ++n) {
              statePrefixMap[n] = true;
              if (isObject(mergeMap)) {
                mergeMap[n] = true;
              }
            }
          }
        }
      } else {
        // is it prefixed with = ?
        if (tok.charAt(0) === "=") {
          // remove =
          tok = tok.substr(1);
          // get first 3
          if (tok.length === 5) {
            tok = tok.substr(0, 3);
          }
        }
        const num = parseInt(tok);
        if (isInZipPrefixRange(num)) {
          statePrefixMap[num] = true;
          if (isObject(mergeMap)) {
            mergeMap[num] = true;
          }
        }
      }
    }
  }

  return statePrefixMap;
}

export function isValidStateObject(state: IRegion) {
  return (
    isObject(state) &&
    isFinite(state.id) &&
    isString(state.geoname_code) &&
    isString(state.zip_prefixes)
  );
}

export function findState(state: IRegion) {
  // get state code & id
  let id, code;
  if (isObject(state) && !isArray(state)) {
    id = state.id;
    code = state.code;
  } else if (isString(state)) {
    code = state;
  } else if (isNumber(state)) {
    id = state;
  }

  // if have neither, return empty
  if (!id && !code) {
    return undefined;
  }

  const findParams = { id: 0, geoname_code: "" };
  if (id) {
    findParams.id = id;
  }
  if (code) {
    findParams.geoname_code = code.toUpperCase();
  }

  return usStates.find(
    (state) =>
      state.id === findParams.id &&
      state.geoname_code === findParams.geoname_code
  );
}

export function formatPhoneNumber(phoneNumberString: string): string {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
}
