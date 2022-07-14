import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { change_password } from '../../../actions/user';

import { setDisplaySnackBar } from 'src/actions/settings';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import TagIcon from '@mui/icons-material/Tag';

import GaugeChart from 'react-gauge-chart'

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

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

export default function TopNFT() {

    const dispatch = useDispatch();

    const { darkMode } = useSelector((state) => state.settings);

    const { list: fearAndGreed } = useSelector((state) => state.cryptos.FearAndGreed);

    const { colorTheme } = useSelector((state) => state.settings);
    
    if (colorTheme === 'gradient') {
        var color = '#FF3CAC'
        var image = 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'
    } else {
        var color = colorTheme
    }

    const hideButton = useMediaQuery('(min-width:900px)');
    const hide1100 = useMediaQuery('(max-width:1100px)');
    const hide500 = useMediaQuery('(max-width:600px)');

    const value = Object.keys(fearAndGreed).map((item) => {
        if (item === 'data') {
            var fearValue = fearAndGreed[item][0].value;
            return fearValue;
        } 
    })

    const classification = Object.keys(fearAndGreed).map((item) => {
        if (item === 'data') {
            var fearClassification = fearAndGreed[item][0].value_classification;
            return fearClassification;
        }
    })

    return (
<Box
        sx={{
            width: hide500 ? '350px': 'auto',
            height: 'auto',
            boxShadow: 5,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            margin: '5px',
            marginTop: '20px',
            borderRadius: '10px',
            backgroundColor: image ? '#FF3CAC' : color,
            backgroundImage: image
        }}
        >
            <Container >
            <Container sx={{ display: 'flex', marginBottom: 1, marginTop: 1, justifyContent: 'center' }}>
                <DeviceThermostatIcon sx={{color: !darkMode ? 'secondary.dark' : '#07f3d5'}}/><Typography sx={{ fontWeight: 'bold', color: color === 'white' ? 'primary.main' : 'white' }}>Sentiment</Typography>
            </Container>
            <Divider sx={{ marginBottom: 2 }} />
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: "100px", minHeight: "100px" }}>
                <GaugeChart
                    id="gauge-chart5"
                    nrOfLevels={3}
                    arcsLength={[1, 1, 1]}
                    colors={['#e91e63', '#F5CD19', '#4caf50']}
                    percent={0.11}
                    arcPadding={0.02}
                    hideText={true}
                />
                <Typography sx={{ fontSize: '1.5em', color: color === 'white' ? 'primary.main' : 'white', fontWeight: 'bold', marginTop: 2 }}>{value}%</Typography>
                <Divider sx={{ marginTop: 1, marginBottom: 3, width:'100%' }} />
                <Typography sx={{ fontSize: '1.2em', color: '#ff9800', fontWeight: 'bold', marginBottom: 1 }}>{classification}</Typography>
            </Container>

            </Container>
        </Box>
    );
}