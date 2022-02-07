import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { fetchCryptoData } from 'src/actions/cryptoDetails';

import {
    Autocomplete,
    Box,
    Link,
    TextField,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

export default function SearchCrypto() {

    const [currency, setCurrency] = useState({ id: 'bitcoin', symbol: 'btc' });
    const [refCurrency, setRefCurrency] = useState(useSelector((state) => state.cryptos.cryptoList.selectedCurrency));

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

    return (
        <Box component="form"

            item xs={12}
            container gap={1} ml={3}
            sx={{
                width: 400,
                backgroundColor: 'primary.light',
                '&:hover': {
                    backgroundColor: '#8b6ad8',
                    textColor: 'white',
                },
            }}
        >
            <Autocomplete
                disablePortal
                id="cryptoCurrency"
                options={someCryptos}
                getOptionLabel={(option) => `${option.symbol.toUpperCase()} : ${option.name}`}
                // ! For later, to enhance list aspect

                renderOption={(props, option) => (
                    <Link
                        underline="none"
                        onClick={() => dispatch(fetchCryptoData(option.id))}
                        key={option.id}
                        component={RouterLink}
                        to={`/crypto/${option.id}`}
                        sx={{ color: 'primary.light' }}
                    >
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                                loading="lazy"
                                width="20"
                                src={option.image}
                                // srcSet={`${option.image} 2x`}
                                alt=""
                            />
                            {option.symbol.toUpperCase()} : {option.name}
                        </Box>
                    </Link>
                )
                }
                renderInput={(params) => <TextField {...params}
                    placeholder="Rechercher une crypto"

                />}
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
        </Box >

    );
}