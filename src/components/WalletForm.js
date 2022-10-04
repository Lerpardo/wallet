import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      coinSta: 'USD',
      methodPayment: 'Dinheiro',
      methodExpend: 'Alimentação ',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { value, description, coinSta, methodPayment, methodExpend } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valueAtr">
          Valor:
          <input
            type="number"
            name="value"
            id="valueAtr"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="coinAtr">
          Moeda:
          <select
            name="coinSta"
            value={ coinSta }
            id="coinAtr"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            { currencies.map((e, i) => (
              <option key={ i }>{e}</option>
            ))}
          </select>
        </label>
        <label htmlFor="pagamentoId">
          Método de pagamento:
          <select
            id="pagamentoId"
            name="methodPayment"
            value={ methodPayment }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="despesaId">
          Categoria:
          <select
            id="despesaId"
            name="methodExpend"
            value={ methodExpend }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="descrAtr">
          Descrição:
          <input
            type="text"
            name="description"
            id="descrAtr"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps, null)(WalletForm);
