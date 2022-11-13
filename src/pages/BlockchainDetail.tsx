import { Container, Text } from "@nextui-org/react";
import React from "react";
import { useLocation } from "react-router-dom";
import { blockchains } from "../constants/blockchains";
import BlockchainsOverview from "./BlockchainsOverview";

type Props = {};

const BlockchainDetail = (props: Props) => {
  const { pathname } = useLocation();
  const blockchain = blockchains.find(({ path }) => path === pathname);

  if (blockchain === undefined) {
    if (pathname === "/") {
      return <BlockchainsOverview />
    }
    return <Text>404</Text>; // TODO: handle
  }

  return (
    <Container>
      <Text h1 css={{mt: 8}}>{blockchain?.name}</Text>
      
    </Container>
  );
};

export { BlockchainDetail };
