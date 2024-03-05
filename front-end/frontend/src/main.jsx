import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextApi from "./config/Context/ContextApi.jsx";
import { BrowserRouter } from "react-router-dom";

const divRoot = document.getElementById("root");
const root = ReactDOM.createRoot(divRoot);

root.render(
  <BrowserRouter>
    <ContextApi>
      <App />
    </ContextApi>
  </BrowserRouter>
);
