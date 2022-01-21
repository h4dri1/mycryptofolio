import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Indicators from './Indicators';
import ToggleMode from './ToggleMode';

const TopBanner = () => {

    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Indicators />
                <ToggleMode />
            </Toolbar>
        </AppBar >
    );
};
export default TopBanner;

