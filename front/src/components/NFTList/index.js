import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles, useTheme } from '@mui/styles';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNFTList, getMoreNFT } from 'src/actions/nft';

import Loading from '../Loading'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto', 
    [theme.breakpoints.up('md')]: {
      maxWidth: '78%'
    },
  },
  NFTList: {
    margin: '0% 1% 3% 1%',
  },
}));

function NFTList() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);

  const { list: nfts, NFTListLoading } = useSelector((state) => state.nft.NFTList);
  //const { selectedCurrency } = useSelector((state) => state.nft.selectedCurrency);
  const { darkMode } = useSelector((state) => state.settings);

  //if (selectedCurrency === 'BTC') {
  //  var curParams = {
  //    maximumSignificantDigits: 4
  //  }
  //  var cryptoSym = '₿'
  //} else if (selectedCurrency === 'ETH') {
  //  var curParams = {
  //    maximumSignificantDigits: 4
  //  }
  //  var cryptoSym = 'Ξ'
  //} else {
  //  var curParams = {
  //    style: "currency",
  //    currency: selectedCurrency,
  //    maximumSignificantDigits: 4
  //  }
  //  var cryptoSym = ''
  //}

  useEffect(() => { 
    dispatch(getNFTList());
  }, []);

  return (
    <Box sx={{minHeight: '82.5vh'}}>
    <Grid container justifyContent="center" className={classes.root}>
      <Grid item xs={12} className={classes.NFTList}>
        <Table stickyHeader size='medium' aria-label="a dense table" sx={{backgroundColor: !darkMode ? '#EAE3FF' : '#002F54', marginTop: 2, boxShadow: 5, borderRadius: '10px'}}>
          <TableHead >
            <TableRow>
              <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : ''}} align="center"><TableSortLabel />#</TableCell>
              <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : ''}}></TableCell>
              <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'table-cell', sm: 'table-cell' } }}>Nom</TableCell>
              <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'none', lg: 'table-cell' } }}>Blockchain</TableCell>
              <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'none', md: 'table-cell' } }}>Buyers</TableCell>
              <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'none', md: 'table-cell' } }}>Sellers</TableCell>
              <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'none', sm: 'table-cell' } }}>Owners</TableCell>
              <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'none', sm: 'table-cell' } }}>Transactions</TableCell>
              <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'none', sm: 'table-cell' } }}>Valeur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {nfts.map((nft) => (
              <TableRow key={nft.rank} hover>
                <TableCell align="center" sx={{ padding: { xs: ' 0 -16px', sm: '0px' } }}>{nft.rank}</TableCell>
                <TableCell>
                <Box component={RouterLink} to={`/nft`} sx={{ color: "primary.light", display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' } }}>
                  <Avatar src={nft.iconUrl} alt={nft.productPath} sx={{ width: 75, height: 75, marginLeft: 1 }} />
                </Box>
                </TableCell>
                <TableCell sx={{ display: { xs: 'table-cell', sm: 'table-cell' } }}>{nft.contractName}</TableCell>
                <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>{nft.baseCurrency}</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{nft.buyers}</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{nft.sellers}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{nft.owners}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{nft.transactions}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>${Math.round(nft.valueUSD).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item>
        <LoadingButton
          variant="outlined"
          sx={{ color: !darkMode ? "primary.light" :  '#07f3d5', borderColor: !darkMode ? "primary.light" : '#002F54' }}
          loading={NFTListLoading}
          onClick={() => dispatch(getMoreNFT())}
        >
          Charger plus de NFT
        </LoadingButton>
      </Grid>
    </Grid>
    </Box>
  );
}

export default NFTList;
