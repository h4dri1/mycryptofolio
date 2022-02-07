/* eslint-disable react/function-component-definition */
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio, fetchSpecificPortfolio } from 'src/actions/portfolio';
import Container from '@mui/material/Container';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ConfirmDelete from 'src/components/common/ConfirmDelete';
import WalletsNav from './WalletsNav';
import AssetsShares from './AssetsShares';
import Performance from './Performance';
import TransactionsHistory from './TransactionsHistory';
import TransactionCreator from './TransactionCreator';


const useStyles = makeStyles({
  grid: {
    // border: 'solid 2px red',
    marginTop: '0.1px',
    height: '100%',
    // maxWidth: '100%',
  },
  gridItem: {
    // borderStyle: 'solid',
    borderColor: '#E7EBF0',
    borderRadius: 2,
    // minHeight: '50vh',
    margin: '5px',
  },
});

const Dashboard = ({ logged }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wallet: wallets, selectedWallet, distribution } = useSelector((state) => state.portfolio);

  useEffect(() => {
    if (!logged) {
      navigate('/login?continue=/portfolio');
    }
    else {
      dispatch(fetchPortfolio());
    }
  }, []);


  return (
    <div className="">
      <ConfirmDelete />
      <Grid maxHeight={'80%'} container rowSpacing={{ xs: 1, md: 2 }} justifyContent="space-evenly" className={classes.grid}>
        <Grid sx={{ boxShadow: 4 }} item xs={11} md={5.5} className={classes.gridItem}>
          <Container>
            <Grid container sx={{ padding: 0 }}>
              <Grid item xs={12} md={6} className={classes.gridSubItem}>
                <WalletsNav wallets={wallets} selectedWallet={selectedWallet} />
              </Grid>
              <Grid item xs={12} md={6} className={classes.gridSubItem}>
                <AssetsShares distribution={distribution} />
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid sx={{ boxShadow: 4 }} item xs={11} md={5.5} className={classes.gridItem}>
          <Performance />
        </Grid>
        <Grid sx={{ boxShadow: 4 }} item xs={12} md={5.5} className={classes.gridItem}>
          <TransactionsHistory />
        </Grid>
        <Grid sx={{ boxShadow: 4 }} item xs={11} md={5.5} className={classes.gridItem}>
          <TransactionCreator />
        </Grid>
      </Grid>
    </div>
  );
};

Dashboard.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export default Dashboard;
