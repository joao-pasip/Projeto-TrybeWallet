import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { validateEmail, validateSenha } from '../helpers/validacoes';
import { actionLoginEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    // console.log(target);
    // console.log(name);
    // console.log(value);
    this.setState({
      [name]: value,
    }, () => {
      const { email, senha } = this.state;
      // console.log(validateEmail(email));
      if (validateEmail(email) && validateSenha(senha)) {
        // console.log(senha);
        // console.log(senha.length);
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: true,
        });
      }
    });
  }

  handleClick() {
    // console.log(this.props);
    const { email } = this.state;
    const { history, propStoreEmail } = this.props;
    propStoreEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, senha, disabled } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Digite o seu email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="senha"
            data-testid="password-input"
            placeholder="Digite sua senha"
            value={ senha }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispacth) => ({
  propStoreEmail: (payload) => dispacth(actionLoginEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
