import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Indicators from './Indicators';
import ToggleMode from './ToggleMode';
import RefCurrency from './RefCurrency';

const TopBanner = () => {

    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Indicators />
                <Container
                    disableGutters
                    maxWidth="100%"
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}

                >
                    <RefCurrency />
                    <ToggleMode />
                </Container>
            </Toolbar>
        </AppBar >
    );
};
export default TopBanner;

