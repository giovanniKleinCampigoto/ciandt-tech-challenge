import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import { getPokemonDetailsByID } from 'api';
import { useParams } from 'react-router-dom';

const DetailsLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${ (props => props.theme.seaBlue) };
  border-radius: 5px;
  padding: 20px;
`;

const DetailsHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
`;

const PokemonImage = styled.img`
  height: 100%;
  width: 100%;
  max-height: 350px;
  border-radius: 5px;
`;

const PokemonSummary = styled.div`
  margin: 0 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: left;
`

const BasicInfo = styled.div`
  border-right: 2px solid white;
`

const PokemonTypesContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const PokemonCharacteristics = styled.div`
  align-items: center;
  justify-content: start;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`

const PokemonType = styled.div`
  background-color: ${ (props => props.theme.white) };
  border-radius: 5px;
  margin-right: 5px;
  padding: 4px;
  text-transform: capitalize;
`;

const PokemonTraits = styled.div`
  div {
    margin: 5px 0;
  }
`;

const PokemonLocations = styled.div`
  ul {
    padding-inline-start: 20px;

    li {
      margin: 5px 0;
    }
  }
`;

const BattleInfo = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  padding-left: 20px;
`;

const PokemonStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  border-bottom: 2px solid white;
`;

const  PokemonStat = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`

const PokemonAbilities = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
`;

const PokemonAbility = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;


const PokemonDetails = () => {

  const [pokemonDetails, setPokemonDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchPokemonDetails();
    
  }, []);

  const fetchPokemonDetails = async () => {
    try {
      const data = await getPokemonDetailsByID(id);
      setPokemonDetails(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {
        pokemonDetails ? (
          <DetailsLayout>
            <DetailsHeader>
              <PokemonImage />
              <PokemonSummary>
                <BasicInfo>
                  <h1>{ pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.substring(1) }</h1>
                  <h2>Characteristics:</h2>
                  <PokemonCharacteristics>
                    <PokemonTraits>
                      <h3>Traits:</h3>
                      <div>
                        <strong>ID:</strong> { pokemonDetails.id }
                      </div>
                      <div>
                        <strong>Height:</strong> { pokemonDetails.height }
                      </div>
                      <div>
                        <strong>Weight:</strong> { pokemonDetails.weight }
                      </div>
                    </PokemonTraits>
                    <PokemonLocations>
                      <h3>Locations:</h3>
                      <ul>
                        <li>Cerulean Town</li>
                        <li>Palet Town</li>
                        <li>Other Town</li>
                      </ul>
                    </PokemonLocations>
                  </PokemonCharacteristics>
                  <h2>Types:</h2>
                  <PokemonTypesContainer>
                    <PokemonType>Type 1</PokemonType>
                    <PokemonType>Type 2</PokemonType>
                  </PokemonTypesContainer>
                </BasicInfo>
                <BattleInfo>
                  <h2>Stats:</h2>
                  <PokemonStats>
                    <PokemonStat>
                      <h3>Stat:</h3>
                      <span>Value</span>
                    </PokemonStat>
                    <PokemonStat>
                      <h3>Stat:</h3>
                      <span>Value</span>
                    </PokemonStat>
                    <PokemonStat>
                      <h3>Stat:</h3>
                      <span>Value</span>
                    </PokemonStat>
                    <PokemonStat>
                      <h3>Stat:</h3>
                      <span>Value</span>
                    </PokemonStat>
                    <PokemonStat>
                      <h3>Stat:</h3>
                      <span>Value</span>
                    </PokemonStat>
                    <PokemonStat>
                      <h3>Stat:</h3>
                      <span>Value</span>
                    </PokemonStat>
                  </PokemonStats>
                  <h2>Abilities:</h2>
                  <PokemonAbilities>
                    <PokemonAbility>
                      <h3>Ability:</h3>
                      <p>Strengthens grass moves to inflict 1.5× damage at 1/3 max HP or less.</p>
                    </PokemonAbility>
                    <PokemonAbility>
                      <h3>Ability:</h3>
                      <p>Strengthens grass moves to inflict 1.5× damage at 1/3 max HP or less.</p>
                    </PokemonAbility>
                    <PokemonAbility>
                      <h3>Ability:</h3>
                      <p>Strengthens grass moves to inflict 1.5× damage at 1/3 max HP or less.</p>
                    </PokemonAbility>
                    <PokemonAbility>
                      <h3>Ability:</h3>
                      <p>Strengthens grass moves to inflict 1.5× damage at 1/3 max HP or less.</p>
                    </PokemonAbility>
                  </PokemonAbilities>
                </BattleInfo>
              </PokemonSummary> 
            </DetailsHeader>
          </DetailsLayout>
        ) : (
          <LoaderContainer>
            <CircularProgress />
          </LoaderContainer>
        )
      }
    </>
  );
}

export default PokemonDetails;
