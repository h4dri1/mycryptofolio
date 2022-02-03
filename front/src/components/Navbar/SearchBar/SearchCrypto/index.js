import * as React from 'react';
// import TextField from '@mui/material/TextField';
import { createFilterOptions } from '@mui/material/Autocomplete';
import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
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

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.title,
    });

    return (


        <Box component="form" item xs={12} borderRadius='3'
            // onSubmit={handleSubmit} 
            // sx={{ display: 'flex', bgcolor: '#6C49BA' }}
            container gap={2} ml={3}
            size='small'
            height='50px'
            sx={{
                width: 400,
                height: '100%',
                backgroundColor: 'primary.light',
                '&:hover': {
                    backgroundColor: '#8b6ad8',
                    textColor: 'white',
                    size: 'small'
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
                )}
                renderInput={(params) => <TextField {...params}
                    label={'Rechercher une crypto'} />}
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