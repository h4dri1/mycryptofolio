import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import chartOptions from './chartOptions';

ChartJS.register(Filler);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const addZero = (i) => {
  if (i < 10) {
    // eslint-disable-next-line no-param-reassign
    i = `0${i}`;
  }
  return i;
};

const dataDays = (chart, days) => (chart.prices.map((element) => {
  const date = new Date(element[0]);
  if (days > 1) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
  if (days === 1) {
    return `${addZero(date.getUTCHours('en-US'))}:${addZero(date.getUTCMinutes('en-US'))}`;
  }
  if (days === 'max') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }
  return null;
}));

export default function Graph({ chart }) {
  const { days } = useSelector((state) => state.cryptoDetails);
  const graphData = {
    type: 'line',
    // days in x
    labels: dataDays(chart, days),
    datasets: [
      {
        // prices in y
        data: chart.prices,
        pointRadius: 0,
        borderColor: chartOptions().chartColors.green,
        backgroundColor: chartOptions().chartColors.test,
        fill: true,
      },
    ],
  };

  return (
    <Line options={chartOptions().options} data={graphData} />
  );
}

Graph.propTypes = {
  chart: PropTypes.object.isRequired,
};
