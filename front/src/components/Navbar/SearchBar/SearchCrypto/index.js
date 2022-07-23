import * as React from 'react';
import {
    Link as RouterLink, useNavigate, useLocation, useParams,
} from 'react-router-dom';

// import TextField from '@mui/material/TextField';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { fetchCryptoData } from 'src/actions/cryptoDetails';
import { Typography, useMediaQuery } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import {
    Autocomplete,
    Box,
    Link,
    TextField,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setHomeIcon, toggleHomeIcon } from '../../../../actions/settings';

export default function SearchCrypto() {
    const [currency, setCurrency] = useState({ id: 'bitcoin', symbol: 'btc' });
    const [refCurrency, setRefCurrency] = useState(useSelector((state) => state.cryptos.cryptoList.selectedCurrency));
    const { days } = useSelector((state) => state.cryptoDetails);
    const { darkMode } = useSelector((state) => state.settings);

    // Get all 20k cryptos
    const allCryptos = useSelector((state) => state.cryptos.allCryptos);

    const someCryptos = allCryptos.filter((_, index) => {
        if (index < 200) {
            return true;
        }
        return false;
    });

    const dispatch = useDispatch();
    const slug = useParams();
    const hide = useMediaQuery('(max-width:500px)');

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
                options={someCryptos}
                onClose={() => dispatch(setHomeIcon(true))}
                getOptionLabel={(option) => `${option.symbol.toUpperCase()} : ${option.name}`}

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
                        placeholder= {!hide ? "Rechercher une crypto" : ""}
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
