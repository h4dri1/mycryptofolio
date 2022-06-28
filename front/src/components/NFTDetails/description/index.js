import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { change_password } from '../../../actions/user';

import { setDisplaySnackBar } from 'src/actions/settings';

import { 
    TextField, 
    Divider, 
    Typography, 
    Grid, 
    Button, 
    Box,
    Container
} from '@mui/material';

export default function Password() {

    const dispatch = useDispatch();

    const { list, loading } = useSelector((state) => state.nftDetails.data);

    const name = list.name ? list.name : '';
    const description = list.description ? list.description : '';

    return (
<Box
        sx={{
            minWidth: '400px',
            height: 'auto',
            boxShadow: 5,
            display: 'flex',
            flexDirection: 'column',
            marginTop: 2,
            margin: 2,
            borderRadius: '10px',
            backgroundColor: '#fdecf7'
        }}
        >
        <Container maxWidth={'sm'}>
            <Box sx={{width: '95%'}}>
                <Typography color="primary.dark" variant="h5" align="center">{name}</Typography>
                <Divider sx={{ marginBottom: '10px' }} />
                <Typography sx={{ fontSize: '1.2em' ,textAlign: 'justify', marginTop: 4 }}>{description}</Typography>
            </Box>
        </Container>
        </Box>
    );
}