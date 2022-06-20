import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/antd.css";
import "../src/styles/global.scss";
import { RootStoreContext } from "./contexts/rootStoreContext";
import { rootStore } from "./stores/rootStore";
import Interceptors from "./plugins/interceptors";

Interceptors.setup(rootStore);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RootStoreContext.Provider value={rootStore}>
      <App />
    </RootStoreContext.Provider>
  </React.StrictMode>
);
