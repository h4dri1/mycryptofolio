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

import { React, useState, useEffect } from 'react';
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

// const [displayLine, setDisplayLine] = useState(false);

export default function Graph({ data, chart }) {

    // useEffect(() => {
    //     setDisplayLine(dataPrices)
    // }, []);



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

    const dataDays = (chart.prices.map((element) => {
        const date = new Date(element[0])
        return `${date.getDate()}/${(date.getMonth() + 1)}`
    }));

    // 3 lines of the GRAPH from API
    const dataPrices = (chart.prices.map((element) => ((element[1]).toFixed(0))));
    const marketCapPrices = (chart.market_caps.map((element) => ((element[1]).toFixed(0))));
    const marketVolumes = (chart.total_volumes.map((element) => ((element[1]).toFixed(0))));

    // const defaultNotChecked = Chart.defaults.datasets.line.showLine = false;


    const graphData = {

        // days in x 
        labels: dataDays,
        datasets: [
            {
                label: 'Cours actuel',
                // prices in y
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

    return <Line options={options} data={graphData} height={70} />;
}

Graph.propTypes = {
    data: PropTypes.object.isRequired,
    chart: PropTypes.object.isRequired,
};
