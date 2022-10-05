import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
  } from 'chart.js';
  import { TableContainer, Paper, Skeleton, Container, Table, TableHead, TableBody, TableRow, TableCell, Typography, useMediaQuery, Box, Avatar } from '@mui/material';

  import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

  import { useSelector } from 'react-redux';

  import MoodBadIcon from '@mui/icons-material/MoodBad';

  import { ethers } from 'ethers';

  import { Link as RouterLink } from 'react-router-dom';
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  export default function AssetsShares({ distribution }) {
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
    
    const labelsList = distribution.map((item) => (
      item.symbol
    ));
  
    const dataList = distribution.map((item) => (
      item.share
    ));
     //OPTIONS PIE GRAPH
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };
     //DATA PIE GRAPH
    const data = {
  
      // TODO: LABEL à dynamiser
      labels: labelsList,
      // labels: ['BTC', 'ETH',...]
      datasets: [
        {
          label: '% of assets',
          // TODO: DATA à dynamiser
          data: dataList,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };

    const TableContainerFunct = (props) => {
      return (
      distribution[0].balance !== '0x0' && distribution[0].name !== 'Ethereum' ? (
        <TableContainer component={Paper} sx={{marginBottom: 2,backgroundColor: 'neutral.main', borderRadius: '10px'}}>
          <Table size='small' aria-label="a dense table" sx={{ maxWidth: '100%', p: '10'}}>
            <TableHead sx={{backgroundColor:'secondary.dark'}} align="left">
              <TableRow align="left">
                <TableCell align="left" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : '', padding: '1em 0', paddingLeft: 5}}>Token</TableCell>
                <TableCell align="left" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : '', padding: '1em 0'}}>Price</TableCell>
                <TableCell align="left" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : '', padding: '1em 0'}}>24h%</TableCell>
                <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : '', padding: '1em 0', display: { xs: 'none', sm: 'table-cell' }}}>Quantity</TableCell>
                <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : '', padding: '1em 0'}}>Value</TableCell>
                <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : '', padding: '1em 0', display: { xs: 'none', sm: 'table-cell' }}}>%</TableCell>
                <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : '', padding: '1em 0', display: { xs: 'none', sm: 'table-cell' }}}></TableCell>
              </TableRow>
            </TableHead>
              <TableBody align="left">
                {distribution.map((asset) => (
                  (asset.value > 0.1 || selectedCurrency === 'BTC' || selectedCurrency === 'ETH') && (
                  <TableRow hover key={asset.name}>
                    <TableCell align='center' sx={{borderBottom: 0 }}>
                      <Box component={RouterLink} to={`/crypto/${asset.name}`} sx={{ justifyContent: 'left', color: "primary.light", display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' } }}>
                          <Avatar src={asset.thumbnail ? asset.thumbnail : asset.name.slice(0,1)} alt={asset.symbol.slice(0,1)} sx={{ mr: {xs: 1, md: 3}, width: 20, height: 20, marginLeft: 1, backgroundColor: 'custom.main', color: 'secondary.light' }} />
                          <Typography sx={{color: 'secondary.dark'}}>{hide500 ? asset.symbol.toUpperCase() : asset.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left" sx={{ padding: '0.5em 0', borderBottom: 0 }}>{cryptoSym}{asset.price.toLocaleString("en-US", curParams)}
                    </TableCell>
                    <TableCell align="left" sx={{ ...(asset.change24h > 0 ? { color: '#1cb344' } : { color: '#eb3b5a' }),padding: '0.5em 0', borderBottom: 0 }}>{Intl.NumberFormat('en-US', {
                      style: 'decimal',
                      maximumSignificantDigits: 2,
                      minimumSignificantDigits: 2,
                    }).format(asset.change24h)}%
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '0.5em 0', borderBottom: 0, display: { xs: 'none', sm: 'table-cell' } }}>{Intl.NumberFormat('en-US', {
                      style: 'decimal',
                      maximumSignificantDigits: 4,
                      minimumSignificantDigits: 2,
                    }).format(ethers.utils.formatEther(asset.balance))}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '0.5em 0', borderBottom: 0 }}>{cryptoSym}{asset.value.toLocaleString("en-US", curParams)}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '0.5em 0', borderBottom: 0, display: { xs: 'none', sm: 'table-cell' } }}>{Intl.NumberFormat('en-US', {
                      style: 'decimal',
                      maximumSignificantDigits: 2,
                      minimumSignificantDigits: 2,
                    }).format(asset.share)}%
                    </TableCell>
                  </TableRow>
                )
                ))}
              </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem: 'center', marginTop: 1, marginBottom: 2}}>
          <MoodBadIcon sx={{color: !darkMode ? "neutral.contrastText" : 'white', fontSize: '4em', textAlign: 'center', width: '100%'}}/>
          <Typography sx={{color: !darkMode ? "neutral.contrastText" : 'custom.main', textAlign: 'center', width: '100%', fontSize: '0.8em'}}>No assets to display</Typography>
        </Container>
        
      )
    )
  }
      

    const hide500 = useMediaQuery('(max-width:600px)');

    return (
      <Container disableGutters sx={{ borderRadius: '10px', height: 'auto' }}>
        <Container sx={{ display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center' }}>
            <AccountBalanceWalletIcon sx={{color: 'secondary.dark'}}/><Typography sx={{ fontWeight: 'bold', color:'primaryTextColor.main' }}>Tokens</Typography>
        </Container>
        <Container sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '100vh', overflowY: 'auto', justifyContent: 'center',
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
        {/*<Container sx={{width: '25%', height: '35%', marginBottom: 2}}>
            <Pie
                data={data}
                options={options}
            />
        </Container>*/}
        {distribution.length > 0 ? <TableContainerFunct/> : <Skeleton sx={{width:{xs:'300px', md:"580px"}, height:{xs:"83px", md:'200px'}, borderRadius: '10px', marginBottom: 2}} variant="rectangle"/>}
        </Container>
      </Container>
    );
  }
  