import React from 'react';
import { Box, Container, Avatar, Typography, IconButton } from '@mui/material';
import Identicon from '../../Identicon';
import { useSelector } from 'react-redux';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { setDisplaySnackBar } from 'src/actions/settings';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


export default function Banner({tokens}) {
    const {selectedCurrency} = useSelector((state) => state.cryptos.cryptoList);
    const { walletAddress, walletENS } = useSelector((state) => state.connectWallet);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let sum = 0;
    let sum24h = 0;

    for (const item of tokens) {
        sum += item.value;
    }
  
    for (const item of tokens) {
        sum24h += item.value24h;
    }

    const dayChange = ((sum - sum24h) / sum) * 100;

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

    const [show, setShow] = React.useState(true);
    const [change, setChange] = React.useState('percent');

    const handleClickHide = () => {
      setShow(!show);
    }

    const handleClickChange = () => {
      setChange(change === 'percent' ? 'value' : 'percent');
    }

    return (
        <Box disableGutters sx={{ display: 'flex', borderRadius: '10px', height: 'auto', width: 'auto', padding: 2 }}>
            <Container sx={{display: 'flex', flexDirection: 'row'}}>
                <Identicon address={walletAddress} diam={100} />
                
                <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: 2, marginTop: 1}}>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Typography component="a" href={`https://etherscan.io/address/${walletAddress}`} target="_blank" variant="h6" sx={{ cursor: 'pointer', marginTop: 1, color: 'white', textDecoration: 'none' }}>{`${walletAddress.substring(0, 6)}...${walletAddress.substring(38, 42)}`}</Typography>
                        <ContentCopyIcon onClick={() => {navigator.clipboard.writeText(walletAddress), dispatch(setDisplaySnackBar({ severity: 'success', message: `Address copied` }))}} sx={{ marginTop: 1, marginLeft: 1, cursor: 'pointer' }}></ContentCopyIcon>
                    </Box>
                    {walletENS && <Typography variant="h6" sx={{ marginTop: 1 }}>{walletENS}</Typography>}
                </Box>
            </Container>
            <Container sx={{display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
            <Typography
              variant="h6"
              color={'custom.main'}
              onClick={handleClickChange}
              sx={{cursor: 'pointer'}}
            >
            {dayChange > 0 ? `+` : ''}{Intl.NumberFormat('en-US', {
                      style: 'decimal',
                      maximumSignificantDigits: 2,
                      minimumSignificantDigits: 2,
                    }).format(change === 'percent' ? dayChange : sum - sum24h)}{change === 'percent' ? '%' : selectedCurrency}
            </Typography>
                {dayChange > 0 && <ArrowCircleUpIcon onClick={handleClickChange} color={'success'} sx={{cursor: 'pointer', marginRight: 2, height: '30px', width: '30px'}}></ArrowCircleUpIcon>}
                {dayChange < 0 && <ArrowCircleDownIcon onClick={handleClickChange} color={'error'} sx={{cursor: 'pointer', marginRight: 2, height: '30px', width: '30px'}}></ArrowCircleDownIcon>}
                <Box sx={{display: 'flex', flexDirection: 'row', border: 'solid 2px #07f3d5', width: 'auto', height: '70px', borderRadius: '10px', alignItems: 'center', justifyContent: 'right'}}>
                    <Typography
                        variant="h4"
                        color={'white'}
                        sx={{ fontWeight: 'bold', marginLeft: 2}}
                        >
                        {cryptoSym}{show ? sum.toLocaleString("en-US", curParams) : '* * * * *'}
                    </Typography>
                    <IconButton onClick={handleClickHide} sx={{marginLeft: 1, marginRight: 1}}>
                        {show && <VisibilityOffIcon/>}
                        {!show && <VisibilityIcon/>}
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
} 