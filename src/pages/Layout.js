import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import pokedex from "../images/title/pokedex.png";
import Footer from "./Footer";

import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";

const Layout = ({children}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Paper
            sx={{
                width: "100%",
                minHeight: "100vh",
                backgroundColor: theme.palette.background,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                borderRadius: "0px",
                overflowX: "hidden",
            }}
            elevation={3}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 3
                }}
            >

                <Button
                    variant="text"
                    disableFocusRipple
                    disableElevation
                    disableRipple
                    sx={{
                        marginTop: 2,
                        marginBottom: 6,
                        "&.MuiButtonBase-root:hover": {
                            bgcolor: "transparent",
                        },
                    }}
                    onClick={() => navigate(`/`)}
                >
                    <img
                        src={pokedex}
                        alt="pokedex"
                    />
                </Button>
                {children}
            </Container>
            <Footer/>
        </Paper>
    );
};

export default Layout;
