import React from 'react';
import styled from 'styled-components';

const PaginatorLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const PaginationButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  font-size: 1.5rem;
  border-radius: 100px;
  background-color: ${ (props) => props.theme.lightGray};
  color: ${ (props) => props.theme.darkBlue};
  cursor: pointer;
`;

const CurrentPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: none;
  font-size: 1.2rem;
  border-radius: 100px;
  background-color: ${ (props) => props.theme.lightGray};
  color: ${ (props) => props.theme.darkBlue};
  margin: 10px;
`;

const Paginator = ({ currentPage, totalPages, setPreviousPage, setNextPage}) => {

  return (
    <PaginatorLayout>
      {
        currentPage === 0 ? '' : <PaginationButton onClick={() => setPreviousPage()}> &#8701; </PaginationButton>
      }
      <CurrentPage>{currentPage}</CurrentPage>
      {
        currentPage === totalPages - 1 ? '' : <PaginationButton onClick={() => setNextPage()}> &#8702; </PaginationButton>
      }
      
    </PaginatorLayout>
  );
}

export default Paginator;
