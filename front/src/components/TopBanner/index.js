/* eslint-disable react/function-component-definition */
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Indicators from './Indicators';
import ToggleMode from './ToggleMode';
import RefCurrency from './RefCurrency';

const TopBanner = () => (
    <AppBar position="static" color="transparent" sx={{ justifyContent: 'center', height: '38px' }}>
        <Toolbar disableGutters>
            <Indicators />
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
                <ToggleMode />
            </Container>
        </Toolbar>
    </AppBar>
);
export default TopBanner;
