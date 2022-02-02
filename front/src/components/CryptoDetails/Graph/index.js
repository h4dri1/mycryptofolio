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
                borderColor: [
                    'rgb(244, 67, 54)',
                ],
                backgroundColor: [
                    'rgb(244, 67, 54)',
                ],
            },
            {
                label: 'Market cap.',
                data: ['38096', '37112', '37166', '36998', '32204', '33320', '33851'],
                // data: dataPrices,
                borderColor: [
                    'rgb(170, 144, 215)'
                ],
                backgroundColor: [
                    'rgb(170, 144, 215)'
                ],
            },
            {
                label: 'Market vol.',
                data: ['38096', '37112', '37166', '36998', '32204', '33320', '33851'],
                // data: dataPrices,
                borderColor: [
                    'rgb(67, 97, 238)'
                ],
                backgroundColor: [
                    'rgb(67, 97, 238)'
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
