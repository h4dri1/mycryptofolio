import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            // position: 'top',
        },
        title: {
            display: true,
            text: 'cours BTC',
        },
    },
};

const dataDays = ['Jan 05', 'Jan 09', 'Jan 13', 'Jan 17', 'Jan 21', 'Jan 25', 'Jan 29'];

// mapper sur les jours 
// const dataDays = days.map((item) => (
//     item.day
// ));

// mapper sur les cours
// const dataPrices = prices.map((item) => (
//     item.price
// ));

const data = {
    labels: dataDays,
    datasets: [
        {
            label: 'Dataset 1',
            data: ['38096', '37112', '37166', '36998', '32204', '33320', '33851'],
            // data: dataPrices,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export default function Graph() {
    return <Line options={options} data={data} height={50} />;
}
