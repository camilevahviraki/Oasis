import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai';
import { getCurrencies } from '../../redux/currencies/currenciesReducer';
import { setCurrency } from '../../redux/currencies/selectedCurrency';
import './Currency.css';

const Currency = () => {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currenciesReducer);
  const [showCurrencyList, setCurrencyList] = useState(false);
  const selectedCurrency = useSelector((state) => state.selectedCurrency);

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  const selectCurrency = (currency) => {
    setCurrencyList(false);
    dispatch(setCurrency(currency));
  };

  return (
    <div
      className="currencies_container"
      onClick={() => setCurrencyList(!showCurrencyList)}
    >
      <div className="selected-currency">
        {currencies.length > 0 ? (
          <>
            <span>{selectedCurrency.name}</span>
            {' '}
            {selectedCurrency.symbole}
            <AiOutlineDown
              className={
                showCurrencyList ? 'currency-arrow-turned' : 'currency-arrow'
              }
              color="#707070"
            />
          </>
        ) : (
          <></>
        )}
      </div>
      {showCurrencyList ? (
        <div className="currencies-list">
          {currencies.map((currency) => {
            const { _country, name, symbole } = currency;
            return (
              <div
                key={name}
                className={
                  name === selectedCurrency.name
                    ? 'currency-wrapp selected-currency-in-list'
                    : 'currency-wrapp'
                }
                onClick={() => selectCurrency(currency)}
              >
                <span className="currency-symbol">
                  {symbole}
                  {' '}
                </span>
                <span>
                  {name}
                  {' '}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Currency;
