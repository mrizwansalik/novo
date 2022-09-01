import { IOrganization } from "../interfaces/organization";
import { api } from ".";

export async function fetchCurrentOrganization(): Promise<IOrganization> {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/api/v1/org/", {
      headers: { Authorization: `JWT ${token}` },
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
}
