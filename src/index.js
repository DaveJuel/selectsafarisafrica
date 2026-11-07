// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/flexboxgrid.min.css";
import "./style/index.css";
import { applyUserLanguage } from "./i18n";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootEl = document.getElementById("root");

const app = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

if (rootEl.hasChildNodes()) {
  ReactDOM.hydrate(app, rootEl); // prerendered route
} else {
  ReactDOM.render(app, rootEl); // 200.html fallback, dev server, booking/invoice pages
}

// Switch to the user's language only after the first render so hydration matches the snapshot.
// Non-English users see English briefly before translations load. This is the trade-off for indexable HTML.
if (!window.__PRERENDER__) applyUserLanguage();

reportWebVitals();