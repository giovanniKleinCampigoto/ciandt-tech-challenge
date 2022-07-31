import React from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Pokemon from "./pages/Pokemon.js";
import Home from "./pages/Home";

import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout.js";

import {createTheme, ThemeProvider} from "@mui/material/styles";
import {getDesignTokens} from "./resources/theme.js";


const App = () => {


    const theme = React.useMemo(() => createTheme(getDesignTokens('light')), []);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="pokemon/:pokemonId" element={<Pokemon/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
