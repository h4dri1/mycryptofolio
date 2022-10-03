import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
  } from 'chart.js';

  import { Container, Typography, List, ListItem, Avatar, Divider, ListItemAvatar, ListItemText, Box }  from '@mui/material';
  import { useSelector } from 'react-redux';

  import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

  import FileUploadIcon from '@mui/icons-material/FileUpload';
  import DownloadIcon from '@mui/icons-material/Download';

  import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
  import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

  import WatchLaterIcon from '@mui/icons-material/WatchLater';

  import AddIcon from '@mui/icons-material/Add';
  import RemoveIcon from '@mui/icons-material/Remove';
  import TagIcon from '@mui/icons-material/Tag';

  import { ethers } from 'ethers';

  ChartJS.register(ArcElement, Tooltip, Legend);
  
  export default function HistoryToken({ history }) {
    const {selectedCurrency} = useSelector((state) => state.cryptos.cryptoList);
    const { darkMode } = useSelector((state) => state.settings);
    const { walletNetwork } = useSelector((state) => state.wallet);

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

    const date = (timestamp) => {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();
      const time = day + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    }

    return (
      <Container disableGutters sx={{ borderRadius: '10px', height: '100%', width:'100%'}}>
        <Container sx={{ display: 'flex', marginBottom: 1, marginTop: 1, justifyContent: 'center', width:'100%' }}>
            <FormatListBulletedIcon sx={{color: !darkMode ? 'secondary.dark' : '#07f3d5'}}/><Typography sx={{ fontWeight: 'bold' }}>Token Transfert History</Typography>
        </Container>
        <Container disableGutters sx={{
          marginTop: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', height: 'auto', width:'100%', overflowY: 'auto',
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
        <List sx={{height: '400px', width:'100%'}}>
          {history['result'] && history['result'].map((transaction) => (          
            <ListItem sx={{display:'flex', flexDirection:'column', padding:0}} key={transaction.hash}>
              <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2}}>
                <Box sx={{width: 25, height: 25, borderRadius: '50%'}} component={'img'} src={Number(walletNetwork) === 137 ? "https://cdn-icons-png.flaticon.com/512/7016/7016537.png" : "https://cdn-icons-png.flaticon.com/512/7016/7016523.png" }/>
                <WatchLaterIcon sx={{color: 'secondary.main'}}/>
                <ListItemText sx={{color:'custom.main'}} primary={date(transaction.timeStamp)}/>
              </Container>
              <Divider sx={{width: '100%', marginBottom: 1.5}}/>
              <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ListItemAvatar sx={{display: 'flex', border: 'solid 1px #07f3d5', borderRadius: '50%', justifyContent: 'center', height: '50px', width: '50px', alignItems: 'center', mr: 1}}>
                  <Avatar sx={{backgroundColor: 'primary.light', width: '1.5em', height: '1.5em'}}>{transaction.tokenName.slice(0,1)}</Avatar>
                </ListItemAvatar>
                <Container sx={{display: {xs:'none', md:'flex'}, border: 'solid 1px #07f3d5', borderRadius: '10px', minWidth: '220px', justifyContent: 'center', height: '50px', alignItems: 'center'}}>
                  {transaction.type === 'send' ? 
                    <><FileUploadIcon sx={{color: 'secondary.main'}}/>
                    <Typography>To {transaction.to.substring(0, 6)}...{transaction.to.substring(38, 42)}</Typography></> : 
                      <><DownloadIcon sx={{color: 'secondary.main'}}/><Typography>From {transaction.from.substring(0, 6)}...{transaction.from.substring(38, 42)}</Typography></>}
                </Container>
                <KeyboardDoubleArrowRightIcon sx={{color: 'custom.main', marginLeft: 1, marginRight: 1}}/>
                <Container sx={{display: {xs:'none', md:'flex'}, border: 'solid 1px #07f3d5', borderRadius: '10px', minWidth: '220px', justifyContent: 'center', height: '50px', alignItems: 'center'}}>
                  {transaction.type === 'send' ? 
                    <><FileUploadIcon sx={{color: 'secondary.main'}}/>
                    <Typography>From {transaction.from.substring(0, 6)}...{transaction.to.substring(38, 42)}</Typography></> : 
                      <><DownloadIcon sx={{color: 'secondary.main'}}/><Typography>To {transaction.to.substring(0, 6)}...{transaction.from.substring(38, 42)}</Typography></>}
                </Container>
                {transaction.type === 'receive' && <AddIcon sx={{display: {xs:'none', md:'block'}, margin: 1, color:'custom.main'}}/>}
                {transaction.type === 'send' && <RemoveIcon sx={{display: {xs:'none', md:'block'}, margin: 1, color:'custom.main'}}/>}
                <Container sx={{display: 'flex', border: 'solid 1px #07f3d5', borderRadius: '10px', justifyContent: 'center', minWidth: '200px', height: '50px', alignItems: 'center'}}>
                  {transaction.type === 'send' ? 
                    <><Typography sx={{fontWeight:'bold', color:'custom.main'}}>{Intl.NumberFormat('en-US', {
                      style: 'decimal',
                      maximumSignificantDigits: 4,
                      minimumSignificantDigits: 2,
                    }).format(ethers.utils.formatEther(transaction.value))} {transaction.tokenSymbol}</Typography></> :
                    <><Typography sx={{fontWeight:'bold', color:'custom.main'}}>{Intl.NumberFormat('en-US', {
                      style: 'decimal',
                      maximumSignificantDigits: 4,
                      minimumSignificantDigits: 2,
                    }).format(ethers.utils.formatEther(transaction.value))} {transaction.tokenSymbol}</Typography></>
                  }
                </Container>
                <Container sx={{ml:1, display: {xs:'none', md:'flex'}, border: 'solid 1px #07f3d5', borderRadius: '10px', justifyContent: 'center', minWidth: '210px', height: '50px', alignItems: 'center'}}>
                  <TagIcon sx={{color:'secondary.main'}}/>
                  <Typography component="a" href={Number(walletNetwork) === 137 ? `https://polygonscan.com/tx/${transaction.hash}` : `https://etherscan.io/tx/${transaction.hash}`} rel="noopener" target="_blank" sx={{cursor: 'pointer', color: 'white', textDecoration: 'none'}}>{transaction.hash.substring(0, 6)}...{transaction.hash.substring(38, 42)}</Typography>
                </Container>
              </Container>
            </ListItem>
          ))}
        </List>
        </Container>
      </Container>
    );
  }
  