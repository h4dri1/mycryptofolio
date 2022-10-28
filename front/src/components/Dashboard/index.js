/* eslint-disable react/function-component-definition */
import { Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio } from 'src/actions/portfolio';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ConfirmDelete from 'src/components/common/ConfirmDelete';
import AssetsShares from './AssetsShares';
import Performance from './Allocation';
import TransactionsHistory from './TransactionsHistory';
import { getAllCryptos } from '../../actions/cryptos';

import Banner from './Banner';

import colors from '../../services/getColors';

const Dashboard = ({ logged }) => {
  const { color } = colors();

  const gridStyle = () => ({
    grid: {
      height: '100%',
      marginTop: '20px',
      marginBottom: '50px',
    },
    gridItem: {
      maxWidth: '95%',
      borderColor: '#E7EBF0',
      borderRadius: '10px',
      margin: '10px',
      boxShadow: '1px 4px 9px 1px rgba(0,0,0,0.3)',
      backgroundColor: color,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    wallet: wallets, selectedWallet, distribution, performance, transactions,
  } = useSelector((state) => state.portfolio);

  useEffect(() => {
    if (!logged) {
      navigate('/login?continue=/portfolio');
    }
    else {
      dispatch(fetchPortfolio());
      dispatch(getAllCryptos());
    }
  }, []);

  return (
    <>
      <ConfirmDelete />
      <Box sx={{ minHeight: '80vh' }}>
        <Grid maxHeight="80%" container justifyContent="center" sx={gridStyle().grid}>
          <Grid sx={gridStyle().gridItem} item xs={12} md={8.1}>
            <Banner wallets={wallets} selectedWallet={selectedWallet} performance={performance} />
          </Grid>
          <Grid sx={gridStyle().gridItem} item xs={12} md={4}>
            <AssetsShares distribution={distribution} />
          </Grid>
          <Grid sx={gridStyle().gridItem} item xs={12} md={4}>
            <Performance chartData={distribution} />
          </Grid>
          <Grid sx={gridStyle().gridItem} item xs={12} md={8.1}>
            <TransactionsHistory transactions={transactions} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Dashboard.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export default Dashboard;
