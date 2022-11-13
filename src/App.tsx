import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Navigation } from "./components/Navigation/Navigation";
import { BlockchainDetail } from "./pages/BlockchainDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Layout>
        <Navigation />
        <BlockchainDetail />
      </Layout>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
