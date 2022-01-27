import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

const Performance = () => (
  <Grid container rowSpacing={3}>
    <Grid item xs={12}>
      <Typography color="primary.main" variant="h6" align="center">Performance</Typography>
      <Divider sx={{ width: '100%' }} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: '100%',
      }}
      >
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography>Investissement :</Typography><Typography color="secondary.dark">$500</Typography></Container>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography>Valeur actuelle :</Typography><Typography color="secondary.dark">$1000</Typography></Container>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography>PNL :</Typography><Typography color="secondary.dark">$500</Typography></Container>
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
          borderColor: "primary.dark",
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
