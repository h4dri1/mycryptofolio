import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Indicators = () => (
  <>
    <Container
      disableGutters
      sx={{
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        ml: 1,
        fontSize: '0.8rem',
      }}
    >
      <Typography
        variant="subtitle"
        component="p"
        ml={2}
      >
        Total Market Cap. :
      </Typography>

      <Typography
        sx={{
          m: 0.8,
          color: 'secondary.main',
          fontSize: '0.8rem',
        }}
      >
        $2,007,030,607,506
      </Typography>

      <Typography

        variant="subtitle"
        component="p"
        sx={{
          ml: 5,
        }}
      >
        24h Vol :
      </Typography>

      <Typography
        sx={{
          ml: 1.5,
          color: 'secondary.main',
          fontSize: '0.8rem',
        }}
      >
        $51,271,689,599
      </Typography>

      <Typography
        variant="subtitle"
        component="p"
        sx={{
          ml: 5,
        }}
      >
        Dominance :
      </Typography>

      <Typography
        sx={{
          m: 0.8,
          color: 'secondary.main',
          fontSize: '0.8rem',
        }}
      >
        BTC: 40.2%
      </Typography>
    </Container>
  </>
);

export default Indicators;
