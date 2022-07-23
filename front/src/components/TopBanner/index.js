/* eslint-disable react/function-component-definition */
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import Indicators from './Indicators';
import ToggleMode from './ToggleMode';
import RefCurrency from './RefCurrency';
import Color from './Color';
import Button from '@mui/material/Button';

import { useState } from 'react';

import Box from '@mui/material/Box';

import { getCryptoList, updateCurrency } from 'src/actions/cryptos';

import { getIndicators } from 'src/actions/indicators';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Typography, useMediaQuery } from '@mui/material';

import Logo from 'src/components/Navbar/Logo';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import { BlockPicker } from 'react-color'

import { ethers } from 'ethers';
import { getWalletAddress, getWalletBalance } from '../../actions/connectWallet';

const TopBanner = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.indicators);
    const hide500 = useMediaQuery('(max-width:600px)');

    const { darkMode } = useSelector((state) => state.settings);
    const { walletAddress, walletBalance } = useSelector((state) => state.connectWallet);

    const onClick = () => {
        dispatch(getWalletAddress());;
    }

    return (
        <AppBar position="static" sx={{ justifyContent: 'center', maxHeight: '38px', color: 'black', bgcolor: !darkMode ? "#f6eaf7" : '#B197FF'}}>
            <Toolbar  disableGutters>
                {hide500 && <Link component={RouterLink} to="/">
                    <Logo />
                </Link>}
                <Indicators data={data} />
                <Container
                    disableGutters
                    maxWidth="100%"
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Button onClick={onClick} variant="outlined" sx={{fontSize: '0.7em', margin: '5px', width: '140px'}}>{walletAddress === 'Wallet' ? walletAddress :`${walletAddress.substring(0, 11)}...`}</Button>
                    <RefCurrency />
                    <Color /> 
                    <ToggleMode />
                </Container>
            </Toolbar>
        </AppBar>
    )
};

export default TopBanner;
