import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
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
        { expenses.map((e, i) => (
          <tr key={ i }>
            <th>{e.description}</th>
            <th>{e.tag}</th>
            <th>{e.method}</th>
            <th>{Number(e.value).toFixed(2)}</th>
            <th>{e.currency}</th>
            <th>{e.exchangeRates[e.currency].name}</th>
            <th>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</th>
            <th>Real</th>
            <button type="button">Editar</button>
            <button type="button">Excluir</button>
          </tr>
        ))}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps, null)(Table);
