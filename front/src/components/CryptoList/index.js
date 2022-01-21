import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';

import cryptos from './cryptos';

import { getCryptoList } from 'src/actions/cryptos';

const useStyles = makeStyles({
    table: {
        maxWidth: '80vw',
        margin: 'auto'
    }
});

const CryptoList = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    return (
        <>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center"><TableSortLabel />#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">24h %</TableCell>
                        <TableCell align="right">Market Cap</TableCell>
                        <TableCell align="right">Volume 24h</TableCell>
                        <TableCell align="right">Circulating supply</TableCell>
                        <TableCell align="center">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cryptos.map((crypto) => (
                        <TableRow key={crypto.id} hover>
                            <TableCell align="center">{crypto.market_cap_rank}</TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>                             
                                    <Avatar src={crypto.image} alt={crypto.name} sx={{ mr: 2 }} />                               
                                    <Link underline="hover" variant="body1" sx={{ mr: 1 }}>{crypto.name}</Link>
                                    <Typography>{crypto.symbol.toUpperCase()}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="right">{crypto.price_change_percentage_24h.toLocaleString()}%</TableCell>
                            <TableCell align="right">{'$' + crypto.market_cap.toLocaleString()}</TableCell>
                            <TableCell align="right">{'$' + crypto.total_volume.toLocaleString()}</TableCell>
                            <TableCell align="right">{'$' + crypto.circulating_supply.toLocaleString()}</TableCell>
                            <TableCell align="center">{'$' + crypto.current_price.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Button href="" variant="outlined" onClick={() => dispatch(getCryptoList())}>Charger plus de cryptos</Button>
        </>
    );
}


export default CryptoList;
