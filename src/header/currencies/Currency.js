import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencies } from "../../redux/currencies/currenciesReducer";
import { setCurrency } from "../../redux/currencies/selectedCurrency";
import './Currency.css';

const Currency = () => {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currenciesReducer);
  const [showCurrencyList, setCurrencyList] = useState(false);
  const selectedCurrency = useSelector(state => state.selectedCurrency);

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  const selectCurrency = (currency) => {
     setCurrencyList(false);
     dispatch(setCurrency(currency));
  } 

  console.log("currencies =>", currencies);

  return (
    <div
      className="currencies_container"
      style={{ border: "1px solid green", padding: "6px" }}
      onClick={() => setCurrencyList(!showCurrencyList)}
    >
      <div className="selected-currency">
        {currencies.length > 0? 
        (<>
        {selectedCurrency.name}{' '}{selectedCurrency.symbole}
        </>)
        :(<></>)}
      </div>
      {
        showCurrencyList?
        (<div className="currencies-list">
        {currencies.map((currency) => {
          const { country, exchange, id, name, symbole } = currency;
          return (
            <div
              className={name === selectedCurrency.name ? "currency-wrapp selected-currency-in-list":"currency-wrapp"}
              onClick={() => selectCurrency(currency)}
            >
              <span className="currency-symbol">{symbole}{' '}</span>
              <span>{name}{' '}</span>
            </div>
          )
        })}
      </div>):
      (<></>)
      }
    </div>
  );
};

export default Currency;
