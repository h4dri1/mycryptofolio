import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import cryptos from './cryptos';

// useStyles to set a min width on Table class for mobile view

const CryptoList = () => (
    <>
        <p>Crypto List</p>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>24h %</TableCell>
                    <TableCell>Market Cap</TableCell>
                    <TableCell>Volume 24h</TableCell>
                    <TableCell>Circulating supply</TableCell>
                    <TableCell>Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cryptos.map((crypto) => (
                    <TableRow key={crypto.id}>
                        <TableCell>{crypto.market_cap_rank}</TableCell>
                        <TableCell>{crypto.name}</TableCell>
                        <TableCell>{crypto.price_change_percentage_24h}</TableCell>
                        <TableCell>{crypto.market_cap}</TableCell>
                        <TableCell>{crypto.total_volume}</TableCell>
                        <TableCell>{crypto.circulating_supply}</TableCell>
                        <TableCell>{crypto.current_price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
);

export default CryptoList;
