import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { PokemonProvider } from "./resources/context/PokemonContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <PokemonProvider>
            <App />
        </PokemonProvider>
    </React.StrictMode>
);