import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImSearch } from 'react-icons/im';
import { BsFilterLeft } from 'react-icons/bs';
import { getCategories } from '../../redux/stores_categories/stores_categories_reducer';
import './SearchBar.css';

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const {
    onSearch,
    instantSearch,
    homePage,
  } = props;

  useEffect(() => {
    if (homePage) {
      dispatch(getCategories());
    }
  }, []);

  const [value, setValue] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const categoriesList = useSelector((state) => state.storeCategoriesReducer);

  const changeSearchValue = (e) => {
    setValue(e.target.value);

    if (instantSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSearch = () => {
    onSearch(value);
  };

  const selectCategory = (category) => {
    setValue(category.name);
    onSearch(category.name);
    setShowCategories(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div className="search-wrapper">
        <input
          type="search"
          placeholder="Search..."
          name="search-bar"
          value={value}
          onChange={changeSearchValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <ImSearch color="black" className="searchIcon" onClick={handleSearch} />
      </div>

      {
        homePage ? (
          <>
            <h4 className="search-filter" onClick={() => setShowCategories(!showCategories)}>
              <BsFilterLeft />
              <span>Categories</span>
            </h4>

            {
              showCategories ? (
                <div className="search-categories-list">
                  {
                    categoriesList.map((category) => (
                      <p
                        key={category.name}
                        className="search-categories-list-category"
                        onClick={() => selectCategory(category)}
                      >
                        <span />
                        {' '}
                        {category.name}
                      </p>
                    ))
                  }
                </div>
              )
                : (<></>)
            }

          </>
        ) : (<></>)
      }

    </div>
  );
};

export default SearchBar;
