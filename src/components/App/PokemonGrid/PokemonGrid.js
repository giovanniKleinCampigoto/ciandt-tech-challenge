import React from 'react';
import styled from 'styled-components';
import PokemonCard from './PokemonCard';

const GridLayout = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px 10px;
`

const PokemonGrid = () => {
  return (
    <GridLayout>
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
    </GridLayout>
  );
}

export default PokemonGrid;
