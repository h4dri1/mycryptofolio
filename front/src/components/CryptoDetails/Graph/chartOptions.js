export default function chartOptions() {
  const options = {
    responsive: true,
    aspectRatio: window.innerWidth < 600 ? 1 : 3,
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 12,
          maxRotation: 360,
          minRotation: 360,
          labelOffset: 40,
          color: '#E8F9FD',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          color: '#E8F9FD',
        },
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
    animation: {
      duration: 3000,
    },
  };

  const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)',
    test: '#6EDCD9',
  };

  return { options, chartColors };
}
