import React from 'react';
import styled from 'styled-components';
import Paginator from './Paginator';
import PokemonCard from './PokemonCard';

const GridLayout = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px 10px;
`

const PokemonGrid = ({ pokemons, currentPage, setCurrentPage, totalPages }) => {

  const setPreviousPage = () => {
    const previousPage = currentPage - 1 > 0 ? currentPage - 1 : 0;
    setCurrentPage(previousPage);
  }

  const setNextPage = () => {
    const nextPage = currentPage + 1 < totalPages ? currentPage + 1 : totalPages -1;
    setCurrentPage(nextPage);
  }

  return (
    <>
      <GridLayout>
        {
          pokemons.map((pokemon, id) => (
            <PokemonCard key={id + 1} pokemon = { pokemon } />
          ))
        }
      </GridLayout>
      <Paginator currentPage={currentPage} totalPages={totalPages} setNextPage={setNextPage} setPreviousPage={setPreviousPage} />
    </>
  );
}

export default PokemonGrid;
