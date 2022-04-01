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
      despesaTotal: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // const response = await fecthAPI();
    // console.log(response);
    const { propThunk } = this.props;
    propThunk();
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
    this.setState({
      exchangeRates: objCurrency,
    });
    const {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    propObjExpenses({
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const {
      despesaTotal,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { propEmail, propCurrencies } = this.props;
    // https://www.alura.com.br/artigos/formatando-numeros-no-javascript?gclid=CjwKCAjwopWSBhB6EiwAjxmqDcDMbh-nuByBdE129fiHRVkcLCRX3mFmRJc2OuPp79wKKydu00A0pxoChycQAvD_BwE
    const conversaoBRL = despesaTotal
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
              {`Despesa Total: ${conversaoBRL}`}
              <span data-testid="header-currency-field"> BRL</span>
            </p>
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
              <option value="dinheiro">Dinheiro</option>
              <option value="crédito">Cartão de crédito</option>
              <option value="débito">Cartão de débito</option>
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
              <option value="alimentação">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saúde">Saúde</option>
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
  // propInputValue: state.wallet.expenses.
});

const mapDispatchToProps = (dispacth) => ({
  propThunk: () => dispacth(thunkCurrencies()),
  propObjExpenses: (payload) => dispacth(actionObjCurrencies(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
