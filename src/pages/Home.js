import React from "react";

import Typography from "@mui/material/Typography";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import LoadingPreviewCard from "../components/loadingElements/LoadingPreviewCard";
import UnknownPokemon from "../components/cards/UnknownPokemon";
import PokemonMenu from "../components/cards/PokemonMenu";
import SearchPokemons from "../components/SearchPokemons";
import PreviewCard from "../components/cards/PreviewCard";

import PokemonContext from "../resources/context/PokemonContext";
import {getPokemons} from "../resources/apiHelper";
import {useScrollToTop} from "../resources/hooks/useScrollToTop";

function Home() {
    const [pokemons, setPokemons] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filters, setFilters] = React.useState({name: "", type: ""});
    const [value, setValue] = React.useState(0);
    const [url, setUrl] = React.useState(
        "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0"
    );

    const {favoritePokemons} = React.useContext(PokemonContext);
    const {isVisible, scrollToTop} = useScrollToTop();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        (async function () {
            try {
                const data = await getPokemons(url);

                setPokemons([...pokemons, ...data]);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const searchType = (pokemon) => {
        const searchedType = pokemon.types.map((item) => {
            if (item.type.name === filters.type) return item;
            return null;
        });
        if (searchedType[0] || searchedType[1]) return true;
        return false;
    };

    const filteredPokemons = pokemons.filter((pokemon) => {
        if (filters.name === "" && filters.type === "") {
            return pokemon;
        } else if (filters.name !== "") {
            if (
                pokemon.name.toLocaleLowerCase() === filters.name.toLocaleLowerCase() ||
                pokemon.id.toString() === filters.name
            ) {
                if (filters.type === "") {
                    return pokemon;
                } else if (searchType(pokemon)) return pokemon;
            }
        } else if (filters.type !== "" && searchType(pokemon)) {
            return pokemon;
        }
        return null;
    });

    const handleNextFetch = () => {
        setLoading(true);
        setUrl(
            `https://pokeapi.co/api/v2/pokemon?limit=21&offset=${pokemons.length}`
        );
    };

    return (
        <>
            <SearchPokemons applyFilters={applyFilters} filters={filters}/>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
            >
                <Tab label="All Pokemons" sx={{textTransform: "none"}}/>
                <Tab label="Favorites" sx={{textTransform: "none"}}/>
            </Tabs>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    padding: "20px",
                }}
            >
                {value === 0 ? (
                    <>
                        {filteredPokemons.length !== 0
                            ? filteredPokemons.map((pokemon, index) => (
                                <PreviewCard
                                    pokemon={pokemon}
                                    key={`${pokemon.id}-${index}`}
                                />
                            ))
                            : pokemons.length > 0 && <UnknownPokemon/>}
                        {loading &&
                            [...Array(21)].map((el, ind) => <LoadingPreviewCard key={ind}/>)}
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "25px",
                            }}
                        >
                            <Button
                                endIcon={<DownloadIcon/>}
                                onClick={handleNextFetch}
                                variant="contained"
                                sx={{textTransform: "none"}}
                                disabled={loading}
                            >
                                Load more Pokemon's
                            </Button>
                        </Box>
                    </>
                ) : favoritePokemons.length !== 0 ? (
                    favoritePokemons.map((fav, index) => (
                        <PreviewCard pokemon={fav} key={`${fav.id}-${index}`}/>
                    ))
                ) : (
                    <>
                        <Typography
                            fontFamily="monospace"
                            fontWeight="400"
                            align="center"
                            fontSize="25px"
                        >
                            Seems like you don't have any favorite pokemon's yet.
                        </Typography>
                        <Typography
                            fontFamily="monospace"
                            fontWeight="400"
                            align="center"
                            fontSize="20px"
                            mt={3}
                        >
                            If you want to save them here, you can click on the heart icon in
                            the pokemon's details page, or while on the home page right-click
                            on the pokemon to open an special menu and you'll see the add to
                            favorites option.
                        </Typography>
                    </>
                )}
            </Box>

            <PokemonMenu/>
            {isVisible && (
                <Tooltip title="Scroll to top">
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{
                            margin: 0,
                            top: "auto",
                            right: 50,
                            bottom: 50,
                            left: "auto",
                            position: "fixed",
                        }}
                        onClick={scrollToTop}
                    >
                        <ArrowUpwardIcon/>
                    </Fab>
                </Tooltip>
            )}
        </>
    );
}

export default Home;
