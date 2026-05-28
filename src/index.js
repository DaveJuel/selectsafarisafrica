import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/flexboxgrid.min.css";
import "./style/index.css";
import "./i18n";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoadingSpinner from "./components/Elements/LoadingSpinner";

ReactDOM.render(
  <HelmetProvider>
    <Suspense fallback={<LoadingSpinner />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </HelmetProvider>,
  document.getElementById("root")
);

reportWebVitals();