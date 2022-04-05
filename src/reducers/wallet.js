// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  CURRENCIES_API,
  CURRENCIES_API_OBJ,
  FILTER_TABLE,
  EDIT_TABLE,
  EDIT_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
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
      expenses: [...state.expenses, { ...action.payload, id: state.expenses.length }],
    };
  case FILTER_TABLE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_TABLE:
    return {
      ...state,
      editTable: state.expenses.find((expense) => expense.id === action.payload),
      editor: true,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      // editTable: action.payload,
      expenses: state.expenses.map((expense) => (
        expense.id === action.payload.id ? { ...expense, ...action.payload } : expense
      )),
      editor: false,
    };
  default:
    return {
      ...state,
    };
  }
};

export default wallet;
