import {useContext} from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PokemonContext from "../../resources/context/PokemonContext";
import PokemonType from "../PokemonType";
import {capitalizeFirstLetter, formatNumber,} from "../../resources/pokemonHelper";
import {typeColors} from "../../colors";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import Fade from "@mui/material/Fade";

const PreviewCard = ({pokemon}) => {
    const {selectPokemon, favoritePokemons} = useContext(PokemonContext);

    const navigate = useNavigate();

    const cardColor = typeColors[pokemon.types[0].type.name];
    const hoverColor = typeColors.hover[pokemon.types[0].type.name];

    const isFavorite = favoritePokemons.find((fav) => fav.id === pokemon.id);

    return (
        <Fade in timeout={500}>
            <Card
                raised
                sx={{
                    width: "275px",
                    height: "200px",
                    margin: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: cardColor,
                    borderRadius: "15px",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: hoverColor,
                    },
                }}
                component={motion.div}
                whileHover={{
                    scale: 1.2,
                    transition: {duration: 0.3},
                }}
                onContextMenu={() => selectPokemon(pokemon)}
                onClick={() => navigate(`/pokemon/${pokemon.id}`)}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "85%",
                    }}
                >
                    <Typography
                        color="#fff"
                        fontFamily="monospace"
                        fontWeight={700}
                        fontSize={20}
                    >
                        {capitalizeFirstLetter(pokemon.name)}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        {isFavorite && (
                            <FavoriteIcon
                                fontSize="small"
                                sx={{marginRight: "5px", color: "#7C0D0E"}}
                            />
                        )}

                        <Typography
                            color="#fff"
                            fontFamily="monospace"
                            fontWeight={700}
                            fontSize={20}
                        >
                            {formatNumber(pokemon.id)}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "90%",
                    }}
                >
                    <Box>
                        {pokemon.types.map((pokemon, index) => (
                            <PokemonType
                                type={pokemon.type.name}
                                key={`${pokemon.type.name}-${index}`}
                            />
                        ))}
                    </Box>
                    <img
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        alt="pokemon"
                        height="130px"
                        width="130px"
                    />
                </Box>
            </Card>
        </Fade>
    );
};

export default PreviewCard;
