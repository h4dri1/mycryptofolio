import * as React from 'react';
import { Avatar, Container, Box, Button, Link, Fab } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeColor } from 'src/actions/settings'
import { updateNFTTrend } from 'src/actions/cryptos'

export default function chooseColor() {
    const dispatch = useDispatch();

    const handleClick1 = () => {
        dispatch(changeColor('secondary'))
    }
        
    const handleClick2 = () => {
        dispatch(changeColor('white'))
    }

    const handleClick3 = () => {
        dispatch(changeColor('gradient'))
    }

    return (
        <Box sx={{display: 'flex'}}>
            <Box onClick={handleClick1} sx={{ backgroundColor: 'secondary.main', borderRadius: '50%', border: 1, width: "20px", height: "20px" }} />
            <Box onClick={handleClick2} sx={{ backgroundColor: 'white', borderRadius: '50%', border: 1, width: "20px", height: "20px", marginLeft: 1, marginRight: 1 }} />
            <Box onClick={handleClick3} sx={{ marginRight: 1, backgroundColor: '#FF3CAC', backgroundImage: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)', borderRadius: '50%', border: 1, width: "20px", height: "20px" }} />
        </Box>
    );
} 