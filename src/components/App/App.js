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
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getAllPokemons();
  }, [currentPage]);

  const getAllPokemons = async () => {
    try {
      const pokemonsData = await getPokemons(50, 50 * currentPage);
      const promisesArray = pokemonsData.results.map(async (pokemon) => {
        return await getPokemonDetails(pokemon.url);
      });
      const res = await Promise.all(promisesArray);
      setPokemons(res);
      setTotalPages(Math.ceil(pokemonsData.count / 50));

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
              <PokemonGrid 
                pokemons={ pokemons }
                currentPage={ currentPage }
                setCurrentPage={ setCurrentPage }
                totalPages={ totalPages }
              />
            </>
          }
          />
          <Route path="/:id" element={<PokemonDetails />}
          />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
