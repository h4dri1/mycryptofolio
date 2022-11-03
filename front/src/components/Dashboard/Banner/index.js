/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Container,
  IconButton,
  Skeleton,
  AppBar,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import nFormatter from 'src/services/nFormatter';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector, useDispatch } from 'react-redux';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import TransactionCreator from 'src/components/Dashboard/TransactionCreator';
import { toggleConfirmDelete, toggleTransactionCreator, setDisplaySnackBar } from 'src/actions/settings';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import {
  toggleCreateWalletModal, updateSelectedWallet, fetchSpecificWallet, fetchPortfolio,
} from 'src/actions/portfolio';

import AddWallet from './AddWallet';
import EditWallet from './EditWallet';
import ButtonTabs from './TabPanel/buttonTabs';
import DialogBox from './Transaction/transaction';
import TabPanelWallet from './TabPanel/walletPanel';
import MainTabPanel from './TabPanel/mainPanel';

const cryptoSym = (selectedCurrency) => {
  if (selectedCurrency === 'BTC') {
    return '₿';
  }
  if (selectedCurrency === 'ETH') {
    return 'Ξ';
  }
  if (selectedCurrency === 'USD') {
    return '$';
  }
  if (selectedCurrency === 'EUR') {
    return '€';
  }
  return '';
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  scrollButtons: {
    '&.Mui-disabled': {
      opacity: 0.3,
    },
  },
});

export default function Banner({ wallets, selectedWallet, performance }) {
  const classes = useStyles();
  const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(true);
  const [change, setChange] = useState('percent');
  const { darkMode } = useSelector((state) => state.settings);
  const { transactionCreatorIsOpen } = useSelector((state) => state.settings);

  const hide500 = useMediaQuery('(max-width:600px)');

  const dispatch = useDispatch();

  const toggleTransaction = () => dispatch(toggleTransactionCreator());

  const handleLinkClick = (walletId) => {
    dispatch(updateSelectedWallet(walletId));
    dispatch(fetchSpecificWallet(walletId));
  };

  const handleMainLinkClick = () => {
    dispatch(updateSelectedWallet(''));
    dispatch(fetchPortfolio());
  };

  const handleClickHide = () => {
    setShow(!show);
  };

  const handleClickChange = () => {
    setChange(change === 'percent' ? 'value' : 'percent');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const buttonBackGroundColor = darkMode ? '#194478' : '#8752fa';
  const appBarBackGroundColor = darkMode ? 'transparent' : '#8752fa';

  const handleEditTransaction = () => {
    if (wallets.length > 0) {
      dispatch(toggleTransactionCreator());
    }
    else {
      dispatch(setDisplaySnackBar({ severity: 'error', message: 'Créez un wallet en premier' }));
      dispatch(toggleCreateWalletModal());
    }
  };

  useEffect(() => {
    if (selectedWallet === '') {
      setValue(wallets.length);
    }
    else if (wallets.findIndex((wallet) => wallet.id === selectedWallet) !== -1) {
      setValue(wallets.findIndex((wallet) => wallet.id === selectedWallet));
    }
    else {
      setValue(wallets.length);
    }
  }, [wallets]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        <Box sx={{ width: { xs: '100%', md: '95%' } }}>
          <AppBar
            position="static"
            sx={{
              backgroundColor: appBarBackGroundColor, boxShadow: 'none', borderTopLeftRadius: '10px', borderTopRightRadius: { xs: '10px', md: 0 },
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              classes={classes}
              aria-label="basic tabs example"
            >
              {wallets.length > 0 && wallets.map((wallet, index) => (
                <Tab onClick={() => handleLinkClick(wallet.id)} sx={{ color: 'white' }} key={index} label={wallet.label.length > 10 && hide500 ? `${wallet.label.slice(0, 5)}...` : wallet.label} {...a11yProps(index)} />
              ))}
              <Tab onClick={handleMainLinkClick} sx={{ color: 'white' }} label="All" {...a11yProps(wallets.length)} />
            </Tabs>
          </AppBar>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'inline-block' } }}>
          <ButtonTabs linkClick={handleLinkClick} mainLinkClick={handleMainLinkClick} selectedWallet={selectedWallet} buttonBackGroundColor={buttonBackGroundColor} toggleCreateWalletModal={toggleCreateWalletModal} handleEditTransaction={handleEditTransaction} />
        </Box>
      </Box>
      {wallets.length > 0 && wallets.map((wallet, index) => (
        <TabPanelWallet
          key={index}
          show={show}
          value={value}
          index={index}
          wallet={wallet}
          selectedCurrency={selectedCurrency}
          cryptoSym={cryptoSym(selectedCurrency)}
          hide500={hide500}
          change={change}
          wallets={wallets}
          handleClickChange={handleClickChange}
          clickHide={handleClickHide}
          performance={performance}
        >
          <ButtonTabs
            linkClick={handleLinkClick}
            mainLinkClick={handleMainLinkClick}
            selectedWallet={selectedWallet}
            buttonBackGroundColor={buttonBackGroundColor}
            toggleCreateWalletModal={toggleCreateWalletModal}
            handleEditTransaction={handleEditTransaction}
          />
        </TabPanelWallet>
      ))}
      <MainTabPanel
        wallets={wallets}
        handleClickChange={handleClickChange}
        change={change}
        selectedCurrency={selectedCurrency}
        cryptoSym={cryptoSym(selectedCurrency)}
        hide500={hide500}
        value={value}
        show={show}
        performance={performance}
        clickHide={handleClickHide}
      >
        <ButtonTabs
          linkClick={handleLinkClick}
          mainLinkClick={handleMainLinkClick}
          selectedWallet={selectedWallet}
          buttonBackGroundColor={buttonBackGroundColor}
          toggleCreateWalletModal={toggleCreateWalletModal}
          handleEditTransaction={handleEditTransaction}
        />
      </MainTabPanel>
      <AddWallet />
      <EditWallet />
      <DialogBox hide500={hide500} transactionCreatorIsOpen={transactionCreatorIsOpen} transactionPanel={toggleTransaction} />
    </Box>
  );
}
