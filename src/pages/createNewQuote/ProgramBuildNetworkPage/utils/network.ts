import { NetworkCategory } from "src/constants";
import { ISubNetwork } from "src/interfaces/network";
import { ISubNetworksTree } from "../interfaces";

export function buildSubNetworksTree(
  subNetworks: ISubNetwork[],
  searchKeyword: string = ""
): ISubNetworksTree {
  const subNetworkTypes: string[] = [
    NetworkCategory.REFERENCE_BASED_PRICING,
    NetworkCategory.SUB_NETWORK,
  ];

  const newSubNetworkTree: ISubNetworksTree = subNetworkTypes.reduce(
    (subNetworkTree: ISubNetworksTree, networkType: string) => {
      const filteredSubNetworks: ISubNetwork[] = Array.isArray(subNetworks)
        ? subNetworks?.filter(
            (subNetwork: ISubNetwork) =>
              subNetwork?.type === networkType &&
              subNetwork?.name
                ?.toLowerCase()
                ?.includes(searchKeyword?.toLowerCase())
          )
        : [];
      return { ...subNetworkTree, [networkType]: filteredSubNetworks };
    },
    {}
  );

  return newSubNetworkTree;
}
