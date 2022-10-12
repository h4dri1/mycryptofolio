import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

import { useSelector } from 'react-redux';

import { Line } from 'react-chartjs-2';

ChartJS.register(Filler);

import PropTypes from 'prop-types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// const [displayLine, setDisplayLine] = useState(false);

export default function Graph({ chart }) {
  const options = {
    responsive: true,
    aspectRatio: window.innerWidth < 600 ? 1 : 3,
    scales: {
      x: {
        ticks:{
          maxTicksLimit: 12,
          maxRotation: 360,
          minRotation: 360,
          labelOffset: 40,
          color: '#E8F9FD',
        },
        grid: {
          display: false,
        }
      },
      y: {
        ticks: {
          beginAtZero: true,
          color: '#E8F9FD',
        },
        grid: {
          display: true
        }
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top',
      }
    },
    animation: {
      duration: 3000
    } 
  };

  const { days } = useSelector((state) => state.cryptoDetails);

  const addZero = (i) => {
    if (i < 10) {i = "0" + i}
    return i;
  }

  const dataDays = (chart.prices.map((element) => {
    const date = new Date(element[0]);
    if (days > 1) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } else if (days === 1){
      return `${addZero(date.getUTCHours('en-US'))}:${addZero(date.getUTCMinutes('en-US'))}`;
    } else if (days === 'max') {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    }
  }));

  // 3 lines of the GRAPH from API

  const dataPrices = chart.prices;
  // const marketCapPrices = (chart.market_caps.map((element) => ((element[1]).toFixed(0))));
  // const marketVolumes = (chart.total_volumes.map((element) => ((element[1]).toFixed(0))));

  // const defaultNotChecked = Chart.defaults.datasets.line.showLine = false;

  var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)',
    test: '#6EDCD9'
  };

  const graphData = {
    type: 'line',
    // days in x
    labels: dataDays,
    datasets: [
      {
        // prices in y
        data: dataPrices,
        pointRadius: 0,
        borderColor: chartColors.green,
        backgroundColor: chartColors.test,
        fill: true
      },
      // {
      //     label: 'Market cap.',
      //     data: marketCapPrices,
      //     borderColor: ['rgb(170, 144, 215)'],
      //     backgroundColor: ['rgb(170, 144, 215)'],
      // },
      // {
      //     label: 'Market vol.',
      //     data: marketVolumes,
      //     borderColor: ['rgb(67, 97, 238)'],
      //     backgroundColor: ['rgb(67, 97, 238)'],
      // },

    ],
  };

  return (
    <Line options={options} data={graphData}/>
  );
}

Graph.propTypes = {
  data: PropTypes.object.isRequired,
  chart: PropTypes.object.isRequired,
};
