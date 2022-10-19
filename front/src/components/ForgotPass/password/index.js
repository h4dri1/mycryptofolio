import { useDispatch, useSelector } from 'react-redux';

import { change_forgot_password } from '../../../actions/user';

import { setDisplaySnackBar } from 'src/actions/settings';

import { useParams } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';

import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';

import { 
    TextField, 
    Divider, 
    Typography, 
    Grid, 
    Button, 
    Box,
    InputAdornment,
    IconButton
} from '@mui/material';

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

export default function Password({color}) {

    const dispatch = useDispatch();

    const [password, setPassword] = useState('');

    const { token } = useParams();

    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [ showPass, setShowPass ] = useState(false);

    const [ showPassCheck, setShowPassCheck ] = useState(false);

    const { darkMode } = useSelector((state) => state.settings);

    const newPass = {
        token: token,
        pass: password,
        passConfirm: passwordConfirm
    }

    const handleClickShowPassword = () => {
        setShowPass(!showPass);
    }

    const handleClickShowCheckPassword = () => {
        setShowPassCheck(!showPassCheck);
    }
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      }

    const handleClick = (event) => {
        event.preventDefault();
        
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!regex.test(newPass.pass)) {
            dispatch(setDisplaySnackBar({ severity: 'error', message: 'Votre mot de passe doit avoir une taille d\'au moins 8 charactères et contenir: une lettre majuscule, une lettre minuscule, un chiffre et un charactère spécial' }));
            return;
        } else if (newPass.pass !== newPass.passConfirm) {
            dispatch(setDisplaySnackBar({ severity: 'error', message: 'Vérifier votre nouveau mot de passe' }));
            return;
        }
        dispatch(change_forgot_password(newPass));
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
            backgroundColor: color,
        }}
        > 
            <Typography sx={{marginTop:"5px"}} color={darkMode ? "custom.main" : "primary.dark"} variant="h5" align="center">Password</Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <TextField 
                onChange={(e) => setPassword(e.target.value)} 
                sx={textFieldStyle} 
                type={showPass ? 'text' : 'password'}
                id="newPass" 
                label="New Password" 
                value={password}
                variant="outlined"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                      )
                    }}
             />
            <TextField 
                onChange={(e) => setPasswordConfirm(e.target.value)} 
                sx={textFieldStyle} 
                type={showPassCheck ? 'text' : 'password'}
                id="newPassCheck" 
                label="Verify Password" 
                value={passwordConfirm}
                variant="outlined"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowCheckPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                      )
                    }}
              />
            <Grid container justifyContent={'center'}>
                <Button onClick={handleClick} sx={{backgroundColor: 'primary.light', margin: '5px', width: '45%'}} variant="contained">Cancel</Button>
                <Button onClick={handleClick} sx={{backgroundColor: 'primary.light', margin: '5px', width: '45%'}} variant="contained">Save</Button>
            </Grid>
        </Box>
    );
}