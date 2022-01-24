import axios from 'axios';

import { GET_TRANSACTIONS_HIST, updateTransactionsHist } from 'src/actions/portfolio';

import transactionList from 'src/components/Dashboard/TransactionsHistory/data.json';

const portfolio = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_HIST:
      store.dispatch(updateTransactionsHist(transactionList));

      // axios({
      //   method: 'get',
      //   url: `https://dev.mycryptofolio.fr/v1/portfolio/${portfolioId}`,
      // })
      //   .then((res) => {
      //     store.dispatch(updateTransactionsHist(res.data));
      //   })
      //   .catch((err) => console.log(err));

      next(action);
      break;
    default:
      next(action);
      break;
  }
};

export default portfolio;
