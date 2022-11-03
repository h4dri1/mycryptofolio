import {
  Typography, Container, Skeleton, Box, useMediaQuery,
} from '@mui/material';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PieChartIcon from '@mui/icons-material/PieChart';
import chartOptions from './chartOptions';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Allocation({ chartData }) {
  const hide500 = useMediaQuery('(max-width:500px)');

  return (
    <Container disableGutters sx={{ borderRadius: '10px', height: 'auto' }}>
      <Container sx={{ display: 'flex', marginTop: 1, justifyContent: 'center' }}>
        <PieChartIcon sx={{ color: 'secondary.dark' }} /><Typography sx={{ fontWeight: 'bold', color: 'primaryTextColor.main' }}>Token allocation</Typography>
      </Container>
      <Container sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', maxHeight: '60vh', overflowY: 'auto', justifyContent: 'center',
      }}
      >
        {chartOptions(chartData, hide500).data.labels !== 'empty' ? (
          <Container
            sx={{ width: '55%', height: '55%', margin: { xs: 1, md: 0 } }}
          >
            {chartOptions(chartData, hide500).data.datasets.length > 0 ? (
              <Doughnut
                data={chartOptions(chartData, hide500).data}
                options={chartOptions(chartData, hide500).options}
              />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Skeleton variant="circular" width={150} height={150} sx={{ marginTop: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant="text" width={60} height={20} sx={{ marginTop: 2, marginLeft: 1 }} />
                  <Skeleton variant="text" width={60} height={20} sx={{ marginTop: 1, marginLeft: 1 }} />
                  <Skeleton variant="text" width={60} height={20} sx={{ marginTop: 1, marginLeft: 1 }} />
                </Box>
              </Box>
            )}

          </Container>
        ) : (
          <Container sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem: 'center', marginTop: 1, marginBottom: 4,
          }}
          >
            <MoodBadIcon sx={{ fontSize: '4em', textAlign: 'center', width: '100%' }} />
            <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '0.8em' }}>No assets to display</Typography>
          </Container>
        )}

      </Container>
    </Container>
  );
}
