import { Grid, Box, Typography, Divider } from '@mui/material';

import { useSelector } from 'react-redux';

function Performance() {
  const { performance } = useSelector((state) => state.portfolio);
  const refCurrency = useSelector((state) => state.cryptos.cryptoList.selectedCurrency);

  let perfPercentage = (
    (
      (performance.actual_value - performance.investment) / performance.investment) * 100
  ).toFixed(2);

  isNaN(perfPercentage) ? perfPercentage = 0 : perfPercentage;

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Typography color="primary.light" variant="h6" align="center">Performance</Typography>
        <Divider sx={{ width: '100%' }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'right',
          padding: { xs: '.5em', md: '3em' },
          height: '100%',
        }}
        >
          <Box sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            margin: { xs: '0 1em', md: '0' },
          }}
          >
            <Typography>
              Investissement :
            </Typography>
            <Typography color="secondary.main" component="span">
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: refCurrency,
                maximumSignificantDigits: 4,
                minimumSignificantDigits: 2,
              }).format(performance.investment)}
            </Typography>
          </Box>

          <Box sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            margin: { xs: '0 1em', md: '0' },
          }}
          >
            <Typography>
              Valeur actuelle :
            </Typography>
            <Typography color="secondary.main" component="span" ml={2}>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: refCurrency,
                maximumSignificantDigits: 4,
                minimumSignificantDigits: 2,
              }).format(performance.actual_value)}
            </Typography>
          </Box>

          <Box sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            margin: { xs: '0 1em', md: '0' },
          }}
          >
            <Typography>
              PnL :
            </Typography>
            <Typography color="secondary.main" component="span" ml={2}>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: refCurrency,
                maximumSignificantDigits: 4,
                minimumSignificantDigits: 2,
              }).format(performance.pnl)}
            </Typography>
          </Box>

        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <Box
          component="span"
          sx={[{
            marginBottom: '15px',
            width: '70%',
            maxWidth: '40vw',
            borderRadius: '50%',
            border: 'solid 3px',
            borderColor: 'primary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          {
            '::after': {
              display: 'block',
              paddingBottom: '100%',
              content: '""',
            },
          },
          ]}
        >
          <Typography
            variant="h3"
            color={perfPercentage >= 0 ? '#1cb344' : '#eb3b5a'}
          >
            {perfPercentage > 0 ? `+${perfPercentage}%` : `${perfPercentage}%`}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Performance;
