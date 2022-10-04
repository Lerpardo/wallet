import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header className="cabecalho">
        <h3 className="h3header" data-testid="email-field">{email}</h3>
        <h3 className="h3header" data-testid="total-field">0</h3>
        <h3 className="h3header" data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
});

export default connect(mapStateToProps, null)(Header);
