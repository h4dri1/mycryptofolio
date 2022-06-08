/* eslint-disable react/function-component-definition */
import * as React from 'react';

import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Grid,
    InputAdornment,
    TextField,
    Typography,
  } from '@mui/material';

import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem';

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
    grid: {
      minHeight: '80vh',
      marginTop: '130px'
    },
    gridItem: {
      borderColor: '#E7EBF0',
      borderRadius: 2,
      margin: '10px',
    },
    gridSubItem: {
      border: 'solid 2px gold',
      height: '100%',
    },
  });

  const avatarStyle = {
    border: "2px solid #7932a8",
    boxShadow: 20,
    mt: 3, width: 150, height: 150 
  };


export default function Profil() {

    const classes = useStyles();
    const avatar = avatarStyle;

    const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

    return (

        <Grid
            container
            display={'flex'}
            direction={'column'}
            alignItems={'center'}
            className={classes.grid}
        >
               
            <Grid item xs={12} className={classes.gridItem}>
                <IconButton>
                    <Avatar
                        alt="photo-avatar"
                        src="https://avatars.githubusercontent.com/u/89306281?v=4"
                        sx={avatar}
                    />
                </IconButton>
            </Grid>

            <Grid item sx={{display: 'flex'}} xs={12} className={classes.gridItem}>
            <Box
            sx={{
                width: 'auto',
                height: 'auto',
                boxShadow: 5,
                display: 'flex',
                flexDirection: 'column',
                paddingRight: '30px',
                paddingLeft: '30px',
                paddingBottom: '10px',
                margin: '50px'
            }}
            > 
                <Typography color="primary.dark" variant="h5" align="center">Profil</Typography>
                <Divider sx={{ marginBottom: '10px' }} />
                <TextField sx={{ margin: '10px' }} id="outlined-basic" label="User Name" defaultValue="test" variant="outlined"/>
                <TextField sx={{ margin: '10px' }} id="outlined-basic" label="Email" defaultValue="test@test.fr" variant="outlined"/>
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
                    <Button sx={{margin: '5px', width: '45%'}} variant="contained">Change</Button>
                </Grid>

            </Box>

            <Box
            sx={{
                width: 'auto',
                height: 'auto',
                boxShadow: 5,
                display: 'flex',
                flexDirection: 'column',
                paddingRight: '30px',
                paddingLeft: '30px',
                paddingBottom: '10px',
                margin: '50px'
            }}
            > 
                <Typography color="primary.dark" variant="h5" align="center">Password</Typography>
                <Divider sx={{ marginBottom: '10px' }} />
                <TextField sx={{ margin: '10px' }} id="outlined-basic" label="Password" defaultValue="" variant="outlined"/>
                <TextField sx={{ margin: '10px' }} id="outlined-basic" label="New Password" defaultValue="" variant="outlined"/>
                <TextField sx={{ margin: '10px' }} id="outlined-basic" label="New Password" defaultValue="" variant="outlined"/>
                <Grid container justifyContent={'center'}>
                    <Button sx={{margin: '5px', width: '45%'}} variant="contained">Cancel</Button>
                    <Button sx={{margin: '5px', width: '45%'}} variant="contained">Change</Button>
                </Grid>
            </Box>

            </Grid>

        </Grid >
    );
}
