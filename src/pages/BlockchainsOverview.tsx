import { Container } from "@nextui-org/react";
import React from "react";
import LineChart from "../components/charts/LineChart/LineChart";
import { useBlockchainMetrics } from "../hooks/useBlockchainMetrics";

type Props = {};

// mock data
const data1 = [
  {
    x: "2018-03-01",
    y: 30,
  },
  {
    x: "2018-04-01",
    y: 16,
  },
  {
    x: "2018-05-01",
    y: 17,
  },
  {
    x: "2018-06-01",
    y: 24,
  },
  {
    x: "2018-07-01",
    y: 47,
  },
  {
    x: "2018-08-01",
    y: 32,
  },
  {
    x: "2018-09-01",
    y: 8,
  },
  {
    x: "2018-10-01",
    y: 27,
  },
  {
    x: "2018-11-01",
    y: 31,
  },
  {
    x: "2018-12-01",
    y: 105,
  },
  {
    x: "2019-01-01",
    y: 166,
  },
  {
    x: "2019-02-01",
    y: 181,
  },
  {
    x: "2019-03-01",
    y: 232,
  },
  {
    x: "2019-04-01",
    y: 224,
  },
  {
    x: "2019-05-01",
    y: 196,
  },
  {
    x: "2019-06-01",
    y: 211,
  },
];

const data2 = data1.map(({ x, y }) => ({ x, y: y + Math.random() * 50 }));
const data3 = data2.map(({ x, y }) => ({ x, y: y + Math.random() * 50 + 12 }));

const BlockchainsOverview = (props: Props) => {
  const [ratedNetworkResult] = useBlockchainMetrics();
  console.log(ratedNetworkResult.data);
  if(ratedNetworkResult.isLoading) {
    return <>Loading...</>
  }
  return (
    <Container>
      <LineChart
        name="Nakamoto coefficient"
        data={{
          ethereum: {
            dataset: ratedNetworkResult.data as any,
            color: "#039999",
          }
          // bitcoin: {
          //   dataset: data1,
          //   color: "#012345",
          // },
          // polkadot: {
          //   dataset: data3,
          //   color: "#f582d8",
          // },
        } as any}
      />
    </Container>
  );
};

export default BlockchainsOverview;
