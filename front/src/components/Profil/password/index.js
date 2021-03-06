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

    const { darkMode } = useSelector((state) => state.settings);

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
        } else if (newPass.oldPass === newPass.pass) {
            dispatch(setDisplaySnackBar({ severity: 'error', message: 'Votre mot de passe doit être different du mot de passe actuel' }));
            return;
        } else if (newPass.pass !== newPass.passConfirm) {
            dispatch(setDisplaySnackBar({ severity: 'error', message: 'Vérifier votre nouveau mot de passe' }));
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
            <Typography sx={{marginTop:"5px", color: !darkMode ? 'primary.light' : '#07f3d5'}} variant="h5" align="center">Password</Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <TextField color={!darkMode ? 'secondary' : 'custom'} onChange={(e) => setOldPassword(e.target.value)} sx={{ margin: '10px' }} type="password" id="pass" label="Password" defaultValue="" variant="outlined"/>
            <TextField color={!darkMode ? 'secondary' : 'custom'} onChange={(e) => setPassword(e.target.value)} sx={{ margin: '10px' }} type="password" id="newPass" label="New Password" defaultValue="" variant="outlined"/>
            <TextField color={!darkMode ? 'secondary' : 'custom'} onChange={(e) => setPasswordConfirm(e.target.value)} sx={{ margin: '10px' }} type="password" id="newPassCheck" label="New Password" defaultValue="" variant="outlined"/>
            <Grid container justifyContent={'center'}>
                <Button sx={{margin: '5px', width: '45%',':hover': {
              bgcolor: !darkMode ? '' : '#00244F',
              color: !darkMode ? '' : 'white',
            },
            color: !darkMode ? '' : 'primary.dark', backgroundColor: !darkMode ? '' : '#07f3d5' }} variant="contained">Cancel</Button>
                <Button onClick={handleClick} sx={{margin: '5px', width: '45%', ':hover': {
              bgcolor: !darkMode ? '' : '#00244F',
              color: !darkMode ? '' : 'white',
            },
            color: !darkMode ? '' : 'primary.dark', backgroundColor: !darkMode ? '' : '#07f3d5'}} variant="contained">Save</Button>
            </Grid>
        </Box>
    );
}