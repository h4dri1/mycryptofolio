import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import axios from 'axios';

// import TextField from '@mui/material/TextField';
import { fetchCryptoData } from 'src/actions/cryptoDetails';
import { Typography, useMediaQuery } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import {
    Autocomplete,
    Box,
    Link,
    TextField,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setHomeIcon } from '../../../../actions/settings';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

export default function SearchCrypto() {
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState({ id: 'bitcoin', symbol: 'btc' });
    const { days } = useSelector((state) => state.cryptoDetails);
    const { darkMode } = useSelector((state) => state.settings);
    //const { allCryptos } = useSelector((state) => state.cryptos)

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true
        if (!loading) {
            return undefined
        }

        (async () => {
            let someCryptos
            await axios({
                method: 'get',
                baseURL,
                url: '/cryptos/usd/100',
              })
                .then((res) => {
                    someCryptos = res.data.filter((_, index) => {
                        if(index < 200) {
                            return true;
                        }
                        return false
                    })
                })
                .catch((err) => console.log(err));
            if (active) {
                setOptions([...someCryptos]);
            }
        })();

        return () => {
            active = false
        }
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    // Get all 20k cryptos
    //const allCryptos = useSelector((state) => state.cryptos.allCryptos);
//
    //const someCryptos = allCryptos.filter((_, index) => {
    //    if (index < 200) {
    //        return true;
    //    }
    //    return false;
    //});

    return (
        <Box
            component="form"
            item
            xs={12}
            container
            gap={1}
            ml={{ xs: 2, sm: 3 }}
            onTouchStart ={() => dispatch(setHomeIcon(false))}
            sx={{
                width: {xs: '100%', md: 260},
                borderRadius: '4px',
                backgroundColor: 'primary.light',
                '&:hover': {
                    backgroundColor: '#8b6ad8',
                    textColor: 'white',
                },
                marginTop: '10px',
                marginBottom: '10px',
                marginRight: {xs: 1, md: 0},
            }}
        >
            <Autocomplete
                disablePortal
                id="cryptoCurrency"
                onOpen={() => {
                    setOpen(true)
                }}
                onClose={() => {
                    dispatch(setHomeIcon(true))
                    setOpen(false)
                }}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                getOptionLabel={(option) => `${option.symbol.toUpperCase()} : ${option.name}`}
                options={options}
                loading={loading}
                // ! For later, to enhance list aspect

                renderOption={(props, option) => (
                    <Link
                        underline="none"
                        onClick={() => dispatch(fetchCryptoData(option.id, days))}
                        key={option.id}
                        component={RouterLink}
                        to={`/crypto/${option.id}`}
                        sx={{ color: !darkMode ? 'primary.light' : '#07f3d5' }}
                    >
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                                loading="lazy"
                                width="25"
                                src={option.image}
                                // srcSet={`${option.image} 2x`}
                                alt=""
                            />
                            <Typography sx={{fontSize: '0.8em'}}>{option.symbol.toUpperCase()} : {option.name}</Typography>
                        </Box>
                    </Link>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Rechercher une crypto..."
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                            ),
                        }}
                    />
                )}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                required
                onChange={(_, value) => {
                    if (!value) {
                        setCurrency({ id: '', symbol: '' });
                    }
                    else {
                        setCurrency(value);
                    }
                }}
            />
        </Box>

    );
}
