/* eslint-disable react/function-component-definition */
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Grid,
    Link,
    Typography
} from '@mui/material';

import { useDispatch } from 'react-redux';

import { setDisplaySnackBar } from '../../actions/settings';
import CoffeeIcon from '@mui/icons-material/Coffee';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const Footer = () => {
    //Footer of website keep bottom of page
    const walletAddress = '0xEc496bA02a1efeD1B7966cac89210F2894CEE54b'
    const dispatch = useDispatch();

    return (
        <Box 
            sx={{
                bottom: 0,
                width: '100%',
                height: '50px',
                backgroundColor: 'secondary.dark',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                zIndex: 1000,
                marginTop: 2
            }}>
            <Box display={'flex'} ml={'25%'}>
                <AlternateEmailIcon color={'primary'}/>
                <Link 
                    component={RouterLink} 
                    to="/contact" 
                    color='primary'
                    underline="none"
                    ml={1}
                >
                    Contact
                </Link>
            </Box>
            <Box display={'flex'} mr={'25%'}>
                <CoffeeIcon color={'primary'}/>
                <Typography
                    ml={1}
                    display={{xs: 'none', sm: 'none', md: 'block'}}
                    color='primary'
                    sx={{cursor: 'pointer'}}
                    onClick={() => {navigator.clipboard.writeText(walletAddress), dispatch(setDisplaySnackBar({ severity: 'success', message: `Address copied you can buy me a cofee if you want ;)` }))}}
                >
                    {walletAddress}
                </Typography>
            </Box>
        </Box>
    )
};
export default Footer;
