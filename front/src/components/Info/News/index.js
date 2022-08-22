import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import GaugeChart from 'react-gauge-chart'

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

import { 
    Divider, 
    Typography, 
    Box,
    Container,
    useMediaQuery,
    Skeleton
} from '@mui/material';

export default function TopNFT() {
    const { darkMode } = useSelector((state) => state.settings);

    const { list: fearAndGreed } = useSelector((state) => state.cryptos.FearAndGreed);

    const { colorTheme } = useSelector((state) => state.settings);

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

    const hide500 = useMediaQuery('(max-width:600px)');
    
    const value = fearAndGreed.data !== undefined ? (fearAndGreed.data[0].value) / 100 : 0;

    const classification = fearAndGreed.data !== undefined ? (fearAndGreed.data[0].value_classification) : 0

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
                { fearAndGreed.name !== undefined ? (
                    <GaugeChart
                        id="gauge-chart5"
                        nrOfLevels={10}
                        arcsLength={[1, 1, 1]}
                        colors={['#e91e63', '#F5CD19', '#4caf50']}
                        percent={value}
                        arcPadding={0.02}
                        hideText={true}
                    />
                    ) : (
                        <Skeleton sx={{borderRadius: '10px'}} variant="rectangle" width={'200px'} height={'100px'} />
                    )
                }
                { fearAndGreed.name !== undefined ? <Typography sx={{ fontSize: '1.5em', color: color === 'white' ? 'primary.main' : 'white', fontWeight: 'bold', marginTop: 2 }}>{Math.round(value * 100)}%</Typography> : <Skeleton sx={{borderRadius: '10px'}} variant="text" width={'50px'} height={'50px'} />}
                <Divider sx={{ marginTop: 1, marginBottom: 3, width:'100%' }} />
                {fearAndGreed.name !== undefined ? <Typography sx={{ fontSize: '1.2em', color: '#ff9800', fontWeight: 'bold', marginBottom: 1 }}>{classification}</Typography> : <Skeleton sx={{borderRadius: '10px'}} variant="text" width={'50px'} height={'50px'} />}
            </Container>

            </Container>
        </Box>
    );
}