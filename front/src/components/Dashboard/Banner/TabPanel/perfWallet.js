/* eslint-disable max-len */
import {
  Typography,
  Box,
} from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const perfPercentage = (performance) => {
  const percent = (((performance.actual_value - performance.investment) / performance.investment) * 100).toFixed(2);
  const perf = Number.isNaN(percent) ? 0 : percent;
  return perf;
};

export default function PerfWallet(props) {
  const {
    performance, change, clickChange, selectedCurrency,
  } = props;

  const handleClickChange = () => clickChange();

  return (
    performance.actual_value !== 0 ? (
      <Box sx={{
        display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'center',
      }}
      >
        {Number(performance.actual_value) > Number(performance.investment) && <ArrowCircleUpIcon onClick={handleClickChange} color="success" sx={{ cursor: 'pointer', height: '30px', width: '30px' }} />}
        {Number(performance.actual_value) < Number(performance.investment) && <ArrowCircleDownIcon onClick={handleClickChange} color="error" sx={{ cursor: 'pointer', height: '30px', width: '30px' }} />}
        <Typography
          variant="h6"
          color="custom.main"
          onClick={handleClickChange}
          sx={{ cursor: 'pointer', marginRight: { xs: 0, md: 1 } }}
        >
          {Number(performance.actual_value) > Number(performance.investment) ? '+' : ''}{Intl.NumberFormat('en-US', {
            style: 'decimal',
            maximumSignificantDigits: 4,
            minimumSignificantDigits: 2,
          }).format(change === 'percent' ? perfPercentage(performance) : performance.pnl)}{change === 'percent' ? '%' : selectedCurrency}
        </Typography>
      </Box>
    ) : (
      null
    ));
}
