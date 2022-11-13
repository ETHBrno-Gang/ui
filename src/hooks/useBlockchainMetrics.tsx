import { useQuery } from "@tanstack/react-query";
import { BlockchainId } from "../constants/blockchains";

const getLast100DaysByOperator = async (id: string) =>
  (
    await fetch(
      `https://api.rated.network/v0/eth/operators/${id}/effectiveness?window=1d&size=100`
    )
  ).json();

const blockchainMetricsFetcher = async () => {
  const operators = await (
    await fetch(
      "https://api.rated.network/v0/eth/operators?window=all&idType=entity&size=100&from=0"
    )
  ).json();
  const operatorIds = operators.data.map(({ id }: { id: string }) => id);

  const operatorData = await Promise.all(
    operatorIds.map(getLast100DaysByOperator)
  );

  let nakamotoCoefficient = new Array();
  // Return last 100 days of nakamoto coefficient
  for (let day = 0; day < 100; day++) {
    const offset = day * (1000 * 60 * 60 * 24);
    const date = new Date(new Date().getTime() - offset);
    const formattedDate = date //`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    let operatorCount = 0;

    for (
      let cummulativeNetworkPenetration = 0;
      cummulativeNetworkPenetration <= 0.66 &&
      operatorCount < operatorIds.length;
      operatorCount++
    ) {
      const operatorNetworkPenetration =
        operatorData[operatorCount]?.data[day]?.networkPenetration;

      if (operatorNetworkPenetration !== undefined) {
        cummulativeNetworkPenetration +=
          operatorData[operatorCount]?.data[day]?.networkPenetration ||
          undefined;
      }
    }
    nakamotoCoefficient.push({ x: formattedDate, y: operatorCount });
  }

  return nakamotoCoefficient.reverse();
};

const useBlockchainMetrics = () => {
  const ratedNetworkResult = useQuery(["rated-network-operators"], {
    queryFn: blockchainMetricsFetcher,
  });

  return [ratedNetworkResult];
};

export { useBlockchainMetrics };
