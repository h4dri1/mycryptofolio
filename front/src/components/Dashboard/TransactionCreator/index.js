import { Box, Grid, Typography } from '@mui/material';

const TransactionCreator = () => (
  <Box
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
    <Grid container xs={12}>
      <Grid item xs={12}> Crypto </Grid>
    </Grid>
    <Grid container xs={12}>
      <Grid item xs={6}> Quantité </Grid>
      <Grid item xs={6}> Prix </Grid>
    </Grid>
    <Grid container xs={12}>
      <Grid item container xs={6}>
        <Grid item xs={12}> Date </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}> Ajouter </Grid>
          <Grid item xs={6}> Annuler </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={6}>
        <Grid item xs={12}> Valeur: $ 1.23 </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default TransactionCreator;
