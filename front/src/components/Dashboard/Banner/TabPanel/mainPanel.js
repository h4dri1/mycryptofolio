/* eslint-disable max-len */
import {
  Typography,
  Box,
  Container,
  IconButton,
  Skeleton,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import TabPanel from './tabPanel';
import SumBalance from './sumBalance';
import PerfWallet from './perfWallet';

import Identicon from '../../../Identicon';

export default function MainTabPanel(props) {
  const {
    wallets, handleClickChange, change, selectedCurrency, cryptoSym, hide500, value, show, clickHide, children, performance,
  } = props;

  const handleClickHide = () => clickHide();

  return (
    <TabPanel value={value} index={wallets.length}>
      <Container sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, paddingRight: 0, paddingLeft: 0,
      }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
          <Identicon address="155156165456465516" diam={hide500 ? 50 : 100} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginLeft: 1 }} color="primaryTextColor.main">Portfolio</Typography>
        </Box>
        <Box sx={{
          display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'right', width: { xs: '50%', md: '80%' },
        }}
        >
          {performance ? <PerfWallet clickChange={handleClickChange} performance={performance} change={change} selectedCurrency={selectedCurrency} />
            : (
              <Box sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Skeleton sx={{ marginRight: 1 }} variant="text" width={50} height={40} />
                <Skeleton sx={{ marginRight: 3 }} variant="circular" width={25} height={25} />
              </Box>
            )}
          <Box sx={{
            display: 'flex', flexDirection: 'row', border: 'solid 2px #a255ff', width: 'auto', height: '70px', borderRadius: '10px', alignItems: 'center', justifyContent: 'right',
          }}
          >
            {wallets.length > 0 ? <SumBalance performance={performance} cryptoSym={cryptoSym} show={show} /> : <Skeleton sx={{ marginLeft: 1 }} variant="text" width={100} height={50} />}
            <IconButton onClick={handleClickHide} sx={{ marginLeft: 1, marginRight: 1 }}>
              {show && <VisibilityOffIcon />}
              {!show && <VisibilityIcon />}
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: { xs: 'inline-block', md: 'none' }, width: '100%' }}>
          {children}
        </Box>
      </Container>
    </TabPanel>
  );
}
