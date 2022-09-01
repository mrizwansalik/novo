import { isString } from "lodash";
import { getFilestackPickPolicy } from "src/api/file";
import { FileAccessType } from "src/constants";
import { IFilePolicy } from "src/interfaces/file";

export interface IStoreOption {
  location: string;
  access: FileAccessType;
  policy: string;
  signature: string;
  storePath: string;
  companionUrl: string;
}

export async function getAwsStoreOptions(access: FileAccessType) {
  const policy: IFilePolicy = await getFilestackPickPolicy(access);
  const storeOptions: IStoreOption = {
    location: "S3",
    access: FileAccessType.PRIVATE,
    policy: policy.policy,
    signature: policy.signature,
    storePath: "",
    companionUrl: "",
  };

  let storePath = process.env.REACT_APP_S3_URL;
  if (access === FileAccessType.PRIVATE) {
    storePath += "private/docs/";
  }
  if (access === FileAccessType.PUBLIC) {
    storePath += "media/profile_pictures/";
  }
  storeOptions.storePath = storePath;
  storeOptions.companionUrl = storePath;

  return storeOptions;
}

export function getS3FilePath(container, key) {
  let path;
  if (isString(container) && isString(key)) {
    path = "https://" + container + ".s3.amazonaws.com/" + key;
  }
  return path;
}
