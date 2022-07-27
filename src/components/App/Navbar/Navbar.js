import React from 'react';
import logo from 'assets/pokemon-logo.png';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  height: 200px;
  justify-content: center;
  position: sticky;
  width: 100%;
  z-index: 1;
`

const Navbar = () => {
  return (
    <Nav>
      <img src={ logo } alt='pokemon logo'/>
    </Nav>
  );
}

export default Navbar;
