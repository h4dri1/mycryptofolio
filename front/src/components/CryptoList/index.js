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
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';

import { useMediaQuery } from '@mui/material';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCryptoList, getMoreCryptos } from 'src/actions/cryptos';

const CryptoList = () => {
    const mediumScreen = useMediaQuery('(min-width:900px)');

    const dispatch = useDispatch();

    const { list: cryptos, cryptoListLoading } = useSelector((state) => state.cryptos.cryptoList);

    useEffect(() => {
        dispatch(getCryptoList());
    }, []);

    return (
        <Grid container justifyContent="center" spacing={{ xs: 2, sm: 4 }}>
            <Grid item xs={12}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><TableSortLabel />#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">24h %</TableCell>
                            <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Market Cap</TableCell>
                            <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>Volume 24h</TableCell>
                            <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>Circulating supply</TableCell>
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
                                        <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>{crypto.symbol.toUpperCase()}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{crypto.price_change_percentage_24h.toLocaleString()}%</TableCell>
                                <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{'$' + crypto.market_cap.toLocaleString()}</TableCell>
                                <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{'$' + crypto.total_volume.toLocaleString()}</TableCell>
                                <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{'$' + crypto.circulating_supply.toLocaleString()}</TableCell>
                                <TableCell align="center">{'$' + crypto.current_price.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <Grid item>
                <LoadingButton
                    variant="outlined"
                    loading={cryptoListLoading}
                    onClick={() => dispatch(getMoreCryptos())}
                >
                    Charger plus de cryptos
                </LoadingButton>
            </Grid>
        </Grid>
    );
}

export default CryptoList;
