import React, { useState } from 'react';
import searchIcon from '../../images/search-icon1.png';

const SearchBar = (props) => {
  const {
    tableName,
    onSearch,
    instantSearch,
  } = props;

  const [value, setValue] = useState('');

  const changeSearchValue = (e) => {
    setValue(e.target.value);

    if (instantSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSearch = () => {
    onSearch(value);
  };

  return (
    <div className="search-wrapper">
      <input type="search" placeholder="Search..." name="search-bar" onChange={changeSearchValue} />
      <img src={searchIcon} alt="" className="searchIcon" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
