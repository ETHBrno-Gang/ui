type BlockchainId = "ethereum" | "bitcoin" | "polkadot";

interface Blockchain {
  name: string;
  path: string;
  id: BlockchainId;
}

const blockchains: Blockchain[] = [
  {
    name: "Ethereum",
    path: "/ethereum",
    id: "ethereum",
  },
  {
    name: "Bitcoin",
    path: "/bitcoin",
    id: "bitcoin",
  },
  {
    name: "Polkadot",
    path: "/polkadot",
    id: "polkadot",
  },
];

const getBlockchainById = (idToMatch: string): Blockchain => {
  const result = blockchains.find(({ id }) => id === idToMatch);
  if (!result) {
    throw new Error(`Blockchain with id ${idToMatch} not found`);
  }

  return result;
};

export { blockchains, getBlockchainById };
export type { Blockchain, BlockchainId };
