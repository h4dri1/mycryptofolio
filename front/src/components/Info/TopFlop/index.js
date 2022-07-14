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

    if (colorTheme === 'gradient') {
        var color = '#FF3CAC'
        var image = 'linear-gradient(180deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'
    } else if (colorTheme === 'original') {
        if (!darkMode) {
            var color = 'rgb(58,12,163)'
            var image = 'linear-gradient(180deg, rgba(58,12,163,1) 0%, rgba(96,50,201,1) 100%)'
        } else {
            var color = 'rgba(2,50,107)'
            var image = 'linear-gradient(180deg, rgba(0,47,84,1) 0%, rgba(2,50,107,1) 100%)'
        }
    } else {
        var color = colorTheme
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
            marginTop: {xs: '5px', md: '20px'},
            borderRadius: '10px',
            backgroundColor: image ? '#FF3CAC' : color,
            backgroundImage: image
        }}
        >
            <Container sx={{ marginBottom: 3 }}>
            <Container sx={{ display: 'flex', marginBottom: 1, marginTop: 1, justifyContent: 'center'}}>
                <WhatshotIcon sx={{color: !darkMode ? 'secondary.dark' : '#07f3d5'}}/><Typography sx={{ fontWeight: 'bold', color: color === 'white' ? 'primary.main' : 'white' }}>Trending</Typography>
            </Container>
            <TableContainer component={Paper} sx={{backgroundColor: !darkMode ? '#EAE3FF' : '#002F54', borderRadius: '10px', width: hide500 ? '320px' : '472px'}}>
                <Table size='small' aria-label="a dense table">
                    <TableHead sx={{backgroundColor: '#B197FF'}}>
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
                            <Typography sx={{color: !darkMode ? "neutral.contrastText" : '#07f3d5'}}>{crypto.symbol.toUpperCase()}</Typography>
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