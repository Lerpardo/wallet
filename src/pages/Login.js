import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendLoginUser } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, submitForm } = this.props;
    const { email } = this.state;
    submitForm({ email });
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const stringEmail = /\S+[@]\w+[.]\w+/gm;
    const limitador = 6;
    const able = (stringEmail.test(email) && password.length >= limitador);
    return (
      <form className="loggin-page" onSubmit={ this.handleSubmit }>
        <div className="dvt">
          <img src="https://cdn.dribbble.com/users/3302289/screenshots/10876331/e2wallet.png" width="100vw" alt="formlog" />
          <input
            data-testid="email-input"
            className="loginInput"
            onChange={ this.handleChange }
            value={ email }
            type="email"
            name="email"
            required
          />
          <input
            data-testid="password-input"
            onChange={ this.handleChange }
            type="password"
            value={ password }
            name="password"
            minLength="6"
          />
          <button disabled={ !able } type="submit">Entrar</button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  submitForm: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitForm: (objeto) => dispatch(sendLoginUser(objeto)),
});

export default connect(null, mapDispatchToProps)(Login);
