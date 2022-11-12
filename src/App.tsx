import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Navigation } from "./components/Navigation/Navigation";

function App() {
  return (
    <Router>
      <Layout>
        <Navigation />
      </Layout>
    </Router>
  );
}

export default App;
