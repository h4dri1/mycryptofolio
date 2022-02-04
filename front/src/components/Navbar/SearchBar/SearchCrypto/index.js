import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
import { createFilterOptions } from '@mui/material/Autocomplete';
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


    // const filterOptions = createFilterOptions({
    //     matchFrom: 'start',
    //     stringify: (option) => option.title,
    // });

    // const match = useMatch(`/crypto/${slug}`);
    const location = useLocation();
    const navigate = useNavigate();
    const { slug } = useParams();
    console.log(location);

    const handleSubmit = (e) => {
        e.preventDefault();
        location.pathname
        // navigate(`../crypto/${currency.id}`, { replace: true })
        slug ? navigate(`/crypto/${currency.id}`, { replace: true }) : navigate(`/crypto/${currency.id}`, { replace: true });



        // console.log(currency.id);
    }

    // const handleClick = useEffect(() => {
    //       navigate(`/crypto/${slug}`);
    //     }
    //   }, []);

    return (
        <Box component="form" onSubmit={handleSubmit} item xs={12} borderRadius='3'
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
                // onSubmit={() => navigate(`/crypto/${slug}`)}

                disablePortal
                id="cryptoCurrency"
                options={someCryptos}
                // getOptionLabel={(option) => `${option.symbol.toUpperCase()} : ${option.name}`}
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