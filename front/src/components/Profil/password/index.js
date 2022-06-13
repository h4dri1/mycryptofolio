import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { change_password } from '../../../actions/user';

import { 
    TextField, 
    Divider, 
    Typography, 
    Grid, 
    Button, 
    Box
} from '@mui/material';

export default function Password() {

    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = React.useState('');

    const [password, setPassword] = React.useState('');

    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    const newPass = {
        oldPass: oldPassword,
        pass: password,
        passConfirm: passwordConfirm
    }

    const handleClick = (event) => {
        event.preventDefault(); 
        dispatch(change_password(newPass));
    }

    return (
        <Box
        sx={{
            width: 'auto',
            height: 'auto',
            boxShadow: 5,
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            padding: '10px',
            paddingRight: '35px',
            paddingLeft: '35px'
        }}
        > 
            <Typography sx={{marginTop:"5px"}} color="primary.dark" variant="h5" align="center">Password</Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <TextField onChange={(e) => setOldPassword(e.target.value)} sx={{ margin: '10px' }} id="outlined-basic" label="Password" defaultValue="" variant="outlined"/>
            <TextField onChange={(e) => setPassword(e.target.value)} sx={{ margin: '10px' }} id="outlined-basic" label="New Password" defaultValue="" variant="outlined"/>
            <TextField onChange={(e) => setPasswordConfirm(e.target.value)} sx={{ margin: '10px' }} id="outlined-basic" label="New Password" defaultValue="" variant="outlined"/>
            <Grid container justifyContent={'center'}>
                <Button sx={{margin: '5px', width: '45%'}} variant="contained">Cancel</Button>
                <Button onClick={handleClick} sx={{margin: '5px', width: '45%'}} variant="contained">Save</Button>
            </Grid>
        </Box>
    );
}