import { useState } from 'react';

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

export default function Password({color}) {

    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState('');

    const [password, setPassword] = useState('');

    const [passwordConfirm, setPasswordConfirm] = useState('');

    const { darkMode } = useSelector((state) => state.settings);

    const textFieldStyle = {
        "& .MuiInputLabel-root.Mui-focused": 
        {
          color: 'secondary.main'
        },//styles the label
        "& .MuiInputLabel-root": 
        {
          color: 'white'
        },//styles the label
          "& .MuiOutlinedInput-root": 
        {
          "& > fieldset": { borderColor: "primary.light" },
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
          "& > fieldset": {
            borderColor: "secondary.main",
          }
        },
        margin: '10px'
    }

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
            paddingLeft: '35px',
            borderRadius: '10px',
            bgcolor: color
        }}
        > 
            <Typography sx={{marginTop:"5px", color: 'white'}} variant="h5" align="center">Password</Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <TextField onChange={(e) => setOldPassword(e.target.value)} sx={ textFieldStyle } type="password" id="pass" label="Password" defaultValue="" variant="outlined"/>
            <TextField onChange={(e) => setPassword(e.target.value)} sx={ textFieldStyle } type="password" id="newPass" label="New Password" defaultValue="" variant="outlined"/>
            <TextField onChange={(e) => setPasswordConfirm(e.target.value)} sx={ textFieldStyle } type="password" id="newPassCheck" label="New Password" defaultValue="" variant="outlined"/>
            <Grid container justifyContent={'center'}>
                <Button sx={{backgroundColor: 'primary.light', margin: '5px', width: '45%'}} variant="contained">Cancel</Button>
                <Button onClick={handleClick} sx={{backgroundColor: 'primary.light', margin: '5px', width: '45%'}} variant="contained">Save</Button>
            </Grid>
        </Box>
    );
}