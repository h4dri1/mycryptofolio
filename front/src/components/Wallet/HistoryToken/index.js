import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
  } from 'chart.js';

  import { Container, Typography, List, ListItem, Avatar }  from '@mui/material';
  import { useSelector } from 'react-redux';

  import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

  import FileUploadIcon from '@mui/icons-material/FileUpload';
  import DownloadIcon from '@mui/icons-material/Download';

  import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
  import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

  import { ethers } from 'ethers';

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
        <List sx={{height: '400px'}}>
          {history['result'] && history['result'].map((transaction) => (
            <ListItem key={transaction.hash}>
              <Container sx={{display: 'flex', border: 'solid 1px #07f3d5', borderRadius: '50%', justifyContent: 'center', height: '50px', width: '50px', alignItems: 'center', mr: 1}}>
                {transaction.type &&
                  <><Avatar sx={{backgroundColor: 'primary.light', width: '1.5em', height: '1.5em'}}>{transaction.tokenName.slice(0,1)}</Avatar></>
                }
              </Container>
              <Container sx={{display: 'flex', border: 'solid 1px #07f3d5', borderRadius: '10px', padding: 2, minWidth: '220px', justifyContent: 'center', height: '50px', alignItems: 'center'}}>
                {transaction.type === 'send' ? 
                  <><FileUploadIcon sx={{color: 'secondary.main'}}/>
                  <Typography>To {transaction.to.substring(0, 6)}...{transaction.to.substring(38, 42)}</Typography></> : 
                    <><DownloadIcon sx={{color: 'secondary.main'}}/><Typography>From {transaction.from.substring(0, 6)}...{transaction.from.substring(38, 42)}</Typography></>}
              </Container>
              <KeyboardDoubleArrowRightIcon sx={{color: 'custom.main', marginLeft: 1, marginRight: 1}}/>
              <Container sx={{display: 'flex', border: 'solid 1px #07f3d5', borderRadius: '10px', padding: 2, justifyContent: 'center', minWidth: '250px', height: '50px', alignItems: 'center'}}>
                {transaction.type === 'send' ? 
                  <><Typography>-{Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    maximumSignificantDigits: 4,
                    minimumSignificantDigits: 2,
                  }).format(ethers.utils.formatEther(transaction.value))} {transaction.tokenSymbol}</Typography></> :
                  <><Typography>+{Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    maximumSignificantDigits: 4,
                    minimumSignificantDigits: 2,
                  }).format(ethers.utils.formatEther(transaction.value))} {transaction.tokenSymbol}</Typography></>
                }
              </Container>
            </ListItem>
          ))}
        </List>
        </Container>
      </Container>
    );
  }
  