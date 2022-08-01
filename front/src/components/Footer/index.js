/* eslint-disable react/function-component-definition */
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Grid,
    Link,
    Typography
} from '@mui/material';

import { useSelector } from 'react-redux';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Footer = () => {

    const { darkMode } = useSelector((state) => state.settings);

    return (
<Grid sx={{}}>

<Box disableGutters
    sx={{ justifyContent: 'center', bgcolor: !darkMode ? "#f6eaf7" : '#B197FF', alignItems: "center", display: "flex", width: '100%', height: '50px' }}
>
    <Typography
        variant="subtitle"
        noWrap
        color="black"
        sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: 14, color: 'primary.light' }}
    >
        <Link component={RouterLink} to="/contact"
            color='primary.light'
        >
            Contact
        </Link>
    </Typography>
    <Box>
        <Typography
            variant="subtitle"
            // noWrap
            color="black"
            sx={{ fontSize: 14, color: 'primary.light', ml: 15 }}
        >
            ETH address :
        </Typography>
        <Typography
            variant="subtitle"
            // noWrap
            color="black"
            sx={{ fontSize: 14, color: 'primary.light', ml: 2 }}
        >0xDDA2391e6Aab2E8FFcE903196b7899D7795130A1
        </Typography>
    </Box>
</Box>

</Grid >
    )
};
export default Footer;
