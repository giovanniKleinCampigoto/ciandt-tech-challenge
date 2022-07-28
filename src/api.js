export const getPokemons = async (limit = 52, offset = 0) => {
  try {
    const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    const res = await fetch(endpoint);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const searchPokemon = async (pokemon) => {
  try {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const res = await fetch(endpoint);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getPokemonDetails = async (endpoint) => {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getPokemonDetailsByID = async (id) => {
  try {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(endpoint);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}