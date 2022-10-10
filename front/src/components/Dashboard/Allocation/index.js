import { Typography, Container } from '@mui/material';

import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import PieChartIcon from '@mui/icons-material/PieChart';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Allocation({chartData}) {
  const labelsList = chartData.map((item) => (
    item.name
  ));

  const dataList = chartData.map((item) => (
    item.distribution
  ));

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
        }
      },
    }
  };

  // DATA PIE GRAPH
  const data = {
    type: 'doughnut',
    // TODO: LABEL à dynamiser
    labels: labelsList,
    // labels: ['BTC', 'ETH',...]
    datasets: [
      {
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
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container disableGutters sx={{ borderRadius: '10px', height: 'auto' }}>
      <Container sx={{ display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center' }}>
        <PieChartIcon sx={{color: 'secondary.dark'}}/><Typography sx={{ fontWeight: 'bold', color:'primaryTextColor.main' }}>Token allocation</Typography>
      </Container>
      <Container sx={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', maxHeight: '60vh', overflowY: 'auto', justifyContent: 'center'
        }}
        >
        <Container
          sx={{ width: '50%', height: '50%'}}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Container>
      </Container>
    </Container>
  );
}
