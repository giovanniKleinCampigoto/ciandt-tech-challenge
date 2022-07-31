import React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import LaunchIcon from "@mui/icons-material/Launch";

import useContextMenu from "../../resources/hooks/useContextMenu";
import PokemonContext from "../../resources/context/PokemonContext";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";

export default function PokemonMenu() {
    const {anchorPoint, show} = useContextMenu();
    const navigate = useNavigate();
    const theme = useTheme();

    const {
        selectedPokemon,
        favoritePokemons,
        addToFavorites,
        removeFromFavorites,
    } = React.useContext(PokemonContext);

    const isFavorite = favoritePokemons.find(
        (fav) => fav.id === selectedPokemon.id
    );

    if (show) {
        return (
            <Paper
                sx={{
                    width: 320,
                    maxWidth: "100%",
                    top: anchorPoint.y,
                    left: anchorPoint.x,
                    position: "absolute",
                    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#2d333b",
                }}
            >
                {selectedPokemon ? (
                    <MenuList>
                        <MenuItem
                            onClick={() => navigate(`/pokemon/${selectedPokemon.id}`)}
                        >
                            <ListItemIcon>
                                <InfoIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>See more details</ListItemText>
                        </MenuItem>
                        {isFavorite ? (
                            <MenuItem onClick={() => removeFromFavorites(selectedPokemon)}>
                                <ListItemIcon>
                                    <HeartBrokenIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>Remove from favorites</ListItemText>
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={() => addToFavorites(selectedPokemon)}>
                                <ListItemIcon>
                                    <FavoriteIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>Add to favorites</ListItemText>
                            </MenuItem>
                        )}

                        <Divider/>
                        <MenuItem>
                            <ListItemIcon>
                                <LaunchIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText
                                onClick={() => window.open(`/pokemon/${selectedPokemon.id}`)}
                            >
                                Open in new tab
                            </ListItemText>
                        </MenuItem>
                    </MenuList>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "20px",
                        }}
                    >
                        <Typography align="center">
                            Right click on any pokemon card to display custom actions
                        </Typography>
                    </Box>
                )}
            </Paper>
        );
    } else {
        // selectPokemon(null);
        return <></>;
    }
}
