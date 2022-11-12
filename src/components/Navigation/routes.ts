interface Route {
  name: string;
  path: string;
}

const routes: Route[] = [
  {
    name: "Ethereum",
    path: "/ethereum",
  },
  {
    name: "Bitcoin",
    path: "/bitcoin",
  },
  {
    name: "Polkadot",
    path: "/polkadot",
  },
];

export { routes };
