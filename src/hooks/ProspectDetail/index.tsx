import { useEffect, useState } from "react";
import { get } from "lodash";
import { useParams } from "react-router";
import { getOrgDetail } from "src/api/org";
import { IOrg } from "src/interfaces/org";

const useProspectDetail = () => {
  const [prospectDetail, setProspectDetail] = useState<IOrg>();
  const params = useParams();
  const orgId = get(params, "orgId", "");

  async function handleProspectDetail(orgId: string) {
    const prospectDetail = await getOrgDetail(orgId);
    setProspectDetail(prospectDetail);
  }
  useEffect(() => {
    handleProspectDetail(orgId);
  }, [orgId]);

  return prospectDetail;
};

export default useProspectDetail;
