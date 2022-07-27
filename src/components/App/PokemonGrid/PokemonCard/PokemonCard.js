import React from 'react';
import styled from 'styled-components';

const CardLayout = styled.div`
  background-color: ${ (props => props.theme.seaBlue) };
  border-radius: 5px;
  box-shadow: -7px 7px 5px 0px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px;
`;

const PokemonImage = styled.img`
  height: 150px;
  border-radius: 5px;
  width: 150px;
`;

const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
`;

const BodySection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h3 {
    text-transform: capitalize;
  }
`;

const PokemonTypesContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PokemonType = styled.div`
  background-color: ${ (props => props.theme.white) };
  border-radius: 5px;
  margin-right: 5px;
  padding: 4px;
  text-transform: capitalize;
`;

const FavoriteButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 5px;
  border-radius: 4px;
  font-size: 25px;
  cursor: pointer;
`

const PokemonCard = ({ pokemon }) => {

  const blueHeart = "💙";
  const whiteHeart = "🤍";

  return (
    <CardLayout>
      <ImageContainer>
        <PokemonImage src={pokemon.sprites.front_default}/>
      </ImageContainer>
      <CardBody>
        <BodySection>
          <h3>{pokemon.name}</h3>
          <span>#{pokemon.id}</span>
        </BodySection>
        <BodySection>
          <PokemonTypesContainer>
            {
              pokemon.types.map((type) => (
                <PokemonType>{type.type.name}</PokemonType>
              ))
            }
          </PokemonTypesContainer>
          <FavoriteButton>
            <div>
              { whiteHeart }
            </div>
          </FavoriteButton>
        </BodySection>
      </CardBody>
    </CardLayout>
  );
}

export default PokemonCard;
