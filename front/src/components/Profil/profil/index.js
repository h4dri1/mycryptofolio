import { useState } from 'react';

import { TextField, Divider, Typography, Grid, Button, Box, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { change_user } from '../../../actions/user';
import { makeStyles } from '@mui/styles';

import { setDisplaySnackBar } from 'src/actions/settings';

const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const useStyles = makeStyles({
    input: {
      color: "white"
    }
  });

export default function Profil({color}) {
    const dispatch = useDispatch();

    const { nickname, email, id } = useSelector((state) => state.user);
    
    const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);

    const [currency, setCur] = useState(selectedCurrency);

    const [nicknameValue, setNicknameValue] = useState(nickname);

    const [emailValue, setEmailValue] = useState(email);

    const { darkMode } = useSelector((state) => state.settings);

    const newUser = {
        id: id,
        nickname: nicknameValue,
        email: emailValue,
        currency: currency
    }

    const handleClick = (event) => {
      if (nicknameValue !== nickname || emailValue !== email || selectedCurrency !== currency) {
        dispatch(change_user(newUser));
      } else {
        dispatch(setDisplaySnackBar({ severity: 'error', message: `Vous n'avez apporté aucune modification` }));
        return
      }
    };

    const classes = useStyles();

    const handleChange = (event) => {
      setCur(event.target.value);
    };

    const textFieldStyle = {
      "& .MuiInputLabel-root.Mui-focused": 
      {
        color: 'secondary.main'
      },//styles the label
      "& .MuiInputLabel-root": 
      {
        color: 'primary.light'
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
            borderRadius: '10px',
        }}
        > 
            <Typography sx={{marginTop:"5px", color: 'white'}} variant="h5" align="center">Profil</Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            
            <TextField 
              onChange={(e) => setNicknameValue(e.target.value)}
              id="nickname" 
              label="User Name" 
              defaultValue={nickname} 
              variant="outlined"
              sx={ textFieldStyle } 
              inputProps={{ className: classes.input }}
            />
            <TextField 
              onChange={(e) => setEmailValue(e.target.value)}
              id="email" 
              label="Email" 
              defaultValue={email} 
              variant="outlined"
              sx={ textFieldStyle }
              inputProps={{ className: classes.input }}
            />
            <TextField
            id="outlined-select-currency"
            select
            label="Currency"
            value={currency}
            onChange={handleChange}
            sx={ textFieldStyle } 
            inputProps={{ className: classes.input }}
            >
            {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>

            <Grid container justifyContent={'center'}>
                <Button sx={{backgroundColor: 'primary.light', margin: '5px', width: '45%'}} variant="contained">Cancel</Button>
                <Button onClick={handleClick} sx={{backgroundColor: 'primary.light', margin: '5px', width: '45%'}} variant="contained">Save</Button>
            </Grid>

        </Box>
    );
}