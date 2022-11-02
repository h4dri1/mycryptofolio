export default function chartOptions(chartData, hide500) {
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
        },
      },
    },
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

  return {
    options, data, labelsList, dataList,
  };
}
