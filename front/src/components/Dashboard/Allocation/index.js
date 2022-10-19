import { Typography, Container, Skeleton, Box, useMediaQuery } from '@mui/material';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import PieChartIcon from '@mui/icons-material/PieChart';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Allocation({chartData}) {
  const hide500 = useMediaQuery('(max-width:500px)');
  const labelsList = chartData.map((item) => (
    item.name
  ));

  const dataList = chartData.map((item) => (
    item.distribution
  ));

  const options = {
    plugins: {
      legend: {
        display: !hide500,
        position: 'right',
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
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
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
      <Container sx={{ display: 'flex',  marginTop: 1, justifyContent: 'center' }}>
        <PieChartIcon sx={{color: 'secondary.dark'}}/><Typography sx={{ fontWeight: 'bold', color:'primaryTextColor.main' }}>Token allocation</Typography>
      </Container>
      <Container sx={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', maxHeight: '60vh', overflowY: 'auto', justifyContent: 'center'
        }}
        >
        {data.labels[0] !== 'empty' ? (
          <Container
          sx={{ width: '60%', height: '60%', margin:{xs: 1, md: 0}}}
        >
          {data.datasets[0].data.length > 0 ? <Doughnut
            data={data}
            options={options}
          /> : <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Skeleton variant="circular" width={150} height={150} sx={{marginTop: 2}}/>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <Skeleton variant="text" width={60} height={20} sx={{marginTop: 2, marginLeft: 1}}/>
                  <Skeleton variant="text" width={60} height={20} sx={{marginTop: 1, marginLeft: 1}}/>
                  <Skeleton variant="text" width={60} height={20} sx={{marginTop: 1, marginLeft: 1}}/>
                </Box>
              </Box>
          }
          
        </Container>
        ) : (
          <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem: 'center', marginTop: 1, marginBottom: 4}}>
            <MoodBadIcon sx={{ fontSize: '4em', textAlign: 'center', width: '100%'}}/>
            <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '0.8em'}}>No assets to display</Typography>
          </Container>
        )
        }
        
      </Container>
    </Container>
  );
}
