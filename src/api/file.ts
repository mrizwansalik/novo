import { FileAccessType } from "src/constants";
import { IFilePolicy } from "src/interfaces/file";
import { api, getAuthHeader } from ".";

export async function getFilestackPickPolicy(
  access: FileAccessType
): Promise<IFilePolicy> {
  try {
    const response = await api.post(
      `/api/v1/file-stack/policy/pick/`,
      { access },
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getBlobFromUrl(url: string): Promise<Blob> {
  try {
    const response = await api.get(url, { responseType: "blob" });
    return response.data;
  } catch (err) {
    return err.message;
  }
}
