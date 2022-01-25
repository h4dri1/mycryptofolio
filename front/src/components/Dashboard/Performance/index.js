import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const Performance = () => (
  <Grid container sx={{ height: '100%' }}>
    <Grid item xs={12} sx={{ height: '15%' }}>
      <Typography variant="h6">Performance</Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card>
        <Typography>Investissement</Typography>
        <Typography>Valeur actuelle</Typography>
        <Typography>PnL</Typography>
      </Card>
    </Grid>
    <Grid
      item
      xs={12}
      sm={6}
      sx={{
        height: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
    >
      <Box
        component="span"
        sx={{
          height: '200px', width: '200px', borderRadius: '50%', border: 'solid 1px grey',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      ><Typography>+50%</Typography>
      </Box>
    </Grid>
  </Grid>
);

export default Performance;
