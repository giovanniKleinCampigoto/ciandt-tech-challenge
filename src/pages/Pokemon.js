import React from "react";
import Box from "@mui/material/Box";
import MainCard from "../components/cards/MainCard";
import LoadingMainCard from "../components/loadingElements/LoadingMainCard";
import {getPokemon, getPokemonSpecies,} from "../resources/apiHelper";
import {useParams} from "react-router";
import {typeColors} from "../colors";

const Pokemon = () => {
    const {pokemonId} = useParams();
    const [pokemon, setPokemon] = React.useState({});
    const [species, setSpecies] = React.useState({});

    const [currDesc, setCurrDesc] = React.useState("");
    const [color, setColor] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        window.scrollTo(0, 0);

        (async function () {
            try {
                const data = await getPokemon(pokemonId);
                const specieData = await getPokemonSpecies(pokemonId);

                setCurrDesc(
                    specieData.flavor_text_entries.find(
                        (entry) => entry?.language?.name === "en"
                    )
                );
                setPokemon(data);
                setSpecies(specieData);

                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        })();
    }, [pokemonId]);

    React.useEffect(() => {
        if (pokemon.types) setColor(typeColors[pokemon.types[0].type.name]);
    }, [pokemon]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                {loading ? (
                    <LoadingMainCard/>
                ) : (
                    <MainCard pokemon={pokemon} color={color} species={species} description ={currDesc.flavor_text}/>
                )}
            </Box>
        </>
    );
};

export default Pokemon;
