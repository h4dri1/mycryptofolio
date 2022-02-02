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

import React from 'react';
import PropTypes from 'prop-types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Graph({ data, chart }) {

    const cryptoName = data.name;
    console.log(cryptoName);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: cryptoName, // graph title
            },
        },
    };

    // const dataDays = ['Jan 05', 'Jan 09', 'Jan 13', 'Jan 17', 'Jan 21', 'Jan 25', 'Jan 29'];

    const dataDays = chart.prices[0];
    const dataPrices = chart.prices[1];

    console.log(dataDays);
    console.log(dataPrices);
    console.log(cryptoName);

    const graphData = {
        labels: dataDays,
        datasets: [
            {
                label: 'cours actuel',
                // data: ['38096', '37112', '37166', '36998', '32204', '33320', '33851'],
                data: dataPrices,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    // 'rgba(54, 162, 235, 0.2)',
                    // 'rgba(255, 206, 86, 0.2)',
                ],
            },
            {
                label: 'Market cap.',
                data: ['38096', '37112', '37166', '36998', '32204', '33320', '33851'],
                // data: dataPrices,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                ],
            },
        ],
    };

    return <Line options={options} data={graphData} height={50} />;
}
// console.log(graphData);

Graph.propTypes = {
    data: PropTypes.object.isRequired,
    chart: PropTypes.object.isRequired,
};
