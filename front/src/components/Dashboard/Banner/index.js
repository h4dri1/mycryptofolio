import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Tabs, Tab, Typography, Box, Container, IconButton, Skeleton, AppBar, Modal, useMediaQuery, Dialog, DialogTitle, DialogContent } from '@mui/material';
import nFormatter from 'src/services/nFormatter';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector, useDispatch } from 'react-redux';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import TransactionCreator from 'src/components/Dashboard/TransactionCreator';
import { toggleConfirmDelete, toggleTransactionCreator } from 'src/actions/settings';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import {
  toggleCreateWalletModal, updateSelectedWallet, fetchSpecificWallet, fetchPortfolio,
  toggleUpdateWalletModal,
} from 'src/actions/portfolio';

import EditOrDeleteItem from 'src/components/common/EditOrDeleteItem';
import AddWalletOrTransac from 'src/components/common/AddWalletOrTransac';
import AddWallet from './AddWallet';
import EditWallet from './EditWallet';
import Identicon from '../../Identicon';

import ReplayIcon from '@mui/icons-material/Replay';

import { setDisplaySnackBar } from 'src/actions/settings';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: {xs:1, md:2} }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  scrollButtons: {
    "&.Mui-disabled": {
      opacity: 0.3
    }
  }
});

export default function Banner(wallets) {
  const classes = useStyles();
  const {selectedCurrency} = useSelector((state) => state.cryptos.cryptoList);
  const [value, setValue] = React.useState(0);
  const [show, setShow] = React.useState(true);
  const [change, setChange] = React.useState('percent');
  const { darkMode } = useSelector((state) => state.settings);
  const { transactionCreatorIsOpen } = useSelector((state) => state.settings);

  if (selectedCurrency === 'BTC') {
    var cryptoSym = '₿'
  } else if (selectedCurrency === 'ETH') {
    var cryptoSym = 'Ξ'
  } else if (selectedCurrency === 'USD') {
    var cryptoSym = '$'
  } else if (selectedCurrency === 'EUR') {
    var cryptoSym = '€'
  }

  const hide500 = useMediaQuery('(max-width:600px)');

  const dispatch = useDispatch();

  const handleLinkClick = (walletId) => {
    dispatch(updateSelectedWallet(walletId));
    dispatch(fetchSpecificWallet(walletId));
  };

  const handleMainLinkClick = () => {
    dispatch(updateSelectedWallet(''));
    dispatch(fetchPortfolio());
  };

  let perfPercentage = (
    (
      (wallets.performance.actual_value - wallets.performance.investment) / wallets.performance.investment) * 100
  ).toFixed(2);
  
  const handleClickHide = () => {
    setShow(!show);
  }

  const handleClickChange = () => {
    setChange(change === 'percent' ? 'value' : 'percent');
  }

  isNaN(perfPercentage) ? perfPercentage = 0 : perfPercentage;

  const SumBalance = () => {
    return (
      <Typography
        variant="h4"
        color={'white'}
        sx={{ fontWeight: 'bold', marginLeft: 2}}
        >
        {show ? `${cryptoSym}${nFormatter(wallets.performance.actual_value, 2)}` : '* * * * *'}
      </Typography>
    )
  }

  const SumWallet = ({wallet}) => {
    return (
      <Typography
        variant='h4'
        color={'white'}
        sx={{ fontWeight: 'bold', marginLeft: 2}}
        >
        {show ? `${cryptoSym}${nFormatter(wallet.sum, 2)}` : '* * * * *'}
      </Typography>
    )
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const PerfWallet = () => {
    return (
      wallets.performance.actual_value !== 0 ? (
        <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, justifyContent: 'center', alignItems: 'center'}}>
          {Number(wallets.performance.actual_value) > Number(wallets.performance.investment) && <ArrowCircleUpIcon onClick={handleClickChange} color={'success'} sx={{cursor: 'pointer', height: '30px', width: '30px'}}></ArrowCircleUpIcon>}
          {Number(wallets.performance.actual_value) < Number(wallets.performance.investment) && <ArrowCircleDownIcon onClick={handleClickChange} color={'error'} sx={{cursor: 'pointer', height: '30px', width: '30px'}}></ArrowCircleDownIcon>}
          <Typography
            variant="h6"
            color={'custom.main'}
            onClick={handleClickChange}
            sx={{cursor: 'pointer', marginRight: {xs:0, md:1}}}
          >
          {Number(wallets.performance.actual_value) > Number(wallets.performance.investment) ? `+` : ''}{Intl.NumberFormat('en-US', {
            style: 'decimal',
            maximumSignificantDigits: 4,
            minimumSignificantDigits: 2,
          }).format(change === 'percent' ? perfPercentage : wallets.performance.pnl)}{change === 'percent' ? '%' : selectedCurrency}
          </Typography>
        </Box>
      ) : (
        null
    ))
  }

  const buttonBackGroundColor = darkMode ? '#194478' : '#8752fa';
  const appBarBackGroundColor = darkMode ? 'transparent' : '#8752fa';

  const handleEditTransaction = () => {
    if (wallets.wallets.length > 0) {
      dispatch(toggleTransactionCreator());
    } else {
      dispatch(setDisplaySnackBar({ severity: 'error', message: 'Créez un wallet en premier' }));
      dispatch(toggleCreateWalletModal());
    }
  };

  const ButtonTabs = () => {
    return (
      <Box sx={{ 
        display:'flex',
        justifyContent: 'space-between', 
        height: '48px', 
        backgroundColor: {xs:'', md:buttonBackGroundColor},
        marginTop: {xs:-7, md:0},
        borderTopRightRadius: {xs:0, md:'10px'} }}
      >
        <IconButton sx={{height:'47px', width:'64px'}} onClick={() => {
          if (wallets.selectedWallet === '') {
            handleMainLinkClick()
          } else {
            handleLinkClick(wallets.selectedWallet)
          }
        }}>
          <ReplayIcon sx={{ color: 'secondary.light' }} fontSize="large" />
        </IconButton>
        <AddWalletOrTransac
          addWallet={toggleCreateWalletModal}
          addTransaction={handleEditTransaction}
        />
      </Box>
    )
  }

  React.useEffect(() => {
    if (wallets.selectedWallet === '') {
      setValue(wallets.wallets.length)
    }
  }, [wallets])

  return (
    <Box >
      <Box sx={{ display:'flex', justifyContent: 'left'}}>
        <Box sx={{ width:{xs:'100%', md:'95%'} }}>
          <AppBar position="static" sx={{ backgroundColor: appBarBackGroundColor, boxShadow: 'none', borderTopLeftRadius: '10px', borderTopRightRadius: {xs: '10px', md: 0}}}>
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
              {wallets.wallets.length > 0 && wallets.wallets.map((wallet, index) => (
                <Tab onClick={() => handleLinkClick(wallet.id)} sx={{color:'white'}} key={index} label={wallet.label.length > 10 && hide500 ? `${wallet.label.slice(0,5)}...` : wallet.label} {...a11yProps(index)} />
              ))}
              <Tab onClick={handleMainLinkClick} sx={{color:'white'}} label="All" {...a11yProps(wallets.wallets.length)}/>
            </Tabs>
          </AppBar>
        </Box> 
        <Box sx={{display:{xs:'none', md:'inline-block'}}}>
          <ButtonTabs/>
        </Box>
      </Box>
        {wallets.wallets.length > 0 && wallets.wallets.map((wallet, index) => (
        <TabPanel value={value} index={index} key={index}>
          <Container sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: {xs: 'column', md: 'row'}, paddingRight: 0, paddingLeft: 0}}>
          <Box sx={{display: 'flex', alignItems:'center', justifyContent: {xs:'space-between', md:'left'}, width: '100%'}}>
            <Identicon address={`454554${wallet.id}7878989`} diam={hide500 ? 50 : 100}/>
            <Typography variant={'h4'} sx={{fontWeight:'bold', marginLeft:{xs:0, md:1}}} color={'primaryTextColor.main'}>{wallet.label.length > 15 ? `${wallet.label.slice(0,5)}...` : wallet.label}</Typography>
            <EditOrDeleteItem
              editItem={toggleUpdateWalletModal}
              deleteItem={() => toggleConfirmDelete({ type: 'wallet', itemId: wallet.id })}
            />
          </Box>
            <Box sx={{display: 'flex', alignItems:'center', flexDirection: {xs:'column', md:'row'}, justifyContent: 'right', width: {xs:'50%', md:'80%'}}}>
              {wallets.performance ? <PerfWallet/> : 
              <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Skeleton sx={{marginRight: 1}} variant="text" width={50} height={40} />
                <Skeleton sx={{marginRight: 3}} variant="circular" width={25} height={25} />
              </Box>
            }
            <Box sx={{display: 'flex', flexDirection: 'row', border: 'solid 2px #a255ff', width: 'auto', height: '70px', borderRadius: '10px', alignItems: 'center', justifyContent: 'right'}}>
                {wallets.wallets.length > 0 ? <SumWallet wallet={wallet}/> : <Skeleton sx={{marginLeft: 1}} variant="text" width={100} height={50} />}
                <IconButton onClick={handleClickHide} sx={{marginLeft: 1, marginRight: 1}}>
                  {show && <VisibilityOffIcon/>}
                  {!show && <VisibilityIcon/>}
                </IconButton>
              </Box>
            </Box>
            <Box sx={{display:{xs:'inline-block', md:'none'}, width:'100%'}}>
              <ButtonTabs />
            </Box>
          </Container>
        </TabPanel>
      ))}
      <TabPanel value={value} index={wallets.wallets.length}>
        <Container sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: {xs: 'column', md: 'row'}, paddingRight: 0, paddingLeft: 0}}>
          <Box sx={{display: 'flex', alignItems:'center', justifyContent: 'left'}}>
            <Identicon address={'155156165456465516'} diam={hide500 ? 50 : 100}/>
            <Typography variant={'h4'} sx={{fontWeight:'bold', marginLeft:1}} color={'primaryTextColor.main'}>Portfolio</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems:'center', flexDirection: {xs:'column', md:'row'}, justifyContent: 'right', width: {xs:'50%', md:'80%'}}}>
            {wallets.performance ? <PerfWallet /> : 
              <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Skeleton sx={{marginRight: 1}} variant="text" width={50} height={40} />
                <Skeleton sx={{marginRight: 3}} variant="circular" width={25} height={25} />
              </Box>
            }
            <Box sx={{display: 'flex', flexDirection: 'row', border: 'solid 2px #a255ff', width: 'auto', height: '70px', borderRadius: '10px', alignItems: 'center', justifyContent: 'right'}}>
              {wallets.wallets.length > 0 ? <SumBalance/> : <Skeleton sx={{marginLeft: 1}} variant="text" width={100} height={50} />}
              <IconButton onClick={handleClickHide} sx={{marginLeft: 1, marginRight: 1}}>
                {show && <VisibilityOffIcon/>}
                {!show && <VisibilityIcon/>}
              </IconButton>
            </Box>
          </Box>
          <Box sx={{display:{xs:'inline-block', md:'none'}, width:'100%'}}>
            <ButtonTabs/>
          </Box>
        </Container>
      </TabPanel>
      <AddWallet />
      <EditWallet />
      <Dialog fullScreen={hide500 ? true : false} PaperProps={{style: { borderRadius: '10px' }}} sx={{ margin: 0, padding: 0, backdropColor: 'background.default'}} open={transactionCreatorIsOpen} onClose={() => dispatch(toggleTransactionCreator())}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'secondary.dark' }}>   
          Transactions
          <IconButton edge="end" aria-label="Fermer" onClick={() => dispatch(toggleTransactionCreator())}>
            <CloseRoundedIcon />
          </IconButton></DialogTitle>
        <DialogContent sx={{margin: 0, padding: 0, backgroundColor: 'background.default'}}>
          <TransactionCreator/>
        </DialogContent>   
      </Dialog>
    </Box>
  );
}
