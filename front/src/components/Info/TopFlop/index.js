import PropTypes from 'prop-types';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Box,
  Container,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  TableCell,
  TableBody,
  Avatar,
  Skeleton,
} from '@mui/material';

function Loading(props) {
  const {
    variant, h, wxs, wmd,
  } = props;
  return (
    <Skeleton sx={{ margin: '0px 1px 4px 1px', width: { xs: wxs, md: wmd } }} variant={variant} height={h} />
  );
}

Loading.propTypes = {
  variant: PropTypes.string.isRequired,
  h: PropTypes.number.isRequired,
  wxs: PropTypes.number.isRequired,
  wmd: PropTypes.number.isRequired,
};

const CryptoMap = (props) => {
  const size = props.pixelRatio > 1 ? '0.8em' : '0.9em';
  const cutCryptos = props.loading ? Array.from(new Array(7)) : props.cryptos.coins.slice(0, 7);

  return (
    cutCryptos.map((crypto, index) => (
      <TableRow
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        hover
      >
        <TableCell sx={{ borderBottom: 0 }}>
          {!props.loading
            ? (
              <Box
                component={RouterLink}
                to={`/crypto/${crypto.item.id}`}
                sx={{
                  color: 'primary.light', display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' },
                }}
              >
                <Avatar
                  loading="lazy"
                  src={crypto.item.small}
                  alt={crypto.item.name}
                  sx={{
                    mr: 2, width: 20, height: 20, marginLeft: 1,
                  }}
                />
                <Typography sx={{ color: 'secondary.dark' }}>{crypto.item.symbol}</Typography>
              </Box>
            ) : <Box sx={{ display: 'flex', alignItems: 'center', margin: { xs: ' 0 -16px', sm: '0px' } }}><Loading variant="circular" h={20} wxs={20} wmd={20} /><Loading variant="text" h={20} wxs={30} wmd={30} /></Box>}
        </TableCell>
        <TableCell sx={{ borderBottom: 0, fontSize: size }}>{!props.loading ? (crypto.item.id.length > 13 ? `${crypto.item.id.slice(0, 10)}...` : crypto.item.id) : <Loading variant="text" h={20} wxs={40} wmd={40} />}</TableCell>
        <TableCell sx={{ borderBottom: 0 }}>{!props.loading ? (crypto.item.market_cap_rank) : <Loading variant="text" h={20} wxs={20} wmd={20} />}</TableCell>
      </TableRow>
    ))
  );
};

function CryptoArray(props) {
  const { cryptos, loading } = props;

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'neutral.main', borderRadius: '10px' }}>
      <Table size="small" aria-label="a dense table">
        <TableHead sx={{ backgroundColor: 'secondary.dark' }}>
          <TableRow>
            <TableCell />
            <TableCell>Nom</TableCell>
            <TableCell>Rang</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <CryptoMap cryptos={cryptos} loading={loading} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CryptoArray.propTypes = {
  loading: PropTypes.bool.isRequired,
  cryptos: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

CryptoArray.defaultProps = {
  cryptos: [],
};

export default function TopFlop({ pixelRatio }) {
  const { list: cryptos } = useSelector((state) => state.cryptos.cryptoTrend);
  return (
    <Container disableGutters sx={{ borderRadius: '10px', height: 'auto', marginBottom: 2 }}>
      <Container sx={{
        display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center',
      }}
      >
        <WhatshotIcon sx={{ color: 'secondary.dark' }} /><Typography sx={{ fontWeight: 'bold', color: 'primaryTextColor.main' }}>Trending Cryptos</Typography>
      </Container>
      <Container sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflowY: 'auto',
        justifyContent: 'center',
      }}
      >
        {cryptos.coins?.length > 0 ? (
          <CryptoArray loading={false} cryptos={cryptos} pixelRatio={pixelRatio} />
        ) : (
          <CryptoArray loading pixelRatio={pixelRatio} />
        )}
      </Container>
    </Container>
  );
}

TopFlop.propTypes = {
  pixelRatio: PropTypes.number.isRequired,
};
