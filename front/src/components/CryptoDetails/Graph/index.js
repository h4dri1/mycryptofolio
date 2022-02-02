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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: cryptoName
            },
        },
    };

    // TODO: faire une conversion de format des dates reçues par chart.prices avant le MAP
    const dataDays = chart.prices.map((element) => {
        return `${element}`
    });
    const dataPrices = chart.prices.map((element) => {
        return `${element}`
    });

    const marketCapPrices = chart.market_caps.map((element) => {
        return `${element}`
    });

    const marketVolumes = chart.total_volumes.map((element) => {
        return `${element}`
    });

    // console.log(dataDays, dataPrices, marketCapPrices, marketVolumes);

    const graphData = {
        labels: dataDays,
        datasets: [
            {
                label: 'cours actuel',
                data: dataPrices,
                borderColor: ['rgb(244, 67, 54)'],
                backgroundColor: ['rgb(244, 67, 54)'],
            },
            {
                label: 'Market cap.',
                data: marketCapPrices,
                borderColor: ['rgb(170, 144, 215)'],
                backgroundColor: ['rgb(170, 144, 215)'],
            },
            {
                label: 'Market vol.',
                data: marketVolumes,
                borderColor: ['rgb(67, 97, 238)'],
                backgroundColor: ['rgb(67, 97, 238)'],
            },
        ],
    };

    return <Line options={options} data={graphData} height={50} />;
}

Graph.propTypes = {
    data: PropTypes.object.isRequired,
    chart: PropTypes.object.isRequired,
};
