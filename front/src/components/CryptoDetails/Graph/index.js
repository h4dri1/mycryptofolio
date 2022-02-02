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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                // text: `${data.id}`, // graph title
            },
        },
    };

    // console.log(data.id);
    // const dataDays = ['Jan 05', 'Jan 09', 'Jan 13', 'Jan 17', 'Jan 21', 'Jan 25', 'Jan 29'];

    // mapper sur les jours 
    // const dataDays = cryptoDetails.chart.prices[0].map((item) => (
    //     item.prices
    // ));

    // mapper sur les cours
    // const dataPrices = chart.prices[1].map((item) => (
    //     item.prices
    // ));

    const graphData = {
        // labels: dataDays,
        datasets: [
            {
                label: 'Dataset 1',
                // data: ['38096', '37112', '37166', '36998', '32204', '33320', '33851'],
                // data: dataPrices,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Line options={options} graphData={graphData} height={50} />;
}

Graph.propTypes = {
    chart: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
};
