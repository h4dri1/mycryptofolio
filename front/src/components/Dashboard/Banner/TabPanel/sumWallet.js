import { Typography } from '@mui/material';
import nFormatter from '../../../../services/nFormatter';

export default function SumWallet(props) {
  const { show, cryptoSym, wallet } = props;
  return (
    <Typography
      variant="h4"
      color="white"
      sx={{ fontWeight: 'bold', marginLeft: 2 }}
    >
      {show ? `${cryptoSym}${nFormatter(wallet.sum, 2)}` : '* * * * *'}
    </Typography>
  );
}
