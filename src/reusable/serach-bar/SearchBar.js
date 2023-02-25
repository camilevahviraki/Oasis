import React from 'react';
import searchIcon from '../../images/search-icon1.png';

const SearchBar = () => {

  const changeSearchValue = () => {

  }

  return (
    <div className='search-wrapper'>
         <input type='search' placeholder='Search...' name='search-bar' onChange={changeSearchValue}/>
         <img src={searchIcon} alt='' className='searchIcon' />
    </div>
  )
}

export default SearchBar