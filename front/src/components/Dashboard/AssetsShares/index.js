import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Divider from '@mui/material/Divider';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

ChartJS.register(ArcElement, Tooltip, Legend);

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsHist } from 'src/actions/portfolio';

const options = {
    plugins: {
        legend: false,
    },
};

const data = {
    labels: ['Asset 1', 'Asset 2'],
    datasets: [
        {
            // label: '% of assets',
            data: [12, 19],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
}

export default function AssetsShares() {
    const dispatch = useDispatch();

    const { transactionsList } = useSelector((state) => state.portfolio);

    useEffect(() => {
        dispatch(getTransactionsHist());
    }, []);

    const SumCrypto = {

    }

    return (
        <>
            <Container disableGutters sx={{ border: 1, borderColor: 'grey' }}>
                <ListItem>
                    <ListItemText primary="Répartition de vos actifs" sx={{ textAlign: "center" }} />
                </ListItem>
                <Divider sx={{ width: "100%" }}></Divider>

                <Container
                    sx={{ width: '40%', height: '40%', mt: 1 }}>
                    <Pie data={data} options={options} />
                </Container>
                <Container sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '30vh', overflowY: 'auto',
                }}>
                    <Table stickyHeader sx={{ maxWidth: '100%' }}>
                        <TableHead align="left">
                            <TableRow align='left'>
                                <TableCell>Devise</TableCell>
                                <TableCell>Quantité</TableCell>
                                <TableCell>Total $</TableCell>
                                <TableCell>répartition</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody align="left">
                            {transactionsList.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.crypto_id}</TableCell>
                                    <TableCell>{transaction.quantity}</TableCell>
                                    <TableCell>{transaction.price}</TableCell>
                                    <TableCell>{transaction.rentability}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>
            </Container>
        </>
    )
}

