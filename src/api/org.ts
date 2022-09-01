import { get, pickBy, isUndefined } from "lodash";
import { ICensusHuman } from "src/interfaces/census";
import { IFileFormat } from "src/interfaces/file";
import { IOrg, INewOrgRequest, INewOrgFormValues } from "../interfaces/org";
import { api, getAuthHeader } from ".";

export async function getOrgDetail(orgId?: string): Promise<IOrg> {
  try {
    let response;
    if (orgId) {
      response = await api.get(`/api/v1/org/${orgId}/`, getAuthHeader());
    } else {
      response = await api.get(`/api/v1/org/`, getAuthHeader());
    }
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function getOrgList(): Promise<IOrg> {
  try {
    let response = await api.get(`/api/v1/orgs/`, getAuthHeader());

    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateOrg(org: IOrg): Promise<IOrg> {
  org.city = get(org, "city.id");
  org.region = get(org, "region.id");
  org.country = get(org, "country.id");
  const orgData = pickBy(org, (property) => !isUndefined(property));
  const orgId = get(orgData, "id");

  try {
    if (orgId) {
      const response = await api.patch(
        `/api/v1/org/${orgId}/`,
        orgData,
        getAuthHeader()
      );
      return response.data;
    }

    //TODO: not sure what's this logic is, just copy the code logic, check later
    const response = await api.patch(`/api/v1/org/`, orgData, getAuthHeader());
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteAllOrgSimpleCensusHumans(
  orgId: string
): Promise<null> {
  try {
    const response = await api.delete(
      `/api/v1/org/${orgId}/census-humans/delete-all/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createNewOrg(org: INewOrgFormValues): Promise<IOrg> {
  const requestData: INewOrgRequest = {
    ...org,
    city: get(org, "city.id"),
    region: get(org, "region.id"),
    country: get(org, "country.id"),
    benefits_enabled: true,
    employer_identification_number: "",
    phone: "",
  };
  try {
    const response = await api.post(
      "/api/v1/org/",
      requestData,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function listOrgSimpleCensusHumans(
  orgId: string
): Promise<ICensusHuman[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/census-humans/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createOrgCensusHumans(
  orgId: string,
  humans: ICensusHuman[]
): Promise<ICensusHuman[]> {
  try {
    const response = await api.post(
      `/api/v1/org/${orgId}/census-humans/`,
      humans,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createOrgSimpleCensusFormat(
  orgId: string,
  format: IFileFormat
) {
  try {
    const response = await api.post(
      `/api/v1/org/${orgId}/simple-census-format/`,
      format,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateOrgSimpleCensusFormat(
  orgId: string,
  format: IFileFormat
) {
  const formatId = get(format, "id", "");
  try {
    const response = await api.patch(
      `/api/v1/org/${orgId}/simple-census-format/${formatId}/`,
      format,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateOrgSimpleCensusHuman(
  orgId: string,
  human: ICensusHuman
) {
  try {
    const response = await api.patch(
      `/api/v1/org/${orgId}/census-humans/${human.id}/`,
      human,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteOrgSimpleCensusHuman(
  orgId: string,
  humanId: string
) {
  try {
    const response = await api.delete(
      `/api/v1/org/${orgId}/census-humans/${humanId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteAllOrgCensusHuman(orgId: string) {
  try {
    const response = await api.delete(
      `/api/v1/org/${orgId}/census-humans/delete-all/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteOrgSimpleCensusFormat(
  orgId: string,
  formatId: string
) {
  try {
    const response = await api.delete(
      `/api/v1/org/${orgId}/simple-census-format/${formatId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getAllOrgSimpleCensusFormats(orgId: string) {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/simple-census-format/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
