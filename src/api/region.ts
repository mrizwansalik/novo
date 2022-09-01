import { api } from ".";

export async function getCities(
  searchTerm: string,
  region: string,
  country: string
): Promise<any[]> {
  try {
    const params = {
      q: searchTerm,
      region: region,
      country: country,
    };
    const response = await api.get(`/api/v1/cities/`, { params });
    return response.data.results;
  } catch (err) {
    return err.message;
  }
}

export async function getRegions(country: string): Promise<any[]> {
  try {
    const params = {
      country: country,
    };
    const response = await api.get(`/api/v1/regions/`, { params });
    return response.data;
  } catch (err) {
    return err.message;
  }
}
