import { api, getAuthHeader } from ".";

export async function getQouteRFPs(orgId: string) {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/benefits/rfps/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getQouteOrg(orgId: string) {
  try {
    const response = await api.get(`/api/v1/org/${orgId}/`, getAuthHeader());
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getRfpSet(orgId: string) {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/benefits/rfp-sets/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function updateQouteRFPs(orgId: string, rfpId: string, data: any) {
  try {
    const response = await api.patch(
      `/api/v1/org/${orgId}/benefits/rfps/${rfpId}/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function deleteQouteRFPs(orgId: string, rfpId: string) {
  try {
    const response = await api.delete(
      `/api/v1/org/${orgId}/benefits/rfps/${rfpId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function getLasers(orgId: string, rfpId: string) {
  try {
    const response = await api.get(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/lasers/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function addLasers(orgId: string, rfpId: string, data: any) {
  try {
    const response = await api.post(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/lasers/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function updateLasers(
  orgId: string,
  rfpId: string,
  laserId: string,
  data: any
) {
  try {
    const response = await api.patch(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/lasers/${laserId}/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function deleteLasers(
  orgId: string,
  rfpId: string,
  laserId: string
) {
  try {
    const response = await api.delete(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/lasers/${laserId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function getRates(orgId: string, rfpId: string) {
  try {
    const response = await api.get(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/rates/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function addRates(orgId: string, rfpId: string, data: any) {
  try {
    const response = await api.post(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/rates/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function updateRates(
  orgId: string,
  rfpId: string,
  rateId: string,
  data: any
) {
  try {
    const response = await api.patch(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/rates/${rateId}/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function deleteRates(
  orgId: string,
  rfpId: string,
  rateId: string
) {
  try {
    const response = await api.delete(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/rates/${rateId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function getProposals(orgId: string, rfpId: string) {
  try {
    const response = await api.get(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/proposals/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function addProposals(orgId: string, rfpId: string, data: any) {
  try {
    const response = await api.post(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/proposals/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function updateProposals(
  orgId: string,
  rfpId: string,
  proposalId: string,
  data: any
) {
  try {
    const response = await api.patch(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/proposals/${proposalId}/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function deleteProposals(
  orgId: string,
  rfpId: string,
  proposalId: string
) {
  try {
    const response = await api.delete(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/proposals/${proposalId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getMessages(orgId: string, rfpId: string) {
  try {
    const response = await api.get(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/messages/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createMessage(orgId: string, rfpId: string, data: any) {
  try {
    const response = await api.post(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/messages/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function createMessageAllRfps(
  orgId: string,
  rfpId: string,
  data: any
) {
  try {
    const response = await api.post(
      `api/v1/org/${orgId}/benefits/rfps/${rfpId}/messages/send-to-all/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
