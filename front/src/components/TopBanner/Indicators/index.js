/* eslint-disable react/function-component-definition */
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';


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

const Indicators = ({ data }) => {

  return (
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
          {data.total_market_cap.usd}
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
          {data.total_volume.usd}
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
          {data.market_cap_percentage.btc}
        </Typography>
      </Box>
    </Container>
  )
};

Indicators.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Indicators;
