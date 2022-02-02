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

// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
            // text: `${data.name}`, // graph title
        },
    },
};
// console.log(cryptoDetails.id);

// const dataDays = ['Jan 05', 'Jan 09', 'Jan 13', 'Jan 17', 'Jan 21', 'Jan 25', 'Jan 29'];

// mapper sur les jours 
const dataDays = chart.prices[0].map((item) => (
    item.prices
));

// mapper sur les cours
const dataPrices = chart.prices[1].map((item) => (
    item.prices
));

console.log(data.chart.prices);

const data = {
    labels: dataDays,
    datasets: [
        {
            label: 'Dataset 1',
            // data: ['38096', '37112', '37166', '36998', '32204', '33320', '33851'],
            data: dataPrices,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export default function Graph({ }) {
    const dispatch = useDispatch();

    const { data, chart } = useSelector((state) => state);
    // const { prices } = useSelector((state) => state.cryptoDetails.chart);

    console.log(data, cryptoDetails, chart);
    useEffect(() => {
        dispatch(getCryptoData());
    }, []);


    return <Line options={options} data={data} height={50} />;
}


// Graph.propTypes = {
//     crypto: PropTypes.arrayOf(PropTypes.shape({
//         // days: PropTypes.date.isRequired,
//         // prices: PropTypes.number.isRequired,
//         id: PropTypes.number.isRequired,
//     })).isRequired,
// };
