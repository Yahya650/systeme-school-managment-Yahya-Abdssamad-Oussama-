import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextApi from "./config/Context/ContextApi.jsx";
import "../public/assets/plugins/bootstrap/css/bootstrap.min.css";
import "../public/assets/plugins/feather/feather.css";
import "../public/assets/plugins/icons/flags/flags.css";
import "../public/assets/plugins/fontawesome/css/fontawesome.min.css";
import "../public/assets/plugins/fontawesome/css/all.min.css";
import "../public/assets/css/style.css";
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
