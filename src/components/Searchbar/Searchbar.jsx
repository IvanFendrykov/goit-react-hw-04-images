import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearchHeart } from 'react-icons/bs';


import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSearchSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleInput = ({ target: { value } }) => {
    setSearchName(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSearchSubmit(searchName);
    setSearchName('');
  };

    return (
      <Header>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormBtn type="submit">
            <BsSearchHeart size="24" />
          </SearchFormBtn>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchName}
            onChange={handleInput}
          />
        </SearchForm>
      </Header>
    );
  }


Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};
