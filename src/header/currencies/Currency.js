import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencies } from '../../redux/currencies/currenciesReducer';

const Currency = () => {
  const dispatch = useDispatch();
  const currencies = useSelector(state => state.currenciesReducer);  

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  console.log('currencies =>' ,currencies)

  return (
    <div style={{border: '1px solid green', padding: '6px'}}>
        USD $
    </div>
  )
}

export default Currency;