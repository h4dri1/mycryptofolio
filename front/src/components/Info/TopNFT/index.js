import PropTypes from 'prop-types';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
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
    <Skeleton sx={{ margin: '0px 1px 0px 1px', width: { xs: wxs, md: wmd } }} variant={variant} height={h} />
  );
}

Loading.propTypes = {
  variant: PropTypes.string.isRequired,
  h: PropTypes.number.isRequired,
  wxs: PropTypes.number.isRequired,
  wmd: PropTypes.number.isRequired,
};

const NFTMap = (props) => {
  const array = !props.loading ? props.nfts : Array.from(new Array(5));

  return (
    array.map((nft, index) => (
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
                to="#"
                sx={{
                  color: 'primary.light', display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' },
                }}
              >
                <Avatar loading="lazy" src={nft.attributes.image_preview_icon_url} alt={nft.attributes.name} sx={{ width: 38, height: 38, marginLeft: 1 }} />
              </Box>
            ) : <Box sx={{ display: 'flex', alignItems: 'center', margin: { xs: ' 0 -16px', sm: '0px' } }}><Loading variant="circular" h={38} wxs={38} wmd={38} /></Box>}
        </TableCell>
        <TableCell sx={{ borderBottom: 0 }}>{!props.loading ? nft.attributes.name : <Loading variant="text" h={20} wxs={38} wmd={38} />}</TableCell>
        <TableCell sx={{ borderBottom: 0 }}>{!props.loading ? nft.attributes.unique_owners : <Loading variant="text" h={20} wxs={38} wmd={38} />}</TableCell>
      </TableRow>
    ))
  );
};

NFTMap.propTypes = {
  nfts: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
};

NFTMap.defaultProps = {
  nfts: [],
};

function NFTArray(props) {
  const { nfts, loading } = props;

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'neutral.main', borderRadius: '10px' }}>
      <Table size="small" aria-label="a dense table">
        <TableHead sx={{ backgroundColor: 'secondary.dark' }}>
          <TableRow>
            <TableCell />
            <TableCell>Nom</TableCell>
            <TableCell>Owners</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <NFTMap nfts={nfts} loading={loading} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

NFTArray.propTypes = {
  nfts: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
};

NFTArray.defaultProps = {
  nfts: [],
};

export default function TopNFT({ nfts }) {
  
  return (
    <Container disableGutters sx={{ borderRadius: '10px', height: 'auto', marginBottom: 2 }}>
      <Container sx={{
        display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center',
      }}
      >
        <InsertPhotoIcon sx={{ color: 'secondary.dark' }} />
        <Typography sx={{ fontWeight: 'bold', color: 'primaryTextColor.main' }}>Trending NFT</Typography>
      </Container>
      <Container sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflowY: 'auto',
        justifyContent: 'center',
      }}
      >
        {nfts.length > 0 ? (
          <NFTArray nfts={nfts} loading={false} />
        ) : (
          <NFTArray loading />
        )}
      </Container>
    </Container>
  );
}

TopNFT.propTypes = {
  nfts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
