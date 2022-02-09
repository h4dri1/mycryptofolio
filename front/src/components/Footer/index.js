/* eslint-disable react/function-component-definition */
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Grid,
    Toolbar,
    Typography,
    Link,
} from '@mui/material';

const Footer = () => {
    return (


        <Grid sx={{ flexGrow: 1, height: '50px' }}>

            <Toolbar disableGutters
                sx={{ justifyContent: 'center', bgcolor: "#f6eaf7" }}
            >
                <Link component={RouterLink} to="/contact">
                    <Typography

                        variant="subtitle"
                        noWrap
                        color="black"
                        sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: 14, color: 'primary.light' }}
                    >
                        Contact
                    </Typography>
                </Link>

            </Toolbar>

        </Grid >

    )
};
export default Footer;
