import axios from "axios";

export const getPokemons = async (url) => {
    const data = await axios.get(url).then((res) => res.data);

    const promises = data.results.map((result) => axios.get(result.url));

    return await Promise.all(promises).then((res) =>
        res.map((pokemon) => pokemon.data)
    );
};

export const getPokemon = async (id) => {
    return await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.data);
};

export const getPokemonSpecies = async (id) => {
    return await axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((res) => res.data);
};