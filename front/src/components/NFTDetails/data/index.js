import * as React from 'react';

import { useSelector } from 'react-redux';

import { 
    Divider, 
    Typography, 
    Box,
    Container
} from '@mui/material';

export default function Password() {

    const { list } = useSelector((state) => state.nftDetails.data);

    const description = list.description ? list.description : '';

    return (
<Box
        sx={{
            width: 'auto',
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
        <Container maxWidth={'sm'} sx={{ display: 'flex', justifyContent: 'center'}}>
            <Box sx={{width: '95%'}}>
                <Typography color="primary.dark" variant="h5" align="center">Info</Typography>
                <Divider sx={{ marginBottom: '10px' }} />
                <Typography sx={{ fontSize: '1.2em' ,textAlign: 'justify', marginTop: 4 }}>{description}</Typography>
            </Box>
        </Container>
        </Box>
    );
}