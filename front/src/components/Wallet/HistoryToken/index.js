import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
  } from 'chart.js';
  import React from 'react';
  import { Pie } from 'react-chartjs-2';
  import Container from '@mui/material/Container';
  import { TableContainer, Paper, IconButton } from '@mui/material';
  import Table from '@mui/material/Table';
  import TableHead from '@mui/material/TableHead';
  import TableBody from '@mui/material/TableBody';
  import TableRow from '@mui/material/TableRow';
  import TableCell from '@mui/material/TableCell';
  import Divider from '@mui/material/Divider';
  import Typography from '@mui/material/Typography';
  import useMediaQuery from '@mui/material/useMediaQuery';
  import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
  import Box from '@mui/material/Box';
  import { Avatar } from '@mui/material';

  import PaidIcon from '@mui/icons-material/Paid';
  
  import PropTypes from 'prop-types';
  import { useSelector } from 'react-redux';

  import { ethers } from 'ethers';

  import { Link as RouterLink } from 'react-router-dom';

  import DashboardIcon from '@mui/icons-material/Dashboard';
  import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
  import PercentIcon from '@mui/icons-material/Percent';
  import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

  ChartJS.register(ArcElement, Tooltip, Legend);
  
  export default function HistoryToken({ history }) {
    const {selectedCurrency} = useSelector((state) => state.cryptos.cryptoList);
    const { darkMode } = useSelector((state) => state.settings);
   
    console.log(history);

    if (selectedCurrency === 'BTC') {
      var curParams = {
        maximumSignificantDigits: 4
      }
      var cryptoSym = '₿'
    } else if (selectedCurrency === 'ETH') {
      var curParams = {
        maximumSignificantDigits: 4
      }
      var cryptoSym = 'Ξ'
    } else {
      var curParams = {
        style: "currency",
        currency: selectedCurrency,
        maximumSignificantDigits: 4
      }
      var cryptoSym = ''
    }
  
    const hide500 = useMediaQuery('(max-width:600px)');

    const [show, setShow] = React.useState(true);
    const [change, setChange] = React.useState('percent');

    const handleClickHide = () => {
      setShow(!show);
    }

    const handleClickChange = () => {
      setChange(change === 'percent' ? 'value' : 'percent');
    }

    return (
      <Container disableGutters sx={{ borderRadius: '10px', height: '100%'}}>
        <Container sx={{ display: 'flex', marginBottom: 1, marginTop: 1, justifyContent: 'center' }}>
            <FormatListBulletedIcon sx={{color: !darkMode ? 'secondary.dark' : '#07f3d5'}}/><Typography sx={{ fontWeight: 'bold' }}>History</Typography>
        </Container>
        <Container sx={{
          marginTop: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', height: 'auto', overflowY: 'auto', justifyContent: 'space-around',
          '&::-webkit-scrollbar': {
            width: '0.4em'
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)', 
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#7f5cce',
            outline: '1px solid slategrey'
          }
        }}
        >
        

        </Container>
      </Container>
    );
  }
  