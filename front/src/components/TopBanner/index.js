/* eslint-disable react/function-component-definition */
import { AppBar, Toolbar, Container, Button, useMediaQuery, Box, Link } from '@mui/material';

import ToggleMode from './ToggleMode';
import RefCurrency from './RefCurrency';
import Color from './Color';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getCurrentAccount } from '../../actions/metamask';

import Logo from 'src/components/Navbar/Logo';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Indicators from './Indicators';
import ConnectWallet from './ConnectWallet'
import MetaTags from 'react-meta-tags';

function TopBanner() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.indicators);
    const hide500 = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();

    const { darkMode } = useSelector((state) => state.settings);
    const wallet = useSelector((state) => state.wallet);
    const wallets = JSON.parse(localStorage.getItem('wallets'));

    return (
        <AppBar position="static" sx={{ justifyContent: 'center', maxHeight: '38px', color: 'black', bgcolor: !darkMode ? "#f6eaf7" : '#B197FF' }}>
            <MetaTags>
                <meta name="theme-color" content="primary.main"/>
                <meta name="msapplication-navbutton-color" content="primary.main"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="primary.main"/>
            </MetaTags>
            <Toolbar disableGutters>
                {hide500 && <Link component={RouterLink} to="/">
                    <Logo />
                </Link>}
                {!hide500 && <Indicators data={data} />}
                <Container
                    disableGutters
                    maxWidth="100%"
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    
                    <ConnectWallet wallet={wallet} wallets={wallets}/>
                    <RefCurrency />
                    <Color />
                    <ToggleMode />
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default TopBanner;
