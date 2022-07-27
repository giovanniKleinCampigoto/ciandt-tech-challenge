import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import App from "components/App";
import * as theme from "config/theme";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

  body {
    background-color: ${ (props) => props.theme.lightBlue };
    font-family: 'Roboto', sans-serif;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1rem;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={ theme }>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
