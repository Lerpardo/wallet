import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setExpenses, setEdit } from '../redux/actions/index';
// import { testGlobal } from '../redux/actions/func';

const initial = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação ',
};
class WalletForm extends Component {
  constructor() {
    super();

    this.state = initial;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange({ target }) {
    // const { editor, idToEdit, expenses } = this.props;
    const { name, value } = target;
    this.setState({ [name]: value });
    // if (editor) testGlobal(expenses[idToEdit]);
  }

  handleSubmit = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    const { submitData, expenses } = this.props;
    submitData({ id: expenses.length, ...this.state }, response);

    this.setState(initial);
  };

  handleEdit = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    const { idToEdit, expenses, submitEdit } = this.props;
    const mutante = [...expenses];

    const index = mutante.splice(idToEdit);
    index.shift();
    const leitura = [...mutante, {
      id: idToEdit, ...this.state, exchangeRates: response }, ...index];
    submitEdit(leitura);

    this.setState(initial);
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form className="formWallet">
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
            name="currency"
            value={ currency }
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
            name="method"
            value={ method }
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
            name="tag"
            value={ tag }
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
        {
          !editor ? (
            <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
          ) : (
            <button
              type="button"
              onClick={ this.handleEdit }
            >
              Editar Despesa

            </button>)
        }

      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  editor: PropTypes.bool.isRequired,
  submitData: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  idToEdit: PropTypes.number.isRequired,
  submitEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  submitData: (expense, cambio) => dispatch(setExpenses(expense, cambio)),
  submitEdit: (edited) => dispatch(setEdit(edited)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
