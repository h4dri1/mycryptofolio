/* eslint-disable no-dupe-keys */
import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

export default function Indicators({ data }) {
  const lastUpdateDate = new Date(data.market_data.last_updated);

  return (
    <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'column', justifyContent: 'space-evenly' }}>
      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2, color: 'text.secondary',
      }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 12.5 }}>
          Rang Market cap.:
        </Typography>
        <Typography sx={{
          fontWeight: 'normal', mx: 1, fontSize: 12, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.market_cap_rank}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary', flexWrap: 'wrap',
      }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 12.5 }}>
          Contrevaleur:
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>BTC:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.current_price.btc}
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>ETH:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.current_price.eth}
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>EUR:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.current_price.eur}
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>USD:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.current_price.usd}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary', flexWrap: 'wrap',
      }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 12.5 }}>
          Market cap.:
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>BTC:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.market_cap.btc}
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>ETH:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.market_cap.eth}
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>EUR:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.market_cap.eur}
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>USD:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.market_cap.usd}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'baseline', color: 'text.secondary', flexWrap: 'wrap',
      }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 12.5 }}>
          Total volume:
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>BTC:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.total_volume.btc}
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>ETH:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.total_volume.eth}
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>EUR:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.total_volume.eur}
        </Typography>

        <Typography sx={{ mx: 0.5, fontSize: 10.8 }}>USD:</Typography>
        <Typography sx={{
          fontWeight: 'normal', fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.total_volume.usd}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary',
      }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 12.5 }}>
          % market cap. 24h:
        </Typography>
        <Typography sx={{
          fontWeight: 'normal', mx: 1, fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.market_cap_change_percentage_24h}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary',
      }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 12.5 }}>
          Total supply:
        </Typography>
        <Typography sx={{
          fontWeight: 'normal', mx: 1, fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.total_supply}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary',
      }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 12.5 }}>
          Max supply:
        </Typography>
        <Typography sx={{
          fontWeight: 'normal', mx: 1, fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.max_supply}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary',
      }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 12.5 }}>
          Circulating supply:
        </Typography>
        <Typography sx={{
          fontWeight: 'normal', mx: 1, fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.market_data.circulating_supply}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary',
      }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 12.5 }}>
          Dernière mise à jour:
        </Typography>
        <Typography sx={{
          fontWeight: 'normal', mx: 1, fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {`${lastUpdateDate.getDate()}/${(lastUpdateDate.getMonth() + 1)}/${lastUpdateDate.getFullYear()}`}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary',
      }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 12.5 }}>
          Lien:
        </Typography>
        <Typography sx={{
          fontWeight: 'normal', mx: 1, fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.links}
        </Typography>
      </Box>

      <Box sx={{
        mb: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary',
      }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 12.5 }}>
          Repos:
        </Typography>
        <Typography sx={{
          fontWeight: 'normal', mx: 1, fontSize: 10.8, color: 'secondary.main', fontWeight: 'bold',
        }}
        >
          {data.repos_url[0]}
        </Typography>
      </Box>
    </Box>
  );
}

Indicators.propTypes = {
  data: PropTypes.object.isRequired,
};
