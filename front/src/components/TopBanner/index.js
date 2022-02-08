/* eslint-disable react/function-component-definition */
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Indicators from './Indicators';
import ToggleMode from './ToggleMode';
import RefCurrency from './RefCurrency';

const TopBanner = () => (
    <AppBar sx={{ justifyContent: 'center', height: '38px', color: 'black', bgcolor: "#f6eaf7" }}>
        <Toolbar position="sticky" disableGutters>
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
