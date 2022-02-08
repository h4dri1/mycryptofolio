import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useSelector } from 'react-redux';

function Performance() {
  const { performance } = useSelector((state) => state.portfolio);

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
          display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: '100%',
        }}
        >
          <Typography>Investissement : {`$${Number(performance.investment).toLocaleString()}`}</Typography>
          <Typography>Valeur actuelle : {`$${Number(performance.actual_value).toLocaleString()}`}</Typography>
          <Typography>PnL : {`$${Number(performance.pnl).toLocaleString()}`}</Typography>
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
        ><Typography variant="h4" color={perfPercentage >= 0 ? '#1cb344' : '#eb3b5a'}>{perfPercentage > 0 ? `+${perfPercentage}%` : `${perfPercentage}%`}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Performance;
