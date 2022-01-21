import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Indicators from './Indicators';
import ToggleMode from './ToggleMode';
import RefCurrency from './RefCurrency';

const TopBanner = () => {

    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Indicators />
                <RefCurrency />
                <ToggleMode />
            </Toolbar>
        </AppBar >
    );
};
export default TopBanner;

