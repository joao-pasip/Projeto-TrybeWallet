import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import fecthAPI from '../services/fetchAPI';
import { thunkCurrencies, actionObjCurrencies } from '../actions';

// import wallet from '../reducers/wallet';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // const response = await fecthAPI();
    // console.log(response);
    const { propThunk } = this.props;
    propThunk();
    // propObjThunk();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { propObjExpenses } = this.props;
    const objCurrency = await fecthAPI();
    // console.log(objCurrency);
    propObjExpenses({
      ...this.state,
      exchangeRates: objCurrency,
    });
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
    // console.log(propExpenses);
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { propEmail, propCurrencies, propExpenses } = this.props;
    // https://www.alura.com.br/artigos/formatando-numeros-no-javascript?gclid=CjwKCAjwopWSBhB6EiwAjxmqDcDMbh-nuByBdE129fiHRVkcLCRX3mFmRJc2OuPp79wKKydu00A0pxoChycQAvD_BwE
    const despesaTotal = propExpenses.reduce((acc, e) => {
      const currencie = e.currency;
      const inputValue = e.value;
      const chaveExchange = e.exchangeRates[currencie];
      const cotacao = chaveExchange.ask;
      const conversaoValue = Number(inputValue) * Number(cotacao);
      return conversaoValue + acc;
    }, 0);

    // const conversaoBRL = despesaTotal
    //   .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return (
      <div>
        <header>
          <div>
            <p
              data-testid="email-field"
            >
              {`Email: ${propEmail}`}
            </p>
          </div>
          <div>
            <p data-testid="total-field">
              {`${despesaTotal.toFixed(2)}`}
            </p>
            <span data-testid="header-currency-field"> BRL</span>
          </div>
        </header>
        <section>
          {/* <form> */}
          <label htmlFor="input_valor">
            Valor:
            <input
              onChange={ this.handleChange }
              type="number"
              data-testid="value-input"
              min="0"
              name="value"
              id="input_valor"
              value={ value }
            />
          </label>
          <label htmlFor="input_moeda">
            Moeda
            <select
              id="input_moeda"
              name="currency"
              onChange={ this.handleChange }
              value={ currency }
            >
              { propCurrencies.map((currencie) => (
                <option key={ currencie }>
                  {currencie}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="input_pagamento">
            Método de pagamento:
            <select
              id="input_pagamento"
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="input_categoria">
            Categoria
            <select
              id="input_categoria"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="input_descricao">
            Descrição
            <input
              data-testid="description-input"
              type="text"
              id="input_descricao"
              name="description"
              maxLength="40"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
          {/* </form> */}
        </section>
      </div>
    );
  }
}

Wallet.propTypes = {
  propEmail: propTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  propEmail: state.user.email,
  propCurrencies: state.wallet.currencies,
  propExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispacth) => ({
  propThunk: () => dispacth(thunkCurrencies()),
  // propObjThunk: () => dispacth(thunkObjCurrencies()),
  propObjExpenses: (payload) => dispacth(actionObjCurrencies(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
