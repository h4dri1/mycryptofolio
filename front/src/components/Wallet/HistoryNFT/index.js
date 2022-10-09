import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
  } from 'chart.js';
  import React from 'react';
  import { Container, Typography } from '@mui/material/Container';
  import { useSelector } from 'react-redux';
  import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

  ChartJS.register(ArcElement, Tooltip, Legend);
  
  export default function HistoryToken({ history }) {
    const {selectedCurrency} = useSelector((state) => state.cryptos.cryptoList);

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

    return (
      <Container disableGutters sx={{ borderRadius: '10px', height: '100%'}}>
        <Container sx={{ display: 'flex', marginBottom: 1, marginTop: 1, justifyContent: 'center' }}>
            <FormatListBulletedIcon sx={{color: 'secondary.dark'}}/><Typography sx={{ fontWeight: 'bold', color: 'primaryTextColor.main' }}>History NFT</Typography>
        </Container>
        <Container sx={{
          marginTop: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', height: 'auto', overflowY: 'auto', justifyContent: 'space-around'}}
        >
        

        </Container>
      </Container>
    );
  }
  