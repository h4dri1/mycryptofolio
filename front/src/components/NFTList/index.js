import {
  Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, Avatar, Box, Grid,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles, useTheme } from '@mui/styles';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNFTList, getMoreNFT } from 'src/actions/nft';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: '78%',
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
  // const { selectedCurrency } = useSelector((state) => state.nft.selectedCurrency);
  const { darkMode } = useSelector((state) => state.settings);

  // if (selectedCurrency === 'BTC') {
  //  var curParams = {
  //    maximumSignificantDigits: 4
  //  }
  //  var cryptoSym = '₿'
  // } else if (selectedCurrency === 'ETH') {
  //  var curParams = {
  //    maximumSignificantDigits: 4
  //  }
  //  var cryptoSym = 'Ξ'
  // } else {
  //  var curParams = {
  //    style: "currency",
  //    currency: selectedCurrency,
  //    maximumSignificantDigits: 4
  //  }
  //  var cryptoSym = ''
  // }

  return (
    <Box sx={{ minHeight: '82.5vh' }}>
      <Grid container justifyContent="center" className={classes.root}>
        <Grid item xs={12} className={classes.NFTList}>
          <Table
            stickyHeader
            size="medium"
            aria-label="a dense table"
            sx={{
              backgroundColor: 'primary.main', marginTop: 2, boxShadow: 5, borderRadius: '10px',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '' }} align="center"><TableSortLabel />#</TableCell>
                <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '' }} />
                <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'table-cell', sm: 'table-cell' } }}>Nom</TableCell>
                <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'none', lg: 'table-cell' } }}>Blockchain</TableCell>
                <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'none', sm: 'table-cell' } }}>Owners</TableCell>
                <TableCell sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'none', sm: 'table-cell' } }}>Tokens</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {nfts.map((nft, index) => (
                <TableRow key={index} hover>
                  <TableCell align="center" sx={{ padding: { xs: ' 0 -16px', sm: '0px' }, color: 'primaryTextColor.main' }}>{index + 1}</TableCell>
                  <TableCell>
                    <Box
                      component={RouterLink}
                      to="/nft"
                      sx={{
                        color: 'primary.light', display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' },
                      }}
                    >
                      <Avatar src={nft.attributes.image_preview_icon_url} alt={nft.attributes.name} sx={{ width: 75, height: 75, marginLeft: 1 }} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'table-cell', sm: 'table-cell' }, color: 'primaryTextColor.main' }}>{nft.attributes.name}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' }, color: 'primaryTextColor.main' }}>{nft.attributes.network}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, color: 'primaryTextColor.main' }}>{nft.attributes.unique_owners}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, color: 'primaryTextColor.main' }}>{nft.attributes.tokens}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item>
          <LoadingButton
            variant="outlined"
            sx={{ color: !darkMode ? 'primary.light' : '#07f3d5', borderColor: !darkMode ? 'primary.light' : '#002F54' }}
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
