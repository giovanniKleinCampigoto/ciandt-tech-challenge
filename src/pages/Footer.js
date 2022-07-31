import React from "react";

import Box from "@mui/material/Box";
import footer from "../images/footer/footer.svg";

const Footer = () => {

    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    height: "100px",
                    aspectRatio: 900 / 100,
                    backgroundImage: `url(${footer})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            />
        </Box>
    );
};
export default Footer;
