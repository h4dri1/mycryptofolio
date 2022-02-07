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

// const [displayLine, setDisplayLine] = useState(false);

export default function Graph({ chart }) {

    // data for animation
    const data = [];
    const data2 = [];
    let prev = 100;
    let prev2 = 80;
    for (let i = 0; i < 1000; i++) {
        prev += 5 - Math.random() * 10;
        data.push({ x: i, y: prev });
        prev2 += 5 - Math.random() * 10;
        data2.push({ x: i, y: prev2 });
    }

    // duration of the animation
    const totalDuration = 10000;
    const delayBetweenPoints = totalDuration / data.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;


    // title of graph
    const cryptoName = data.name;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',

                // Greg: vérifier si on garde le tooltip
                tooltip: {
                    usePointStyle: false,
                }
            },
            title: {
                display: true,
                text: cryptoName,
                color: '#B5179E'
            },
        },
        animation: {
            x: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: NaN, // the point is initially skipped
                delay(ctx) {
                    if (ctx.type !== 'data' || ctx.xStarted) {
                        return 0;
                    }
                    ctx.xStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            },
            y: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: previousY,
                delay(ctx) {
                    if (ctx.type !== 'data' || ctx.yStarted) {
                        return 0;
                    }
                    ctx.yStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            },
            interaction: {
                intersect: false,

            }
        }

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

    return <Line options={options} data={graphData} height={90} />;
}

Graph.propTypes = {
    data: PropTypes.object.isRequired,
    chart: PropTypes.object.isRequired,
};
