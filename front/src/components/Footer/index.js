/* eslint-disable react/function-component-definition */
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Grid,
    Link,
} from '@mui/material';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Footer = () => {
    return (
        <Grid container >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f6eaf7', width: "100vw", height: "50px" }} >
            <Link component={RouterLink} to="/contact" color='primary.light' sx={{marginLeft: '33%'}}>
                Contact
            </Link>
            <Link component={RouterLink} to="/contact" color='primary.light' sx={{marginRight: '33%'}}>
                ETH: 0xDDA2391e6Aab2E8FFcE903196b7899D7795130A1
            </Link>
            </Box>
        </Grid>
    )
};
export default Footer;
