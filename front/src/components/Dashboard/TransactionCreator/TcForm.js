/* eslint-disable react/function-component-definition */
import PropTypes from 'prop-types';
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
// import { useStyles } from '@mui/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCurrentPrice, setPrice } from 'src/actions/cryptos';
import { saveTransaction } from 'src/actions/portfolio';
import { toggleTransactionEditor } from 'src/actions/settings';

const TransactionCreatorForm = ({ buy, id }) => {
  const dispatch = useDispatch();

  // Get all 20k cryptos
  const allCryptos = useSelector((state) => state.cryptos.allCryptos);

  // ! //  If needed filter only the X first ones (ex: 5000)
  const someCryptos = allCryptos.filter((_, index) => {
    if (index < 200) {
      return true;
    }
    return false;
  });

  const { currentPrice } = useSelector((state) => state.cryptos);
  const { transactionEditorIsOpen } = useSelector((state) => state.settings);

  const [currency, setCurrency] = useState({ id: '', symbol: '' });
  const [quantity, setQuantity] = useState('');
  const [dateValue, setDateValue] = useState(new Date());
  // eslint-disable-next-line max-len
  const [refCurrency, setRefCurrency] = useState(useSelector((state) => state.cryptos.cryptoList.selectedCurrency));

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTransaction = {
      coin_id: currency.id,
      symbol: currency.symbol,
      buy,
      price: currentPrice,
      // ref_currency: refCurrency.toLowerCase(),
      quantity,
      buy_date: dateValue.toUTCString(),
    };
    // change sign of quantity in case of selling transaction
    if (!newTransaction.buy) {
      newTransaction.quantity *= (-1);
    }
    if (id) {
      newTransaction.id = id;
    }
    // DONE: Replace console log by a dispatch of an action to send a transaction to API
    dispatch(saveTransaction(newTransaction));

    if (transactionEditorIsOpen) {
      dispatch(toggleTransactionEditor());
    }
  };

  const handleCancel = () => {
    setCurrency({ id: '', symbol: '' });
    setDateValue(Date.now());
    setPrice(0);
    setQuantity(0);
    if (transactionEditorIsOpen) {
      dispatch(toggleTransactionEditor());
    }
  };

  useEffect(() => dispatch(getCurrentPrice({
    coinId: currency.id,
    dateValue,
    refCurrency,
  })), [currency, dateValue]);

  // ! Do not remove next commented code, may be useful later
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
    <div>
      <Typography color="primary.light" variant="h6" component="h2">
        Enregistrer {buy ? 'un achat' : 'une vente'}
      </Typography>
      <Divider sx={{ width: '100%' }} />
      <Grid component="form" onSubmit={handleSubmit} container gap={2} mt={3}>
        <Grid item xs={12}>
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
            renderInput={(params) => <TextField {...params} label={buy ? 'Crypto achetée' : 'Crypto vendue'} />}
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
          {/* ! For later, to enhance list perf */}
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
              inputProps={{
                lang: 'en-US',
                min: 0,
                step: '0.00000001',
              }}
              id="quatity"
              value={quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
              }}
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
              value={(Math.ceil(currentPrice * 100) / 100)}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">{refCurrency.toUpperCase()}</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item container xs={5}>
            <Grid
              item
              xs={12}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  disableFuture
                  label={buy ? 'Date de l\'achat' : 'Date de la vente'}
                  openTo="year"
                  view="day"
                  views={['year', 'month', 'day']}
                  value={dateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
            >
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{ color: 'primary.light' }}
                >
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
              <Typography variant="overline" sx={{ fontSize: { xs: 15, sm: 25 } }}>
                {Intl.NumberFormat('fr-FR', { style: 'currency', currency: refCurrency }).format(quantity * currentPrice)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TransactionCreatorForm;

TransactionCreatorForm.propTypes = {
  buy: PropTypes.bool.isRequired,
  id: PropTypes.number,
};

TransactionCreatorForm.defaultProps = {
  id: undefined,
};
