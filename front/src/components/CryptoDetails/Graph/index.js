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
import { red } from '@mui/material/colors';

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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: cryptoName,
                color: '#B5179E'
            },
        },
    };

    // TODO: faire une conversion de format des dates reçues par chart.prices avant le MAP
    // const dataDays = chart.prices.map((element) => {
    //     return `${element}`
    // });
    // const dataPrices = chart.prices.map((element) => {
    //     return `${element}`
    // });

    // const marketCapPrices = chart.market_caps.map((element) => {
    //     return `${element}`
    // });

    // const marketVolumes = chart.total_volumes.map((element) => {
    //     return `${element}`
    // });

    // const dataDays = chart.prices[0][0].map((element) => {
    //     return `${element}`
    // });

    // const dataPrices = chart.prices[0][1].map((element) => {
    //     return `${element}`
    // });

    // const dataDays = chart.prices[0][0];
    // const dataPrices = chart.prices[0][1];
    // console.log(dataDays);
    // console.log(dataPrices);

    // console.log(dataDays);

    const graphData = {
        // labels: dataDays,
        datasets: [
            {
                label: 'Cours actuel',
                // data: dataPrices,
                borderColor: ['rgb(244, 67, 54)'],
                backgroundColor: ['rgb(244, 67, 54)'],
            },
            {
                label: 'Market cap.',
                // data: marketCapPrices,
                borderColor: ['rgb(170, 144, 215)'],
                backgroundColor: ['rgb(170, 144, 215)'],
            },
            {
                label: 'Market vol.',
                // data: marketVolumes,
                borderColor: ['rgb(67, 97, 238)'],
                backgroundColor: ['rgb(67, 97, 238)'],
            },
        ],
    };

    return <Line options={options} data={graphData} height={70} />;
}

Graph.propTypes = {
    data: PropTypes.object.isRequired,
    chart: PropTypes.object.isRequired,
};
