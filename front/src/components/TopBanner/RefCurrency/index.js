import { MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';

// export default function SelectAutoWidth() {
export default function RefCurrency() {
  const { logged } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.cryptos.cryptoList.selectedCurrency);
  const { days, data } = useSelector((state) => state.cryptoDetails);
  const navigate = useNavigate();

  const handleChange = (event) => {
    import('../../../actions/cryptos')
      .then((module) => dispatch(module.updateCurrency(event.target.value)));
    if (logged && location.pathname.split('/')[1] === 'portfolio') {
      import('../../../actions/portfolio')
        .then((module) => {
          dispatch(module.fetchPortfolio());
          navigate('/portfolio');
        });
    }
    if (location.pathname.split('/')[1] === 'crypto') {
      import('../../../actions/cryptoDetails')
        .then((module) => dispatch(module.fetchCryptoData(data.id, days)));
    }
    if (location.pathname.split('/')[1] === 'wallet') {
      import('../../../actions/metamask')
        .then((module) => dispatch(module.getCurrentAccount()));
    }
  };

  return (
    <div>
      <Select
        sx={{
          m: 2,
          border: 0,
          color: 'primary.main',
          fontSize: '0.8rem',
          height: '32px',
        }}
        component="div"
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={selected}
        onChange={handleChange}
        autoWidth
      >
        {/* <MenuItem value="USD"></MenuItem> */}
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
        <MenuItem value="BTC">BTC</MenuItem>
        <MenuItem value="ETH">ETH</MenuItem>
      </Select>
    </div>

  );
}
