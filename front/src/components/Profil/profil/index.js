import * as React from 'react';

import { TextField, Divider, Typography, Grid, Button, Box, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

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

    const { nickname, email } = useSelector((state) => state.user);

    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

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
            <Typography sx={{marginTop:"5px"}} color="primary.dark" variant="h5" align="center">Profil</Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <TextField sx={{ margin: '10px' }} id="outlined-basic" label="User Name" defaultValue={nickname} variant="outlined"/>
            <TextField sx={{ margin: '10px' }} id="outlined-basic" label="Email" defaultValue={email} variant="outlined"/>
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
                <Button sx={{margin: '5px', width: '45%'}} variant="contained">Save</Button>
            </Grid>

        </Box>
    );
}