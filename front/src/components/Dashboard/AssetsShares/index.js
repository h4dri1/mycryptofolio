import { Container, Table, TableHead, TableBody, TableRow, TableCell, Divider, Typography, TableContainer, Skeleton, Paper } from '@mui/material';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function AssetsShares({ distribution }) {
  const refCurrency = useSelector((state) => state.cryptos.cryptoList.selectedCurrency);
  const { darkMode } = useSelector((state) => state.settings);
  
  const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #00b2cc;
  }
`;

const TableContainerFunction = () => {
  return (
    <TableContainer component={Paper} sx={{marginBottom: 2,backgroundColor: 'neutral.main', borderRadius: '10px', maxHeight: '25vh', maxWidth: '95%'}}>
        <Table stickyHeader size='small' aria-label="a dense table" sx={{ maxWidth: '100%', p: '10'}}>
          <StyledTableHead>
            <TableRow align="left">
              <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}>Devise</TableCell>
              <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}>Quantité</TableCell>
              <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}>Total</TableCell>
              <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}>%</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody align="left">
            {distribution.map((asset, index) => (
              <TableRow key={index}>
                <TableCell align="center" sx={{ padding: '0.5em 0', borderBottom: 0  }}>{asset.name.toUpperCase()}</TableCell>
                <TableCell align="center" sx={{ padding: '0.5em 0', borderBottom: 0  }}>{Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  maximumSignificantDigits: 4,
                  minimumSignificantDigits: 2,
                }).format(asset.quantity)}
                </TableCell>

                <TableCell align="center" sx={{ padding: '0.5em 0', borderBottom: 0  }}>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: refCurrency,
                    maximumSignificantDigits: 4,
                    minimumSignificantDigits: 2,
                  }).format(asset.value)}
                </TableCell>

                <TableCell align="center" sx={{ padding: '0.5em 0.1em', borderBottom: 0  }}>{Intl.NumberFormat('en-US', { style: 'percent', maximumSignificantDigits: 2 }).format((asset.distribution / 100))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

  return (
    <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', justifyContent: 'center' }}>
      <Container sx={{ display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center' }}>
        <AccountBalanceWalletIcon sx={{color: 'secondary.dark'}}/><Typography sx={{ fontWeight: 'bold', color:'primaryTextColor.main' }}>Tokens</Typography>
      </Container>
      <Container sx={{
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        overflowY: 'auto', 
        justifyContent: 'center',
        padding: '0',
      }}>
        {distribution.length > 0 ? <TableContainerFunction/> : <Skeleton sx={{width:{xs:'300px', md:"580px"}, height:{xs:"83px", md:'200px'}, borderRadius: '10px', marginBottom: 2}} variant="rectangle"/>}
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
