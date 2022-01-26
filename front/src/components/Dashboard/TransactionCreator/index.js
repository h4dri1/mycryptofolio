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
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(32000);
  const [dateValue, setDateValue] = useState(Date.now());
  const [refCurrency, setRefCurrency] = useState('USD');

  // const handleSubmit = () => alert(`Votre achat de ${quantity} ${cryptoCurrency} à ${price} ${refCurrency} pour un montant total de ${Math.floor(quantity * price)} a bien été enregistré`)
  const handleSubmit = () => console.log(`Votre achat de ${quantity} ${cryptoCurrency} à ${price} ${refCurrency} pour un montant total de ${Math.floor(quantity * price)} a bien été enregistré`);

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
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '50vh',
          overflowY: 'auto',
          padding: '0 2em',
        }}
      >
        <Typography variant="h6" component="h2">
          Enregistrer une transaction
        </Typography>

        <Divider sx={{ width: '100%' }} />

        <Grid container gap={2} xs={12} mt={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="cryptoCurrency"
              label="Crypto-monnaie"
              type="text"
              id="cryptoCurrency"
              value={cryptoCurrency}
              onChange={(e) => setCryptoCurrency(e.target.value)}
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
          <Grid container item xs={12} spacing={2}>
            <Grid
              item
              xs={6}
              className="transaction__field"
            >
              <TextField
                required
                fullWidth
                name="quatity"
                label="Quantité"
                type="number"
                id="quatity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                required
                fullWidth
                name="price"
                label="Prix"
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item container xs={5}>
              <Grid
                item xs={12}
              >
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
              <Grid
                item
                container
                spacing={2}
                xs={12}
              >
                <Grid item xs={6}>
                  <Button variant="outlined">
                    Annuler
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    type="submit"
                    onSubmit={handleSubmit}
                  >
                    Ajouter
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={7}
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Grid item xs={12} p={0.5} sx={{ border: 'solid 1px grey', borderRadius: '1em' }}>
                <Typography variant="h6">
                  Montant de la transaction
                </Typography>
                <Typography variant="overline" fontSize={25}>
                  {Intl.NumberFormat('fr-FR', { style: 'currency', currency: refCurrency }).format(quantity * price)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default TransactionCreator;
