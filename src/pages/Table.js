import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionFilterTable } from '../actions';

class Table extends React.Component {
  render() {
    const { propExpenses, propFilter } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {propExpenses.map((element) => {
              const { currency } = element;
              const inputValue = Number(element.value);
              const conversao = Number(element.exchangeRates[currency].ask);
              const cambio = Number(element.exchangeRates[currency].ask);
              return (
                <tr key={ element.id }>
                  <td>{element.description}</td>
                  <td>{element.tag}</td>
                  <td>{element.method}</td>
                  <td>{inputValue.toFixed(2)}</td>
                  <td>{element.exchangeRates[currency].name}</td>
                  <td>{cambio.toFixed(2)}</td>
                  <td>{(inputValue * conversao).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button type="button">Editar</button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => propFilter(element.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  propExpenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  propExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  propFilter: (payload) => dispatch(actionFilterTable(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
