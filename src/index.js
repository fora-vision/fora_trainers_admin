import React from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

const theme = createTheme({
  typography: {
    fontWeightRegular: 500,
    fontFamily:
      "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n" +
      "    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n" +
      "    sans-serif",
  },
  palette: {
    primary: {
      main: '#7933d2'
    }
  }
});

const userLanguage = navigator.language.slice(0, 2);
const supportedLanguages = ["en", "ru"];
const defaultLanguage = "en";
const language = supportedLanguages.includes(userLanguage) ? userLanguage : defaultLanguage;
i18n.changeLanguage(language);

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
