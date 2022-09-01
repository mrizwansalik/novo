import { isArray, isBoolean, isObject, isString } from "lodash";
import { CONDENSE_TIER } from "src/constants";
import { condenseTiers } from "src/constants/number";

function getDecimalCharacter() {
  const decimalChar = 1.1;
  return decimalChar.toLocaleString().substring(1, 2);
}

function getNumberFromParam(param) {
  let paramValue;
  if (isString(param)) {
    paramValue = parseFloat(param);
  } else if (isFinite(param)) {
    paramValue = param;
  }
  return paramValue;
}

function getBoolFromParam(param) {
  let paramValue = false;
  if (isString(param)) {
    paramValue = String(param).toLowerCase() === "true";
  } else if (isBoolean(param)) {
    paramValue = param;
  }
  return paramValue;
}

function getStringFromParam(param) {
  if (isString(param)) {
    return param;
  }
  return "";
}

/*
  params:
    fraction_digits: (number) (default: 2)
        - this number of post-decimal digits will be shown

    force_fractions: (boolean) (default: false)
        - if true, post-decimal digits will always be shown
        - if false, post-decimal fraction will only be shown if non-zero

    condense: (boolean) (default: false)
        - if true, number will be condensed according to condense_tier

    condense_tier: (string) (default: 'k')
        - if 'k', numbers >= to 1,000 will be divided by 1,000 and have 'k' appended
        - if 'm', numbers >= to 1,000,000 will be divided by 1,000,000 and have 'm' appended
        - if 'b', numbers >= to 1,000,000,000 will be divided by 1,000,000,000 and have
            'b' appended
        - if 't', numbers >= to 1,000,000,000,000 will be divided by 1,000,000,000,000 and
            have 't' appended
    sig_figs: (boolean) (default: false)
        - if true, we will ignore forceFractions and fraction digits, and will display
        however many sig_fig_places are passed as a param regardless of decimal point.
    sig_fig_places: (number) (default: 3)
    - we will display this number of significant digits regardless of decimal point
*/

interface IFormatMoneyParams {
  fraction_digits?: number;
  force_fractions?: boolean;
  condense?: boolean;
  condense_tier?: CONDENSE_TIER;
  sig_figs?: boolean;
  sig_fig_places?: number;
}
export function formatMoney(
  input: string | number,
  params: IFormatMoneyParams
) {
  let number = 0;
  let str = "";
  let fractionDigits = 2;
  let forceFractions = false;
  let condense = false;
  let condenseTierIndex = -1;
  let sigFigs = false;
  let sigFigPlaces = 3;

  if (typeof input === "string") {
    number = parseFloat(input);
  } else if (typeof input === "number") {
    number = input;
  }

  if (!isFinite(number)) {
    number = 0;
  }

  // if params is an object, extract params
  // else if is a number, interpret as fractionDigits
  let paramFractionDigits;
  if (isObject(params) && !isArray(params)) {
    // get fraction digits
    paramFractionDigits = getNumberFromParam(params.fraction_digits);

    // get force fractions
    forceFractions = getBoolFromParam(params.force_fractions);

    // get condense
    condense = getBoolFromParam(params.condense);

    //get sigFigs
    sigFigs = getBoolFromParam(params.sig_figs);

    if (condense) {
      // get condense tier
      const paramCondense = getStringFromParam(
        params.condense_tier
      ).toLowerCase();
      condenseTierIndex = condenseTiers.findIndex((tier) => {
        return tier.str === paramCondense;
      });
      condenseTierIndex = Math.max(condenseTierIndex, 0);
    }
  } else {
    paramFractionDigits = getNumberFromParam(params);
  }

  if (isFinite(paramFractionDigits)) {
    fractionDigits = Math.max(paramFractionDigits, 0);
  }

  // handle condense division
  if (condenseTierIndex > -1) {
    const limit = condenseTierIndex;
    for (
      condenseTierIndex = condenseTiers.length - 1;
      condenseTierIndex > -1;
      --condenseTierIndex
    ) {
      if (condenseTierIndex < limit) {
        condenseTierIndex = -1;
        break;
      }

      if (number > condenseTiers[condenseTierIndex].value) {
        number /= condenseTiers[condenseTierIndex].value;
        break;
      }
    }
  }

  str = number.toString();
  let numFractionDigits = 0;
  let decimalChar = getDecimalCharacter();
  let decimalIndex = str.indexOf(decimalChar);
  let splitStr = str.split(decimalChar);
  let style;

  if (!sigFigs) {
    //if user has not specified sigFigs we do fractionDigits and forceFractions
    //if they have, we ignore fractionDigits and forceFractions

    // format post-decimal number
    let decimalNum = 0;
    if (decimalIndex > -1 && splitStr[1] && fractionDigits > 0) {
      if (splitStr[1].length > fractionDigits) {
        splitStr[1] = splitStr[1].slice(0, fractionDigits);
      }

      decimalNum = parseFloat(splitStr[1]);
      if (!isFinite(decimalNum)) {
        decimalNum = Math.max(decimalNum, 0);
      }
    }

    if (forceFractions || decimalNum > 0) {
      numFractionDigits = fractionDigits;
    }

    style = {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: numFractionDigits,
      maximumFractionDigits: numFractionDigits,
    };

    str = number.toLocaleString(undefined, style);
  } else {
    //get sigFig places, format number so that it shows correct num sig fig places regardless of decimal
    sigFigPlaces = getNumberFromParam(params.sig_fig_places);

    if (splitStr[0].length < sigFigPlaces) {
      str.slice(0, sigFigPlaces - 1);
    }

    style = {
      style: "currency",
      currency: "USD",
      minimumSignificantDigits: sigFigPlaces,
      maximumSignificantDigits: sigFigPlaces,
    };

    str = number.toLocaleString(undefined, style);
  }

  // handle condense character
  if (condenseTierIndex > -1) {
    str += condenseTiers[condenseTierIndex].str;
  }

  return str;
}
