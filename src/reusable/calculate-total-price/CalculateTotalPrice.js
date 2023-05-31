import React, { useState } from "react";
import { useSelector } from "react-redux";

const CalculateTotalPrice = (props) => {
  let total = 0;
  const { itemsList, taxes, symboleClass } = props;
  const selectedCurrency = useSelector((state) => state.selectedCurrency);
  const { exchange, symbole } = selectedCurrency;

  itemsList.forEach((item) => {
    total += item.price * item.exchange;
  });

  return (
    <>
      {taxes ? (
        <>
          <span className={symboleClass || "price-symbol"}>{symbole} </span>{" "}
          <span>{(((taxes + total) * exchange) / 1000).toFixed(2)}</span>
        </>
      ) : (
        <>
          <span className={symboleClass || "price-symbol"}>{symbole} </span>
          <span>{((total * exchange) / 1000).toFixed(2)}</span>
        </>
      )}
    </>
  );
};

export default CalculateTotalPrice;
