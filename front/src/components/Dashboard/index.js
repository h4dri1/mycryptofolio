/* eslint-disable react/function-component-definition */
import { Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio } from 'src/actions/portfolio';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ConfirmDelete from 'src/components/common/ConfirmDelete';
import AssetsShares from './AssetsShares';
import Performance from './Allocation';
import TransactionsHistory from './TransactionsHistory';
import { getAllCryptos } from '../../actions/cryptos';

import Banner from './Banner'

import colors from '../../services/getColors'

const Dashboard = ({ logged, verify }) => {
  const useStyles = makeStyles({
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
    },
    gridSubItem: {
      // border: 'solid 2px gold',
      // height: '100%',
    }
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wallet: wallets, selectedWallet, distribution, performance, transactions } = useSelector((state) => state.portfolio);

  const { color } = colors()
  
  useEffect(() => {
    if (!logged) {
      navigate('/login?continue=/portfolio');   
    }
    else  {
      dispatch(fetchPortfolio());
      dispatch(getAllCryptos());
    }
  }, []);

  return (
    <div className="">
      <ConfirmDelete />
      <Box sx={{minHeight: '80vh'}}>
        <Grid maxHeight={'80%'} container justifyContent="center" className={classes.grid}>
        <Grid sx={{backgroundColor: color}} item xs={12} md={8.1} className={classes.gridItem}>
            <Banner wallets={wallets} selectedWallet={selectedWallet} performance={performance}/>
          </Grid>
          <Grid sx={{backgroundColor: color}} item xs={12} md={4} className={classes.gridItem}>
              <AssetsShares distribution={distribution} />
          </Grid>
          <Grid sx={{backgroundColor: color}} item xs={12} md={4} className={classes.gridItem}>
            <Performance chartData={distribution}/>
          </Grid>
          <Grid sx={{backgroundColor: color}} item xs={12} md={8.1} className={classes.gridItem}>
            <TransactionsHistory transactions={transactions}/>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

Dashboard.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export default Dashboard;
