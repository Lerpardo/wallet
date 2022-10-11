import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delExpenses, edExpenses } from '../redux/actions/index';

class Table extends Component {
  constructor() {
    super();

    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense = (id) => {
    const { delExp, expenses } = this.props;
    delExp(id, expenses);
  };

  editExpense = (elemento) => {
    const { editExp } = this.props;
    editExp(elemento);
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr className="terrivel">
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((e) => (
            <tr key={ e.id }>
              <td>{e.description}</td>
              <td>{e.tag}</td>
              <td>{e.method}</td>
              <td>{Number(e.value).toFixed(2)}</td>
              <td>{e.exchangeRates[e.currency].name}</td>
              <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
              <td>
                {
                  (Number(e.value) * Number(e.exchangeRates[e.currency].ask)).toFixed(2)
                }

              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  onClick={ () => this.editExpense(e) }
                  type="button"
                >
                  Editar

                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.deleteExpense(e) }
                >
                  Excluir

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  delExp: PropTypes.func.isRequired,
  editExp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  delExp: (id, e) => dispatch(delExpenses(id, e)),
  editExp: (e) => dispatch(edExpenses(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
