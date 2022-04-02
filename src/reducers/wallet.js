// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_API, CURRENCIES_API_OBJ, FILTER_TABLE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_API:
    return {
      ...state,
      currencies: action.payload,
    };
  case CURRENCIES_API_OBJ:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  case FILTER_TABLE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  default:
    return {
      ...state,
    };
  }
};

export default wallet;
