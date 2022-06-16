import * as React from 'react';

import { TextField, Divider, Typography, Grid, Button, Box, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { change_user, changeCurrency } from '../../../actions/user';
import { updateCurrency } from '../../../actions/cryptos';

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

export default function Profil() {
    const dispatch = useDispatch();

    const { nickname, email, id } = useSelector((state) => state.user);
    
    const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);

    const [currency, setCur] = React.useState(selectedCurrency);

    const [nicknameValue, setNicknameValue] = React.useState(nickname);

    const [emailValue, setEmailValue] = React.useState(email);

    const newUser = {
        id: id,
        nickname: nicknameValue,
        email: emailValue
    }

    const curr = {
      cur: currency
    }

    const handleClick = (event) => {
      event.preventDefault();
      if (selectedCurrency !== currency) {
        dispatch(changeCurrency(curr));
      } else if (nickname !== nicknameValue || email !== emailValue) {
        dispatch(change_user(newUser));
      } else {
        dispatch(setDisplaySnackBar({ severity: 'error', message: `Vous n'avez apporté aucune modification` }));
        return
      }
    };

    const handleChange = (event) => {
      setCur(event.target.value);
    };

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
            <Typography sx={{marginTop:"5px"}} color="primary.dark" variant="h5" align="center">Profil</Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            
            <TextField onChange={(e) => setNicknameValue(e.target.value)} sx={{ margin: '10px' }} id="nickname" label="User Name" defaultValue={nickname} variant="outlined"/>
            <TextField onChange={(e) => setEmailValue(e.target.value)} sx={{ margin: '10px' }} id="email" label="Email" defaultValue={email} variant="outlined"/>
            <TextField
            sx={{ margin: '10px' }}
            id="outlined-select-currency"
            select
            label="Currency"
            value={currency}
            onChange={handleChange}
            >
            {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>

            <Grid container justifyContent={'center'}>
                <Button sx={{margin: '5px', width: '45%'}} variant="contained">Cancel</Button>
                <Button onClick={handleClick} sx={{margin: '5px', width: '45%'}} variant="contained">Save</Button>
            </Grid>

        </Box>
    );
}