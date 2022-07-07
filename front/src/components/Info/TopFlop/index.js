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
    Avatar,
    useMediaQuery
} from '@mui/material';



export default function TopFlop() {

    const dispatch = useDispatch();

    const { list: cryptos } = useSelector((state) => state.cryptos.cryptoTrend);

    const { darkMode } = useSelector((state) => state.settings);

    const { colorTheme } = useSelector((state) => state.settings);

    const newCryptos = []

    for (const crypto in cryptos.coins) {
        newCryptos.push(cryptos.coins[crypto].item);
    }

    if (colorTheme === 'white') {
        var color = 'white';
    } else if (colorTheme === 'secondary') {
        var color = 'secondary.main'
    } else if (colorTheme === 'gradient') {
        var color = '#FF3CAC'
        var image = 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'
    }

    const hideButton = useMediaQuery('(min-width:900px)');
    const hide1100 = useMediaQuery('(max-width:1100px)');
    const hide500 = useMediaQuery('(max-width:600px)');
    
    return (
        <Box
        sx={{
            width: 'auto',
            height: 'auto',
            boxShadow: 5,
            display: 'flex',
            flexDirection: 'column',
            margin: '5px',
            flexWrap: 'wrap',
            marginTop: '20px',
            borderRadius: '10px',
            backgroundColor: image ? '#FF3CAC' : color,
            backgroundImage: image
        }}
        >
            <Container sx={{ marginBottom: 3 }}>
            <Container sx={{ display: 'flex', marginBottom: 1, marginTop: 1, justifyContent: 'center'}}>
                <WhatshotIcon sx={{color: 'secondary.dark'}}/><Typography sx={{ fontWeight: 'bold', color: color === 'white' ? 'primary.main' : 'white' }}>Trending</Typography>
            </Container>
            <TableContainer component={Paper} sx={{backgroundColor: !darkMode ? '#fdecf7' : '', borderRadius: '10px', width: hide500 ? '320px' : '472px'}}>
                <Table size='small' aria-label="a dense table">
                    <TableHead sx={{backgroundColor: '#e1a2d8'}}>
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
                        hover
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