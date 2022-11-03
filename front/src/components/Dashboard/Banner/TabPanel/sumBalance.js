import { Typography } from '@mui/material';
import nFormatter from '../../../../services/nFormatter';

export default function SumBalance(props) {
  const { show, cryptoSym, performance } = props;
  return (
    <Typography
      variant="h4"
      color="white"
      sx={{ fontWeight: 'bold', marginLeft: 2 }}
    >
      {show ? `${cryptoSym}${nFormatter(performance?.actual_value, 2)}` : '* * * * *'}
    </Typography>
  );
}
