/* eslint-disable react/function-component-definition */
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// const useStyles = makeStyles((theme) => ({
//   indicator: {
//     display: 'flex',
//     ,

//     alignItems: 'center',
//     [theme.breakpoints.up('md')]: {
//       margin: '0 2em',
//     },
//   },
// }));

const Indicators = () => (
  <Container
    disableGutters
    sx={{
      maxWidth: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      ml: 1,
      fontSize: '0.8rem',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }}
  >
    <Box sx={{ display: { xs: 'none', sm: 'flex' }, marginRight: { xs: '1.5em', md: '3em' } }}>
      <Typography
        variant="subtitle"
        component="p"
      >
        Total Market Cap. :
      </Typography>
      <Typography
        sx={{
          // m: 0.8,
          color: 'secondary.main',
          fontSize: '0.8rem',
        }}
      >
        $2,007,030,607,506
      </Typography>
    </Box>

    <Box sx={{ display: { xs: 'none', sm: 'flex' }, marginRight: { xs: '1.5em', md: '3em' } }}>
      <Typography
        variant="subtitle"
        component="p"
        sx={{
          // ml: 5,
        }}
      >
        24h Vol :
      </Typography>
      <Typography
        sx={{
          // ml: 1.5,
          color: 'secondary.main',
          fontSize: '0.8rem',
        }}
      >
        $51,271,689,599
      </Typography>
    </Box>

    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Typography
        variant="subtitle"
        component="p"
        sx={{
          // ml: 5,
        }}
      >
        Dominance :
      </Typography>
      <Typography
        sx={{
          // m: 0.8,
          color: 'secondary.main',
          fontSize: '0.8rem',
        }}
      >
        BTC: 40.2%
      </Typography>
    </Box>
  </Container>
);

export default Indicators;
