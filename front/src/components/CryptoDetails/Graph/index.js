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
                text: cryptoName,
                color: '#B5179E'
            },
        },

        // scales: {

        //     xAxes: [
        //         {
        //             display: true,
        //             gridLines: {
        //                 display: false
        //             },

        //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //         }
        //     ],
        //     yAxes: [
        //         {
        //             type: 'linear',
        //             display: true,
        //             position: 'left',
        //             id: 'y-axis-1',
        //             gridLines: {
        //                 display: false
        //             },
        //             labels: {
        //                 show: true
        //             }
        //         },
        //         // {
        //         //     type: 'linear',
        //         //     display: true,
        //         //     position: 'right',
        //         //     id: 'y-axis-2',
        //         //     gridLines: {
        //         //         display: false
        //         //     },
        //         //     labels: {
        //         //         show: true
        //         //     }
        //         // }
        //     ]
        // }
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

    const dataDays = (chart.prices.map((element) => {
        const date = new Date(element[0])
        return `${date.getDate()}/${(date.getMonth() + 1)}`
    }));

    const dataPrices = (chart.prices.map((element) => ((element[1]).toFixed(0))));
    const marketCapPrices = (chart.market_caps.map((element) => ((element[1]).toFixed(0))));
    const marketVolumes = (chart.total_volumes.map((element) => ((element[1]).toFixed(0))));

    // console.log(dataDays);


    const graphData = {

        // jours en abcisses
        labels: dataDays,
        datasets: [
            {
                label: 'Cours actuel',
                // cours en ordonnés
                data: dataPrices,
                // data: [100, 51, 65, 40, 49, 60, 37, 40],
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
