import * as React from 'react';

import { 
    TextField, 
    Divider, 
    Typography, 
    Grid, 
    Button, 
    Box
} from '@mui/material';

export default function Password() {

    return (
        <Box
        sx={{
            width: 'auto',
            height: 'auto',
            boxShadow: 5,
            display: 'flex',
            flexDirection: 'column',
            margin: '10px'
        }}
        > 
            <Typography sx={{marginTop:"5px"}} color="primary.dark" variant="h5" align="center">Password</Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <TextField sx={{ margin: '10px' }} id="outlined-basic" label="Password" defaultValue="" variant="outlined"/>
            <TextField sx={{ margin: '10px' }} id="outlined-basic" label="New Password" defaultValue="" variant="outlined"/>
            <TextField sx={{ margin: '10px' }} id="outlined-basic" label="New Password" defaultValue="" variant="outlined"/>
            <Grid container justifyContent={'center'}>
                <Button sx={{margin: '5px', width: '45%'}} variant="contained">Cancel</Button>
                <Button sx={{margin: '5px', width: '45%'}} variant="contained">Save</Button>
            </Grid>
        </Box>
    );
}