import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Performance = () => (
  <Grid container rowSpacing={3}>
    <Grid item xs={12}>
      <Typography variant="h6" align="center">Performance</Typography>
      <Divider sx={{ width: '100%' }} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: '100%',
      }}
      >
        <Typography>Investissement : $500</Typography>
        <Typography>Valeur actuelle : $1,000</Typography>
        <Typography>PnL : $500</Typography>
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
          border: 'solid 3px #1976D2',
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
      ><Typography variant="h4" color="green">+50%</Typography>
      </Box>
    </Grid>
  </Grid>
);

export default Performance;
