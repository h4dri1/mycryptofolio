import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Divider, Typography, TableContainer } from '@mui/material';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AssetsShares({ distribution }) {
  const refCurrency = useSelector((state) => state.cryptos.cryptoList.selectedCurrency);
  const { darkMode } = useSelector((state) => state.settings);
  const labelsList = distribution.map((item) => (
    item.name
  ));

  const dataList = distribution.map((item) => (
    item.distribution
  ));

  // OPTIONS PIE GRAPH
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // DATA PIE GRAPH
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

  const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #00b2cc;
  }
`;

  return (
    <Container disableGutters sx={{ border: 0, borderColor: 'grey', margin: { xs: '2em 0', md: '0' } }}>
      <Typography color="secondary.light" variant="h6" align="center">Répartition de vos actifs</Typography>
      <Divider sx={{ width: '100%' }} />
      <Container
        sx={{ width: '40%', height: '40%', mt: 1, mb:1 }}
      >
        <Pie
          data={data}
          options={options}
        />
      </Container>
      <TableContainer sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '25vh', overflowY: 'auto', borderRadius: '10px', bgcolor: 'neutral.main',
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
        <Table stickyHeader sx={{ maxWidth: '100%', p: '10' }}>
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
