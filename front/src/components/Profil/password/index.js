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
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!regex.test(newPass.pass)) {
            dispatch(setDisplaySnackBar({ severity: 'error', message: 'Votre mot de passe doit avoir une taille d\'au moins 8 charactères et contenir: une lettre majuscule, une lettre minuscule, un chiffre et un charactère spécial' }));
            return;
        }
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
            <TextField onChange={(e) => setOldPassword(e.target.value)} sx={{ margin: '10px' }} type="password" id="pass" label="Password" defaultValue="" variant="outlined"/>
            <TextField onChange={(e) => setPassword(e.target.value)} sx={{ margin: '10px' }} type="password" id="newPass" label="New Password" defaultValue="" variant="outlined"/>
            <TextField onChange={(e) => setPasswordConfirm(e.target.value)} sx={{ margin: '10px' }} type="password" id="newPassCheck" label="New Password" defaultValue="" variant="outlined"/>
            <Grid container justifyContent={'center'}>
                <Button sx={{margin: '5px', width: '45%'}} variant="contained">Cancel</Button>
                <Button onClick={handleClick} sx={{margin: '5px', width: '45%'}} variant="contained">Save</Button>
            </Grid>
        </Box>
    );
}