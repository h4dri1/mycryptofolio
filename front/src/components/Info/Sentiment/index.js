import PropTypes from 'prop-types';
import GaugeChart from 'react-gauge-chart';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import {
  Divider,
  Typography,
  Container,
  Skeleton,
} from '@mui/material';

function Loading() {
  return (
    <Container sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '200px', maxHeight: '200x',
    }}
    >
      <Skeleton sx={{ borderRadius: '10px' }} variant="rectangle" width="200px" height="100px" />
      <Skeleton sx={{ borderRadius: '10px' }} variant="text" width="50px" height="50px" />
      <Divider sx={{ marginTop: 1, marginBottom: 3, width: '100%' }} />
      <Skeleton sx={{ borderRadius: '10px' }} variant="text" width="50px" height="50px" />
    </Container>
  );
}

function GaugeChartComponent(props) {
  const { value, classification } = props;

  return (
    <Container sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '200px', maxHeight: '200x',
    }}
    >
      <GaugeChart
        id="gauge-chart5"
        nrOfLevels={10}
        arcsLength={[1, 1, 1]}
        colors={['#e91e63', '#F5CD19', '#4caf50']}
        percent={value}
        arcPadding={0.02}
        hideText
        animate={false}
      />
      <Typography
        sx={{
          fontSize: '1.5em',
          fontWeight: 'bold',
          marginTop: 2,
        }}
      >
        {Math.round(value * 100)}%
      </Typography>
      <Divider sx={{ marginTop: 1, marginBottom: 3, width: '100%' }} />
      <Typography
        sx={{
          fontSize: '1.2em',
          color: '#ff9800',
          fontWeight: 'bold',
          marginBottom: 1,
        }}
      >
        {classification}
      </Typography>
    </Container>
  );
}

GaugeChartComponent.propTypes = {
  value: PropTypes.number.isRequired,
  classification: PropTypes.string.isRequired,
};

export default function Sentiment({ fearAndGreed }) {
  const value = fearAndGreed.data !== undefined ? (fearAndGreed.data[0].value) / 100 : 0;
  const classification = fearAndGreed.data !== undefined
    ? (fearAndGreed.data[0].value_classification) : 0;
    
  return (
    <Container disableGutters sx={{ borderRadius: '10px', height: 'auto', marginBottom: 2 }}>
      <Container sx={{
        display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center',
      }}
      >
        <DeviceThermostatIcon sx={{ color: 'secondary.dark' }} />
        <Typography sx={{ fontWeight: 'bold', color: 'primaryTextColor.main' }}>Sentiment</Typography>
      </Container>
      <Container sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflowY: 'auto',
        justifyContent: 'center',
      }}
      >
        <Divider sx={{ marginBottom: 2 }} />
        {fearAndGreed.data?.length > 0
          ? <GaugeChartComponent value={value} classification={classification} />
          : <Loading />}
      </Container>
    </Container>
  );
}

Sentiment.propTypes = {
  fearAndGreed: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
