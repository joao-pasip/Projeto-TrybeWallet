// Coloque aqui suas actions
import fecthAPI from '../services/fetchAPI';

export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const ACTION_LOADING = 'ACTION_LOADING';
export const CURRENCIES_API = 'CURRENCIES_API';
export const CURRENCIES_API_OBJ = 'CURRENCIES_API_OBJ';
export const CURRENCIES_API_ERROR = 'CURRENCIES_API_ERROR';
export const FILTER_TABLE = 'FILTER_TABLE';
// export const EXCHANGERATES = 'EXCHANGERATES';

export const actionLoginEmail = (payload) => ({
  type: LOGIN_EMAIL,
  payload,
});

// export const actionLoading = () => ({
//   type: ACTION_LOADING,
// });

export const actionCurrencies = (payload) => ({
  type: CURRENCIES_API,
  payload,
});

export const actionObjCurrencies = (payload) => ({
  type: CURRENCIES_API_OBJ,
  payload,
});

export const actionFilterTable = (payload) => ({
  type: FILTER_TABLE,
  payload,
});

// export const actionExchangeRates = (payload) => ({
//   type: EXCHANGERATES,
//   payload,
// });

export const actionCurrenciesError = (payload) => ({
  type: CURRENCIES_API_ERROR,
  payload,
});

// export const thunkObjCurrencies = () => async (dispacth) => {
//   try {
//     const response = await fecthAPI();
//     dispacth(actionExchangeRates(response));
//   } catch (error) {
//     dispacth(actionCurrenciesError(error));
//   }
// };

export const thunkCurrencies = () => async (dispatch) => {
  // dispatch(actionLoading());
  try {
    const response = await fecthAPI();
    const arrayCurrencies = Object.keys(response);
    const currenciesFilter = arrayCurrencies
      .filter((currencie) => (currencie !== 'USDT'));
    dispatch(actionCurrencies(currenciesFilter));
  } catch (error) {
    dispatch(actionCurrenciesError(error));
  }
};
