import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import React, { useState, useEffect} from 'react';
import Navbar from "./Navbar";
import PokemonGrid from "./PokemonGrid";
import Searchbar from "./Searchbar";
import PokemonDetails from "pages/PokemonDetails";
import { getPokemons } from 'api';
import { getPokemonDetails } from 'api';

function App() {
  const [ pokemons, setPokemons ] = useState([]);

  useEffect(() => {
    getAllPokemons();
  }, []);

  const getAllPokemons = async () => {
    try {
      const pokemonsData = await getPokemons();
      const promisesArray = pokemonsData.results.map(async (pokemon) => {
        return await getPokemonDetails(pokemon.url);
      });
      const res = await Promise.all(promisesArray);
      setPokemons(res);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Searchbar />
              <PokemonGrid pokemons={ pokemons }/>
            </>
          }
          />
          <Route path="/description" element={<PokemonDetails />}
          />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
