/* eslint-disable react/function-component-definition */
import { Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import ConfirmDelete from 'src/components/common/ConfirmDelete';
import AssetsShares from './AssetsShares';
import Performance from './Allocation';
import TransactionsHistory from './TransactionsHistory';

import Banner from './Banner';

import colors from '../../services/getColors';

const Dashboard = () => {
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

  const {
    wallet: wallets, selectedWallet, distribution, performance, transactions,
  } = useSelector((state) => state.portfolio);

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

export default Dashboard;
