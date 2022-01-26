import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
// import { useStyles } from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { useEffect, useState } from 'react';

const TransactionCreator = () => {
  // State for Autocomplete -BEGIN
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([{ description: 'ETH' }, { description: 'BTC' }]);
  // State for Autocomplete -END
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(32000);
  const [dateValue, setDateValue] = useState(Date.now());

  // useEffect(() => {
  //   let active = true;

  //   if (!autocompleteService.current && window.google) {
  //     autocompleteService.current =
  //       new window.google.maps.places.AutocompleteService();
  //   }
  //   if (!autocompleteService.current) {
  //     return undefined;
  //   }

  //   if (inputValue === '') {
  //     setOptions(value ? [value] : []);
  //     return undefined;
  //   }

  //   fetch({ input: inputValue }, (results) => {
  //     if (active) {
  //       let newOptions = [];

  //       if (value) {
  //         newOptions = [value];
  //       }

  //       if (results) {
  //         newOptions = [...newOptions, ...results];
  //       }

  //       setOptions(newOptions);
  //     }
  //   });

  //   return () => {
  //     active = false;
  //   };
  // }, [value, inputValue, fetch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        rowGap={2}
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '50vh', overflowY: 'auto',
        }}
      >
        <Typography
          variant="h6"
          component="h2"
        >
          Enregistrer une transaction
        </Typography>
        <Divider sx={{ width: '100%' }} />
        <Grid
          container
          spacing={2}
          xs={12}
        >
          <Grid item xs={12}>  
            <TextField
                required
                fullWidth
                name="price"
                label="Crypto-monnaie"
                type="text"
                id="price"
                value="BTC - Bitcoin"
              />
            {/* <Autocomplete
              id="currency"
              getOptionLabel={(option) => typeof option === 'string' ? option : option.description}
              filterOptions={(x) => x}
              options={options}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Renseignez une crypto" fullWidth />
              )}
              renderOption={(props, option) => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                  option.structured_formatting.main_text,
                  matches.map((match) => [match.offset, match.offset + match.length]),
                )}
              fullWidth
              // name="currency"
              // label="Choisissez une crypto-monnaie"
              // type="text"
              value={value}
            /> */}
          </Grid>
        </Grid>
        <Grid container spacing={2} xs={12}>
          <Grid item xs={6} className="transaction__field">
            <TextField
              required
              fullWidth
              name="quatity"
              label="Quantité"
              type="number"
              id="quatity"
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="price"
              label="Prix"
              type="number"
              id="price"
              value={price}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sp xs={12}>
          <Grid item container xs={6}>
            <Grid item xs={12}>
              <MobileDatePicker
                disableFuture
                label="Date d'achat"
                openTo="year"
                view="day"
                views={['year', 'month', 'day']}
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={6}>
                <Button variant="contained">
                  Ajouter
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined">
                  Annuler
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h5">
                Valeur: $ 2503.60
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default TransactionCreator;
