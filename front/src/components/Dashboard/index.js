/* eslint-disable react/function-component-definition */
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio } from 'src/actions/portfolio';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ConfirmDelete from 'src/components/common/ConfirmDelete';
import WalletsNav from './WalletsNav';
import AssetsShares from './AssetsShares';
import Performance from './Performance';
import TransactionsHistory from './TransactionsHistory';
import TransactionCreator from './TransactionCreator';


import Loading from '../Loading'

const useStyles = makeStyles({
  grid: {
    height: '100%',
    marginTop: '20px',
    marginBottom: '50px',
  },
  gridItem: {
    borderColor: '#E7EBF0',
    borderRadius: 2,
    margin: '10px',

  },
  gridSubItem: {
    // border: 'solid 2px gold',
    // height: '100%',
  }
});

const Dashboard = ({ logged, verify }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wallet: wallets, selectedWallet, distribution } = useSelector((state) => state.portfolio);
  const { darkMode } = useSelector((state) => state.settings);
  
  useEffect(() => {
    if (!logged) {
      if (localStorage.getItem('wallet') && localStorage.getItem('wallet') !== 'Wallet') {
        navigate('/wallet');
      } else {
        navigate('/login?continue=/portfolio');
      }
      
    }
    else  {
      dispatch(fetchPortfolio());
    }
  }, []);

  return (
    <div className="">
      <ConfirmDelete />
      <Grid maxHeight={'80%'} container rowSpacing={{ xs: 1, md: 2 }} justifyContent="space-evenly" className={classes.grid}>
        <Grid sx={{ boxShadow: 4, backgroundColor: !darkMode ? '' : '#002F54' }} item xs={12} md={5.5} className={classes.gridItem}>
          <Grid container sx={{ padding: 0 }}>
            <Grid item xs={12} md={6} className={classes.gridSubItem}>
              <WalletsNav wallets={wallets} selectedWallet={selectedWallet} />
            </Grid>
            <Grid item xs={12} md={6} className={classes.gridSubItem}>
              <AssetsShares distribution={distribution} />
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ boxShadow: 4, backgroundColor: !darkMode ? '' : '#002F54' }} item xs={12} md={5.5} className={classes.gridItem}>
          <Performance />
        </Grid>
        <Grid sx={{ boxShadow: 4, backgroundColor: !darkMode ? '' : '#002F54' }} item xs={12} md={5.5} className={classes.gridItem}>
          <TransactionsHistory />
        </Grid>
        <Grid sx={{ boxShadow: 4, backgroundColor: !darkMode ? '' : '#002F54' }} item xs={12} md={5.5} className={classes.gridItem}>
          <TransactionCreator disabled={!selectedWallet} />
        </Grid>
      </Grid>
    </div>
  );
};

Dashboard.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export default Dashboard;
