import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
  } from 'chart.js';
  import React from 'react';
  import { Container, Typography, useMediaQuery, List, ListItem, Box, ListItemIcon }  from '@mui/material';
  import { useSelector } from 'react-redux';

  import Loading from '../../Loading'

  import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

  import FileUploadIcon from '@mui/icons-material/FileUpload';
  import DownloadIcon from '@mui/icons-material/Download';

  ChartJS.register(ArcElement, Tooltip, Legend);
  
  export default function HistoryToken({ history }) {
    const {selectedCurrency} = useSelector((state) => state.cryptos.cryptoList);
    const { darkMode } = useSelector((state) => state.settings);

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

    const transactionArray = history['result']

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
            <FormatListBulletedIcon sx={{color: !darkMode ? 'secondary.dark' : '#07f3d5'}}/><Typography sx={{ fontWeight: 'bold' }}>Token Transfert History</Typography>
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
        <List>
          {history['result'] && history['result'].map((transaction) => (
            <ListItem key={transaction.hash}>
              <Box sx={{display: 'flex', border: 'solid 1px #07f3d5', borderRadius: '10px', padding: 2}}>
                <Typography>From {transaction.from.substring(0, 6)}...{transaction.from.substring(38, 42)}</Typography>
                <Typography>To {transaction.to.substring(0, 6)}...{transaction.to.substring(38, 42)}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        </Container>
      </Container>
    );
  }
  