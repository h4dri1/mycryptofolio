import * as React from 'react';

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { change_password } from '../../../actions/user';

import { setDisplaySnackBar } from 'src/actions/settings';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import WhatshotIcon from '@mui/icons-material/Whatshot';

import { getCryptoTrend } from '../../../actions/cryptos';

import { Link as RouterLink } from 'react-router-dom';

import { 
    TextField, 
    Divider, 
    Typography, 
    Grid, 
    Button, 
    Box,
    Container,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
    TableCell,
    TableBody,
    Avatar
} from '@mui/material';



export default function TopFlop() {

    const dispatch = useDispatch();

    const { list: cryptos } = useSelector((state) => state.cryptos.cryptoTrend);

    const newCryptos = []

    for (const crypto in cryptos.coins) {
        newCryptos.push(cryptos.coins[crypto].item);
    }
    
    return (
        <Box
        sx={{
            minWidth: '27vw',
            height: 'auto',
            boxShadow: 5,
            display: 'flex',
            flexDirection: 'column',
            margin: '5px',
            flexWrap: 'wrap',
            marginTop: '20px',
            borderRadius: '10px'
        }}
        >
            <Container sx={{ marginBottom: 3 }}>
            <Container sx={{ display: 'flex', marginBottom: 1, marginTop: 1, width: 'auto', justifyContent: 'center' }}>
                <WhatshotIcon color="primary"/><Typography sx={{ fontWeight: 'bold' }}>Trending</Typography>
            </Container>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 10 }} size='small' aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell ></TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Rang</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {newCryptos.map((crypto) => (
                        <TableRow 
                        key={crypto.id}
                        >
                        <TableCell sx={{borderBottom: 0 }}>
                        <Box component={RouterLink} to={`/crypto/${crypto.id}`} sx={{ color: "primary.light", display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' } }}>
                            <Avatar src={crypto.small} alt={crypto.name} sx={{ mr: 2, width: 20, height: 20, marginLeft: 1 }} />
                            <Typography>{crypto.symbol.toUpperCase()}</Typography>
                        </Box>
                        </TableCell>
                        <TableCell sx={{borderBottom: 0 }}>{crypto.id}</TableCell>
                        <TableCell sx={{borderBottom: 0 }}>{crypto.market_cap_rank}</TableCell>
                        </TableRow >
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Container>
        </Box>
    );
}