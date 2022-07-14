/* eslint-disable react/function-component-definition */
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import Indicators from './Indicators';
import ToggleMode from './ToggleMode';
import RefCurrency from './RefCurrency';
import Color from './Color';

import Box from '@mui/material/Box';

import { getCryptoList, updateCurrency } from 'src/actions/cryptos';

import { getIndicators } from 'src/actions/indicators';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

import Logo from 'src/components/Navbar/Logo';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import { BlockPicker } from 'react-color'

const TopBanner = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.indicators);
    const hide500 = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        dispatch(getIndicators());
    }, []);

    return (
        <AppBar position="static" sx={{ justifyContent: 'center', maxHeight: '38px', color: 'black', bgcolor: "#f6eaf7"}}>
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
                    <RefCurrency />
                    <Color /> 
                    <ToggleMode />
                </Container>
            </Toolbar>
        </AppBar>
    )
};
export default TopBanner;
