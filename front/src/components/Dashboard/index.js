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
  },
  gridItem: {
    borderStyle: 'solid',
    // minHeight: '50vh',
    margin: '5px',
  },
  gridSubItem: {
    // border: 'solid 2px gold',
    // height: '100%',
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
      <Grid container rowSpacing={{ xs: 1, md: 2 }} justifyContent="space-evenly" className={classes.grid}>
        <Grid item xs={11} md={5.5} className={classes.gridItem}>
          <Container>
            <Grid container>
              <Grid item xs={11} md={6} className={classes.gridSubItem}>
                <WalletsNav wallets={wallets} selectedWallet={selectedWallet} />
              </Grid>
              <Grid item xs={11} md={6} className={classes.gridSubItem}>
                <AssetsShares distribution={distribution} />
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={11} md={5.5} className={classes.gridItem}>
          <Performance />
        </Grid>
        <Grid item xs={11} md={5.5} className={classes.gridItem}>
          <TransactionsHistory />
        </Grid>
        <Grid item xs={11} md={5.5} className={classes.gridItem}>
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
