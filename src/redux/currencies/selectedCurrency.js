const SELECT_CURRENCY = 'redux/store/getStoresReducer/SELECT_CURRENCY';

const selectedCurrency = (
  state = {
    country: 'United States',
    exchange: 1000,
    name: 'USD',
    symbole: '$',
  },
  action,
) => {
  switch (action.type) {
    case SELECT_CURRENCY: {
      localStorage.setItem('selectedCurrency', JSON.stringify(action.data));
      return action.data;
    }
    default: {
      const savedCurrency = localStorage.getItem('selectedCurrency');
      if (savedCurrency) {
        return JSON.parse(savedCurrency);
      }
      return state;
    }
  }
};

export const setCurrency = (currency) => ({
  type: SELECT_CURRENCY,
  data: currency,
});

export default selectedCurrency;
