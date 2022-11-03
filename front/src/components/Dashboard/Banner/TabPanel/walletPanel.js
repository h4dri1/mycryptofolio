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
import { toggleConfirmDelete } from 'src/actions/settings';

import { toggleUpdateWalletModal } from 'src/actions/portfolio';

import EditOrDeleteItem from 'src/components/common/EditOrDeleteItem';
import Identicon from '../../../Identicon';
import TabPanel from './tabPanel';
import PerfWallet from './perfWallet';
import SumWallet from './sumWallet';

export default function TabPanelWallet(props) {
  const {
    children,
    show,
    value,
    index,
    wallet,
    selectedCurrency,
    cryptoSym,
    hide500,
    change,
    wallets,
    handleClickChange,
    clickHide,
    performance,
  } = props;

  const handleClickHide = () => clickHide();

  return (
    <TabPanel value={value} index={index} key={index}>
      <Container sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, paddingRight: 0, paddingLeft: 0,
      }}
      >
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: { xs: 'space-between', md: 'left' }, width: '100%',
        }}
        >
          <Identicon address={`454554${wallet.id}7878989`} diam={hide500 ? 50 : 100} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginLeft: { xs: 0, md: 1 } }} color="primaryTextColor.main">{wallet.label.length > 15 ? `${wallet.label.slice(0, 5)}...` : wallet.label}</Typography>
          <EditOrDeleteItem
            editItem={toggleUpdateWalletModal}
            deleteItem={() => toggleConfirmDelete({ type: 'wallet', itemId: wallet.id })}
          />
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
            {wallets.length > 0 ? <SumWallet wallet={wallet} cryptoSym={cryptoSym} show={show} /> : <Skeleton sx={{ marginLeft: 1 }} variant="text" width={100} height={50} />}
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
