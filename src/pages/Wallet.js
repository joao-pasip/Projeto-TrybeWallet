import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
// import fecthAPI from '../services/fetchAPI';
import { thunkCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      despesaTotal: 0,
    };
  }

  componentDidMount() {
    // fecthAPI();
    const { propThunk } = this.props;
    propThunk();
  }

  render() {
    const { despesaTotal } = this.state;
    const { propEmail } = this.props;
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
      </div>
    );
  }
}

Wallet.propTypes = {
  propEmail: propTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  propEmail: state.user.email,
});

const mapDispatchToProps = (dispacth) => ({
  propThunk: () => dispacth(thunkCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
