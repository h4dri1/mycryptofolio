/* eslint-disable react/function-component-definition */
import PropTypes, { string } from 'prop-types';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material';
// import { useStyles } from '@mui/styles';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
//import MobileDatePicker from '@mui/lab/DatePicker';
import { DatePicker } from '@mui/x-date-pickers'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCurrentPrice, setPrice } from 'src/actions/cryptos';
import { saveTransaction } from 'src/actions/portfolio';
import { toggleTransactionEditor, toggleTransactionCreator } from 'src/actions/settings';
import { updateSelectedWallet, fetchSpecificWallet } from 'src/actions/portfolio';

const TransactionCreatorForm = ({ buy, id, disabled, wallets, selectedWallet, transaction, distribution }) => {
  const dispatch = useDispatch();

  // Get all 20k cryptos
  const allCryptos = useSelector((state) => state.cryptos.allCryptos);

  let someCryptos = allCryptos.filter((_, index) => {
    if (index < 200) {
      return true;
    }
    return false;
  });

  const cryptoState = () => {
    if (transaction !== undefined) {
      someCryptos = [someCryptos.find(crypto => crypto.symbol === transaction.symbol)];
      return ({ id: someCryptos[0].id, symbol: someCryptos[0].symbol })
    } else if (distribution !== undefined) {
        someCryptos = distribution.map(d => ({ 
          id: d.coin_id, 
          symbol: d.name,
          name: someCryptos.find(c => c.symbol === d.name).name,
          image: someCryptos.find(c => c.symbol === d.name).image
        })
      );
      return ({ id: '', symbol: '' })
    } else {
      return ({ id: '', symbol: '' })
    }
  }

  const quantityState = () => {
    if (transaction !== undefined) {
      return transaction.quantity;
    }
    return 0;
  }

  const dateState = () => {
    if (transaction !== undefined) {
      return transaction.date;
    } else if (distribution !== undefined) {
      return new Date();
    } else {
      return new Date();
    }
  }

  const priceState = () => {
    if (transaction !== undefined) {
      return transaction.price;
    } else if (distribution !== undefined) {
      return 0;
    } else {
      return 0;
    }
  }

  const { currentPrice } = useSelector((state) => state.cryptos);
  const { transactionEditorIsOpen } = useSelector((state) => state.settings);
  const { transactionCreatorIsOpen } = useSelector((state) => state.settings);
  const [currency, setCurrency] = useState(cryptoState());
  const [quantity, setQuantity] = useState(quantityState());
  const [dateValue, setDateValue] = useState(dateState());
  // eslint-disable-next-line max-len
  const [refCurrency, setRefCurrency] = useState(useSelector((state) => state.cryptos.cryptoList.selectedCurrency));
  const [oldPrice, setOldPrice] = useState(priceState());

  const [selectWallet, setSelectWallet] = useState(selectedWallet);
  const [disable, setDisable] = useState(someCryptos.length === 1 && selectWallet !== '' ? false : disabled);

  const handleChange = (event) => {
    dispatch(fetchSpecificWallet(event.target.value));
    setDisable(false);
    setSelectWallet(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(currency)
    const newTransaction = {
      coin_id: currency.id,
      symbol: currency.symbol,
      buy,
      price: `${oldPrice !== 0 ? oldPrice : currentPrice}`,
      // ref_currency: refCurrency.toLowerCase(),
      quantity,
      buy_date: typeof(dateValue) === 'string' ? dateValue : dateValue.toUTCString(),
      fiat: refCurrency,
      wallet: selectWallet
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
    if (transactionCreatorIsOpen) {
      dispatch(toggleTransactionCreator());
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

  function changeTimeZone(date, timeZone) {
    if (typeof date === 'string') {
      return new Date(
        new Date(date).toLocaleString('en-US', {
          timeZone,
        }),
      );
    }
  
    return new Date(
      date.toLocaleString('en-US', {
        timeZone,
      }),
    );
  }

  useEffect(() => {
    async function fetchPrice() {
      if (someCryptos.length > 1 || oldPrice === 0) {
        const usDate = changeTimeZone(dateValue, 'America/New_York');
        await dispatch(getCurrentPrice({
          coinId: currency.id,
          usDate,
          refCurrency,
        })); 
      } else {
        dispatch(setPrice(0));
      }
    }
    fetchPrice();
  }, [currency, dateValue]);

  // ! Do not remove next commented code, may be useful later
  // useEffect(() => {
  //   let active = true; wallets={wallets}

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
  //         newOptions = [value];wallets
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
      <Typography sx={{mt: 2}} color="primary.light" variant="h6" component="h2">
        {someCryptos.length === 1 ? 'Modifier' : 'Enregistrer'} {buy ? 'un achat' : 'une vente'}
      </Typography>
      <Divider sx={{ width: '100%' }} />
      <Grid component="form" onSubmit={handleSubmit} container gap={2} mt={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Wallet</InputLabel>
            <Select
              disabled={selectWallet === '' || id ? false : true}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectWallet}
              label="Wallet"
              onChange={handleChange}
            >
              {wallets.length > 0 && wallets.map((wallet) => (
                <MenuItem key={wallet.id} value={wallet.id}>{wallet.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disabled={disable}
            disablePortal
            id="cryptoCurrency"
            options={someCryptos}
            getOptionLabel={(option) => `${option.symbol.toUpperCase()} : ${option.name}`}
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
            renderInput={(params) => <TextField {...params} label={someCryptos.length === 1 ? `${someCryptos[0].symbol.toUpperCase()} : ${someCryptos[0].name}` : buy ? 'Crypto achetée' : 'Crypto vendue'} />}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            required
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(_, value) => {
              if (!value) {
                setCurrency({ id: '', symbol: '' });
              }
              else {
                setCurrency(value);
                if (distribution) {
                  setQuantity(distribution.find(d => d.name === value.symbol).quantity)
                }
              }
            }}
          />
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid
            item
            xs={6}
            className="transaction__field"
          >
            <TextField
              disabled={disable}
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
              disabled={disable}
              required
              fullWidth
              name="price"
              label="Prix"
              type="number"
              id="price"
              value={oldPrice !== 0 ? Math.ceil(oldPrice * 100) / 100 : (Math.ceil(currentPrice * 100) / 100)}
              onChange={(e) => {
                  setOldPrice(e.target.value);
                }
              }
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
              <DatePicker
                disabled={disable}
                disableFuture
                label={buy ? 'Date de l\'achat' : 'Date de la vente'}
                value={dateValue}
                onChange={(newValue) => {
                  setOldPrice(0);
                  setDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              </LocalizationProvider>
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
            <Grid item xs={12} sx={{ border: 'solid 1px grey', borderRadius: '1em' }}>
              <Typography variant="overline" sx={{ fontSize: { xs: 15, sm: 25 } }}>
                {Intl.NumberFormat('fr-FR', { style: 'currency', currency: refCurrency }).format(quantity * (oldPrice === 0 ? currentPrice : oldPrice))}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sx={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Button
              disabled={disable}
              variant="outlined"
              onClick={handleCancel}
              sx={{ color: 'primary.light' }}
            >
              Annuler
            </Button>
            <Button
              disabled={disable}
              variant="contained"
              type="submit"
              onSubmit={handleSubmit}
            >
              Ajouter
            </Button>
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
  disabled: PropTypes.bool.isRequired,
};

TransactionCreatorForm.defaultProps = {
  id: undefined,
  // disabled: true,
};
