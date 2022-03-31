// Coloque aqui suas actions
import fecthAPI from '../services/fetchAPI';

export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const ACTION_LOADING = 'ACTION_LOADING';
export const CURRENCIES_API = 'CURRENCIES_API';
export const CURRENCIES_API_ERROR = 'CURRENCIES_API_ERROR';

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

export const actionCurrenciesError = (payload) => ({
  type: CURRENCIES_API_ERROR,
  payload,
});

export const thunkCurrencies = () => async (dispacth) => {
  // dispacth(actionLoading());
  try {
    const response = await fecthAPI();
    const arrayCurrencies = Object.keys(response);
    const currenciesFilter = arrayCurrencies
      .filter((currencie) => (currencie !== 'USDT'));
    dispacth(actionCurrencies(currenciesFilter));
  } catch (error) {
    dispacth(actionCurrenciesError(error));
  }
};
