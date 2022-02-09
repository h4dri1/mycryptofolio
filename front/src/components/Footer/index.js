/* eslint-disable react/function-component-definition */
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Grid,
    Toolbar,
    Typography,
    Link,
    Container
} from '@mui/material';

const Footer = () => {
    return (


        <Grid display="flex">

            <Box disableGutters
                sx={{ justifyContent: 'center', bgcolor: "#f6eaf7", alignItems: "center", display: "flex", width: '100%', height: '50px' }}
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
