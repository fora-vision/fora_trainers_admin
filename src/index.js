import React from "react";
import ReactDOM from "react-dom";
import "toastify-js/src/toastify.css";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { ThemeProvider } from "@gravity-ui/uikit";
import { I18nextProvider } from "react-i18next";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import i18n from "./i18n";

const userLanguage = navigator.language.slice(0, 2);
const supportedLanguages = ["en", "ru"];
const defaultLanguage = "en";
const language = supportedLanguages.includes(userLanguage) ? userLanguage : defaultLanguage;
i18n.changeLanguage(language);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme="light">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
