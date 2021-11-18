import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App";
// import * as serviceWorker from "./serviceworker";

// // if ("serviceWorker" in navigator) {
// //   window.addEventListener("load", () => {
// //     navigator.serviceWorker.register("/serviceworker.js").then((reg) => {
// //       console.log("service worker registered!", reg);
// //     });
// //   });
// // }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// serviceWorker.register();
