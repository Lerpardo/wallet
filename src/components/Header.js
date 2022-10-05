import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  somaTório = () => {
    const { expenses } = this.props;
    const soma = expenses.reduce((a, c) => {
      // const moeda = c.coinSta;
      // const cambio = c.exchangeRates[c.coinSta].ask;
      const sc = Number(c.value) * Number(c.exchangeRates[c.currency].ask);
      return a + sc;
    }, 0.00);
    return soma.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="cabecalho">
        <h3 className="h3header" data-testid="email-field">{email}</h3>
        <h3 className="h3header" data-testid="total-field">{this.somaTório()}</h3>
        <h3 className="h3header" data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps, null)(Header);
