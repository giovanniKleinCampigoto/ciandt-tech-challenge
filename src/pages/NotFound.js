import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import Link from "@mui/material/Link";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
            }}
        >
            <Typography
                fontFamily="monospace"
                fontWeight="500"
                fontSize="25px"
                m={5}
                align="center"
            >
                We couldn't find your pokemon :(
            </Typography>
            <Typography fontFamily="monospace" fontWeight="400" mt={2}>
                Click{" "}
                <Link
                    onClick={() => navigate(-1)}
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                >
                    here
                </Link>{" "}
                to go back.
            </Typography>
        </Box>
    );
};

export default NotFound;
