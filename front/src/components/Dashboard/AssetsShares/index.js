import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AssetsShares({ distribution }) {
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

  return (
    <Container disableGutters sx={{ border: 0, borderColor: 'grey', margin: { xs: '2em 0', md: '0' } }}>
      <Typography color="primary.light" variant="h6" align="center">Répartition de vos actifs</Typography>
      <Divider sx={{ width: '100%' }} />
      <Container
        sx={{ width: '40%', height: '40%', mt: 1 }}
      >
        <Pie
          data={data}
          options={options}
        />
      </Container>
      <Container sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '30vh', overflowY: 'auto',
      }}
      >
        <Table stickyHeader sx={{ maxWidth: '100%', p: '10' }}>
          <TableHead align="left">
            <TableRow align="left">
              <TableCell align="center" sx={{ padding: '1em 0' }}>Devise</TableCell>
              <TableCell align="center" sx={{ padding: '1em 0' }}>Quantité</TableCell>
              <TableCell align="center" sx={{ padding: '1em 0' }}>Total</TableCell>
              <TableCell align="center" sx={{ padding: '1em 0' }}>%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody align="left">
            {distribution.map((asset, index) => (
              <TableRow key={index}>
                <TableCell align="center" sx={{ padding: '0.5em 0' }}>{asset.name}</TableCell>
                <TableCell align="center" sx={{ padding: '0.5em 0' }}>{asset.quantity.toLocaleString()}</TableCell>
                <TableCell align="center" sx={{ padding: '0.5em 0' }}>{`$${(Math.round(asset.value * 100) / 100).toLocaleString()}`}</TableCell>
                <TableCell align="center" sx={{ padding: '0.5em 0.1em' }}>{(Math.round(asset.distribution * 10)) / 10}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Container>
  );
}

AssetsShares.propTypes = {
  distribution: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    distribution: PropTypes.number.isRequired,
  })).isRequired,
};
