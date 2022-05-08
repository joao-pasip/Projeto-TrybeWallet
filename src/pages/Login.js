/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import { MdWavingHand } from 'react-icons/md';
// import { FiDollarSign } from 'react-icons/fi';
import { validateEmail, validateSenha } from '../helpers/validacoes';
import { actionLoginEmail } from '../actions';
import '../styles/login.css';
import OrbitWallet from '../images/OrbitWallet1.jpg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      disabled: true,
      termosServicos: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // console.log(target.checked);
    // console.log(name);
    // console.log(value);
    this.setState({
      [name]: value,
    }, () => {
      const { email, senha, termosServicos } = this.state;
      // console.log(validateEmail(email));
      if (validateEmail(email) && validateSenha(senha) && termosServicos) {
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
      <main className="loginMain">
        <form className="loginForm">
          <div>
            <h2>
              Seja bem-vindo
            </h2>
          </div>
          <h1>Você está na OrbitWallet</h1>
          <p>
            Se você precisa fazer conversão de moedas mas tem
            dificuldade de fazer isso, você está no lugar certo.
            Nós Somos uma plataforma de conversão monetária.
          </p>
          <label htmlFor="email" className="labelInputs">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Digite o seu email"
            value={ email }
            onChange={ this.handleChange }
          />
          <label htmlFor="password" className="labelInputs">
            Senha
          </label>
          <input
            id="password"
            type="password"
            name="senha"
            data-testid="password-input"
            placeholder="Digite sua senha"
            value={ senha }
            onChange={ this.handleChange }
          />
          <div className="checkbox">
            <input
              type="checkbox"
              id="privacidade"
              name="termosServicos"
              onChange={ this.handleChange }
            />
            <label htmlFor="privacidade">
              Ao criar uma conta, você está de acordo com nossos
              Termos e Serviços e Políticas de Privacidade e nossas
              configurações padrões de notificações.
            </label>
          </div>
          <button
            className={ disabled ? 'buttonDisabled' : 'buttonActive' }
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
        <img src={ OrbitWallet } alt="OrbitWallet" />
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  propStoreEmail: (payload) => dispatch(actionLoginEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
