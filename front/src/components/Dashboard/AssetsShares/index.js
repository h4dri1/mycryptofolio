/* eslint-disable max-len */
import {
  Container, Table, TableHead, TableBody, TableRow, TableCell, Typography, TableContainer, Skeleton, Paper, Box, Avatar,
} from '@mui/material';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';

import MoodBadIcon from '@mui/icons-material/MoodBad';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { Link as RouterLink } from 'react-router-dom';

const StyledTableHead = styled(TableHead)`
& .MuiTableCell-root {
  background-color: #00b2cc;
}
`;

function TableContainerFunction(props) {
  const { distribution, allCryptos, refCurrency, darkMode } = props;
  const addIcon = distribution.map((d) => allCryptos.find((c) => c.symbol === d.name)?.image);

  return (
    distribution[0]?.name !== 'empty' ? (
      <TableContainer
        component={Paper}
        sx={{
          marginBottom: 2, backgroundColor: 'neutral.main', borderRadius: '10px', maxHeight: '25vh', maxWidth: '95%',
        }}
      >
        <Table stickyHeader size="small" aria-label="a dense table" sx={{ maxWidth: '100%', p: '10' }}>
          <StyledTableHead>
            <TableRow align="left">
              <TableCell align="center" sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>Devise</TableCell>
              <TableCell align="center" sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>Quantité</TableCell>
              <TableCell align="center" sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>Total</TableCell>
              <TableCell align="center" sx={{ borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>%</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody align="left">
            {distribution.map((asset, index) => (
              <TableRow hover key={index}>
                <TableCell align="center" sx={{ padding: '0.5em 0', borderBottom: 0 }}>
                  <Box component={RouterLink} to={`/crypto/${asset.coin_id}`} sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <Avatar src={addIcon[index]} alt="crypto icon" style={{ width: '20px', height: '20px', marginLeft: 10 }} />
                    <Typography ml={2} variant="body2" sx={{ color: darkMode ? '#07f3d5' : '' }}>
                      {asset.name.toUpperCase()}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ padding: '0.5em 0', borderBottom: 0 }}>{Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  maximumSignificantDigits: 4,
                  minimumSignificantDigits: 2,
                }).format(asset.quantity)}
                </TableCell>

                <TableCell align="center" sx={{ padding: '0.5em 0', borderBottom: 0 }}>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: refCurrency,
                    maximumSignificantDigits: 4,
                    minimumSignificantDigits: 2,
                  }).format(asset.value)}
                </TableCell>
                <TableCell align="center" sx={{ padding: '0.5em 0.1em', borderBottom: 0 }}>{Intl.NumberFormat('en-US', { style: 'percent', maximumSignificantDigits: 2 }).format((asset.distribution / 100))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
      : (
        <Container sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem: 'center', marginTop: 1, marginBottom: 4,
        }}
        >
          <MoodBadIcon sx={{ fontSize: '4em', textAlign: 'center', width: '100%' }} />
          <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '0.8em' }}>No assets to display</Typography>
        </Container>
      )
  );
}

export default function AssetsShares({ distribution }) {
  const refCurrency = useSelector((state) => state.cryptos.cryptoList.selectedCurrency);
  const allCryptos = useSelector((state) => state.cryptos.allCryptos);
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <Container
      disableGutters
      sx={{
        display: 'flex', flexDirection: 'column', borderRadius: '10px', justifyContent: 'center',
      }}
    >
      <Container sx={{
        display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center',
      }}
      >
        <AccountBalanceWalletIcon sx={{ color: 'secondary.dark' }} /><Typography sx={{ fontWeight: 'bold', color: 'primaryTextColor.main' }}>Tokens</Typography>
      </Container>
      <Container sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflowY: 'auto',
        justifyContent: 'center',
        padding: '0',
      }}
      >
        { distribution.length > 0 ? <TableContainerFunction refCurrency={refCurrency} allCryptos={allCryptos} darkMode={darkMode} distribution={distribution} /> : (
          <Skeleton
            sx={{
              width: { xs: '300px', md: '580px' }, height: { xs: '83px', md: '200px' }, borderRadius: '10px', marginBottom: 2,
            }}
            variant="rectangle"
          />
        )}
      </Container>
    </Container>
  );
}

AssetsShares.propTypes = {
  distribution: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    distribution: PropTypes.string.isRequired,
  })).isRequired,
};
