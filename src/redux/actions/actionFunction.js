export default fecthCoins = async (dispatch) => {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const reponse = await request.json();
    dispatch(currenciesData(reponse));
  } catch (error) {
    console.log(error);
  }
};
