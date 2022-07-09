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
  // data for animation
  const data = [];
  const data2 = [];
  let prev = 100;
  let prev2 = 80;
  for (let i = 0; i < 1000; i++) {
    prev += 5 - Math.random() * 10;
    data.push({ x: i, y: prev });
    prev2 += 5 - Math.random() * 10;
    data2.push({ x: i, y: prev2 });
  }

  // duration of the animation
  const totalDuration = 3000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) => (ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y);

  // title of graph


  const options = {
    responsive: true,
    aspectRatio: window.innerWidth < 600 ? 1 : 3,
    scales: {
      x: {
        ticks:{
          maxTicksLimit: 12,
          maxRotation: 360,
          minRotation: 360,
          labelOffset: 40
        },
        grid: {
          display: false,
        }
      },
      y: {
        ticks: {
          beginAtZero: true,
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
      x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
          if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
          return ctx.index * delayBetweenPoints;
        },
      },
      y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
          if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
          }
          ctx.yStarted = true;
          return ctx.index * delayBetweenPoints;
        },
      },
      interaction: {
        intersect: false,
      },
    },
  };

  const dataDays = (chart.prices.map((element) => {
    const date = new Date(element[0]);
    //return `${date.getDate()}/${(date.getMonth() + 1)}`;
    return `${date.getHours()}:${date.getMinutes()}`;
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

  return <Line options={options} data={graphData}/>;
}

Graph.propTypes = {
  data: PropTypes.object.isRequired,
  chart: PropTypes.object.isRequired,
};
