/* eslint-disable max-len */
import { useDispatch } from 'react-redux';

import { LoadingButton } from '@mui/lab';

import {
  Box,
} from '@mui/material';

import { getMoreCryptos } from '../../actions/cryptos';

export default function MoreCryptosButton(props) {
  const { cryptoListLoading } = props;
  const dispatch = useDispatch();

  const handleDispatchMoreCryptos = () => {
    dispatch(getMoreCryptos());
  };

  return (
    <Box>
      <LoadingButton
        variant="outlined"
        sx={{
          mt: 2, mb: 7, color: 'primary.light', borderColor: 'primary.light',
        }}
        loading={cryptoListLoading}
        onClick={handleDispatchMoreCryptos}
      >
        Charger plus de cryptos
      </LoadingButton>
    </Box>
  );
}
