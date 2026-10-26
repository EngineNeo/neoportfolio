import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

// No offline caching: it served stale builds after deploys.
// scripts/sw-kill-switch.js removes the old worker from returning visitors.
serviceWorkerRegistration.unregister();
