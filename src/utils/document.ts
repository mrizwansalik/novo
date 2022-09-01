import { isString } from "lodash";
const TAG_SPLIT_CHAR = " ";

export function cleanTag(tag) {
  let rval = "";
  if (isString(tag)) {
    rval = tag.replace(" ", "");
    if (rval) {
      rval = rval.toLowerCase();
    }
  }
  return rval;
}

export function hasTag(doc, tag) {
  if (
    doc &&
    isString(doc.tags) &&
    doc.tags.length > 0 &&
    isString(tag) &&
    tag.length > 0
  ) {
    const split = doc.tags.split(TAG_SPLIT_CHAR);
    for (let i = 0; i < split.length; ++i) {
      if (split[i] === tag) {
        return true;
      }
    }
  }
  return false;
}

export function addTag(doc, tag) {
  if (doc && isString(doc.tags) && isString(tag) && tag.length > 0) {
    const cleanedTag = cleanTag(tag);
    if (cleanedTag.length > 0 && !hasTag(doc, cleanedTag)) {
      if (doc.tags) {
        doc.tags += TAG_SPLIT_CHAR;
      }
      doc.tags += cleanedTag;
      return true;
    }
  }
  return false;
}
