import React, { useState } from 'react';
import './countries.css';

const Countries = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [countriesShown, setCountriesShown] = useState([]);
  const [listVisible, setListVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState([]);

  const {
    getSelectedCountry,
    data,
    inputClass,
    inputWrapperClassName,
    inputLabel,
    placeholder,
    listClass,
  } = props;

  document.addEventListener('mouseup', (e) => {
    const container = document.getElementById('select-country');
    if (!container.contains(e.target)) {
      setListVisible(false);
    }
  });

  const countriesList = data;

  const searchCountry = (e) => {
    const { value } = e.target;

    const newlist = countriesList.filter((country) => country.name.toLowerCase().includes(value.toLowerCase()));
    setInputValue(value);
    setCountriesShown(newlist);
    setListVisible(true);

    const country = countriesList.filter((country) => country.name === inputValue);
    if (getSelectedCountry && country.length > 0) {
      getSelectedCountry(country[0]);
    }
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setInputValue(country.name);
    setListVisible(false);
    if (getSelectedCountry) {
      getSelectedCountry(country);
    }
  };

  return (

    <div
      id="select-country"
      className={inputWrapperClassName || 'formR-input-wrap'}
    >
      {inputLabel ? (
        <label>{inputLabel}</label>
      ) : (
        <></>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={searchCountry}
        onClick={() => {
          setListVisible(true);
          if (inputValue === '') {
            setCountriesShown(countriesList);
          }
        }}
        placeholder={placeholder || 'search country'}
        className={inputClass || 'country-search-input'}
      />
      {
        listVisible ? (
          <div className={listClass ? `countries-list ${listClass}` : 'countries-list'}>
            {
                countriesShown.map((country) => (
                  <div
                    key={country.name}
                    className={country.name === selectedCountry.name ? 'country-item selected-country' : 'country-item'}
                    onClick={() => selectCountry(country)}
                  >
                    <p>
                      {country.name}
                    </p>
                  </div>
                ))
              }
          </div>
        )
          : (<></>)
       }
    </div>
  );
};

export default Countries;
