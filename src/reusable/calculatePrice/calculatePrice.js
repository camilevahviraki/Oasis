import React from "react";
import { useSelector } from "react-redux";

const CalculatePrice = (props) => {
  const { price, symboleClass } = props;
  const selectedCurrency = useSelector((state) => state.selectedCurrency);
  const { exchange, symbole } = selectedCurrency;
  return (
    <>
      <span className={symboleClass ? symboleClass : "price-symbol"}>
        {symbole}{" "}
      </span>
      <span>{((price * exchange) / 1000).toFixed(2)}</span>
    </>
  );
};

export default CalculatePrice;
