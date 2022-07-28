import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import { getPokemonDetailsByID, getPokemonDetails } from 'api';
import { useNavigate, useParams } from 'react-router-dom';
import capitalize from 'helpers/utils/capitalize';

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
  justify-content: flex-start;

  h3 {
    margin-right: 10px;
  }
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
  background-color: ${(props) => props.theme.white};
  margin: 5px;
  padding: 5px;
  border-radius: 25px;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.button`
  width: 50px;
  height: 50px;
  margin: 10px;
  background-color: ${(props) => props.theme.darkBlue};
  color: ${(props) => props.theme.white};
  border: none;
  border-radius: 100px;
  cursor: pointer;
`


const PokemonDetails = () => {

  const [pokemonDetails, setPokemonDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    try {
      const data = await getPokemonDetailsByID(id);
      const locations = await getPokemonDetails(data.location_area_encounters);
      const abilitiesPromises = data.abilities.map(async (ability) => {
        return await getPokemonDetails(ability.ability.url);
      });
      const pokemonAbilities = await Promise.all(abilitiesPromises);
      const pokemonAbilitiesData = pokemonAbilities.map((ability) => {
        return {
          name: ability.name,
          description: ability.flavor_text_entries
            .filter((entry) => entry.language.name === "en")[0].flavor_text
        }
      });
      setPokemonDetails({...data, locations, pokemonAbilitiesData});
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {
        pokemonDetails ? (
          <>
          <BackButton onClick={() => navigate(-1)}>
            Go Back
          </BackButton>
            <DetailsLayout>
              <DetailsHeader>
                <PokemonImage src={ pokemonDetails.sprites.front_default}/>
                <PokemonSummary>
                  <BasicInfo>
                    <h1>{ capitalize(pokemonDetails.name) }</h1>
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
                          {
                            pokemonDetails.locations.map((location, index) => (
                              <li key={index}>{capitalize(location.location_area.name)}</li>
                            ))
                          }
                        </ul>
                      </PokemonLocations>
                    </PokemonCharacteristics>
                    <h2>Types:</h2>
                    <PokemonTypesContainer>
                      {
                        pokemonDetails.types.map((type, index) => (
                          <PokemonType key={index}>{type.type.name}</PokemonType>
                        ))
                      }
                    </PokemonTypesContainer>
                  </BasicInfo>
                  <BattleInfo>
                    <h2>Stats:</h2>
                    <PokemonStats>
                      {
                        pokemonDetails.stats.map((stat, index) => (
                          <PokemonStat key={index}>
                            <h3>{`${capitalize(stat.stat.name)}:`}</h3>
                            <span>{stat.base_stat}</span>
                          </PokemonStat>
                        ))
                      }
                    </PokemonStats>
                    <h2>Abilities:</h2>
                    <PokemonAbilities>
                      {
                        pokemonDetails.pokemonAbilitiesData.map((ability, index) => (
                          <PokemonAbility key={index}>
                            <h3>{capitalize(ability.name)}</h3>
                            <p>{ability.description}</p>
                          </PokemonAbility>
                        ))
                      }
                    </PokemonAbilities>
                  </BattleInfo>
                </PokemonSummary> 
              </DetailsHeader>
            </DetailsLayout>
          </>
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
