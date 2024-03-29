import React from 'react';
import { Box, Container, Avatar, Typography, IconButton, Skeleton, Badge } from '@mui/material';
import Identicon from '../../Identicon';
import { useSelector, useDispatch } from 'react-redux';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { setDisplaySnackBar } from 'src/actions/settings';

export default function Banner({tokens}) {
    const {selectedCurrency} = useSelector((state) => state.cryptos.cryptoList);
    const { walletAddress, walletENS, walletNetwork } = useSelector((state) => state.wallet);
    const dispatch = useDispatch();

    let sum = 0;
    let sum24h = 0;

    for (const item of tokens) {
        sum += item.value;
        sum24h += item.value24h;
    }

    if (sum === 0) { 
      var dayChange = 0;
    } else {
      var dayChange = ((sum - sum24h) / sum) * 100;
    }
    

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

    const SumBalance = () => {
      return (
        <Typography
          variant="h4"
          color={'white'}
          sx={{ fontWeight: 'bold', marginLeft: 2}}
          >
          {cryptoSym}{show ? sum.toLocaleString("en-US", curParams) : '* * * * *'}
        </Typography>
      )
    }

    const DayChanging = () => {
      return (
        sum !== 0 ? (
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
        ) : (
          null
      ))
    }

    const Typo = () => {
      if (Number(walletNetwork) === 1) {
        return (
          <Typography variant="h6" color={'custom.main'}>
            {walletENS}
          </Typography>
        )
      } else {
        return (
          null
        )
      }
    }

    return (
        <Box sx={{flexDirection: {xs: 'column', md: 'row'}, display: 'flex', borderRadius: '10px', height: 'auto', width: 'auto', padding: 2 }}>
            <Container sx={{display: 'flex', flexDirection: 'row'}}>
              <Badge sx={{"& .MuiBadge-badge": { height: '28px', width: '28px', borderRadius: '50%' }}} badgeContent={<Box sx={{width: 25, height: 25, borderRadius: '50%'}} component={'img'} src={Number(walletNetwork) === 137 ? "https://cdn-icons-png.flaticon.com/512/7016/7016537.png" : "https://cdn-icons-png.flaticon.com/512/7016/7016523.png" }/>} overlap="circular" color="success">
                <Identicon address={walletAddress} diam={100} />
              </Badge> 
                <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: 2, marginTop: 1}}>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Typography component="a" href={Number(walletNetwork) === 137 ? `https://polygonscan.com/address/${walletAddress}` : `https://etherscan.io/address/${walletAddress}`} rel="noopener" target="_blank" variant="h6" sx={{ cursor: 'pointer', marginTop: 1, color: 'white', textDecoration: 'none' }}>{`${walletAddress.substring(0, 6)}...${walletAddress.substring(38, 42)}`}</Typography>
                        <ContentCopyIcon onClick={() => {navigator.clipboard.writeText(walletAddress), dispatch(setDisplaySnackBar({ severity: 'success', message: `Address copied` }))}} sx={{ marginTop: 1, marginLeft: 1, cursor: 'pointer' }}></ContentCopyIcon>
                    </Box>
                    <Typo/>
                </Box>
            </Container>
            <Container sx={{display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
                {tokens.length > 0 ? <DayChanging/> : 
                <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Skeleton sx={{marginRight: 1}} variant="text" width={50} height={40} />
                  <Skeleton sx={{marginRight: 3}} variant="circular" width={25} height={25} />
                </Box>}
                {dayChange > 0 && <ArrowCircleUpIcon onClick={handleClickChange} color={'success'} sx={{cursor: 'pointer', marginRight: 2, height: '30px', width: '30px'}}></ArrowCircleUpIcon>}
                {dayChange < 0 && <ArrowCircleDownIcon onClick={handleClickChange} color={'error'} sx={{cursor: 'pointer', marginRight: 2, height: '30px', width: '30px'}}></ArrowCircleDownIcon>}
                <Box sx={{display: 'flex', flexDirection: 'row', border: 'solid 2px #07f3d5', width: 'auto', height: '70px', borderRadius: '10px', alignItems: 'center', justifyContent: 'right'}}>
                    {tokens.length > 0 ? <SumBalance /> : <Skeleton sx={{marginLeft: 1}} variant="text" width={100} height={50} />}
                    <IconButton onClick={handleClickHide} sx={{marginLeft: 1, marginRight: 1}}>
                        {show && <VisibilityOffIcon/>}
                        {!show && <VisibilityIcon/>}
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
} 