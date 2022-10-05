import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { currenciesData } from '../redux/actions/index';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const fecthCoins = async () => {
      const { submitCurry } = this.props;
      try {
        const request = await fetch('https://economia.awesomeapi.com.br/json/all');
        const response = await request.json();
        submitCurry(response);
      } catch (error) {
        console.log(error);
      }
    };

    fecthCoins();
  }

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  submitCurry: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitCurry: (objeto) => dispatch(currenciesData(objeto)),
});

export default connect(null, mapDispatchToProps)(Wallet);
