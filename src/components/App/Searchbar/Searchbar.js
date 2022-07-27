import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const SearchTitle = styled.h2`
  font-size: ${ (props) => props.theme.subHeading };
  color: ${ (props) => props.theme.darkBlue };
`
const SearchInput = styled.input`
  display: block;
  border: 1px solid transparent;
  border-radius: 50px;
  height: 20%;
  width: 50%;
  background-color: ${ (props) => props.theme.white };
  outline: none;
  padding: 5px 20px;
  font-size: 1.5rem;
`

const Searchbar = () => {
  return (
    <SearchContainer>
      <SearchTitle>Search a Pokemon!</SearchTitle>
      <SearchInput />
    </SearchContainer>
  );
}

export default Searchbar;
