import { MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCryptoList, updateCurrency } from 'src/actions/cryptos';
import { fetchPortfolio } from 'src/actions/portfolio';
import { fetchCryptoData } from 'src/actions/cryptoDetails';

import {useLocation, useNavigate } from 'react-router-dom'

// export default function SelectAutoWidth() {
export default function RefCurrency() {
  const { logged } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.cryptos.cryptoList.selectedCurrency);
  const { days, data } = useSelector((state) => state.cryptoDetails);
  const { walletAddress } = useSelector((state) => state.wallet);
  const wallet = useSelector((state) => state.portfolio.wallet);
  const navigate = useNavigate();

  const handleChange = (event) => {
    dispatch(updateCurrency(event.target.value));
    if (logged && location.pathname.split('/')[1] === 'portfolio') {
      dispatch(fetchPortfolio());
      navigate('/portfolio');
    }
    if (location.pathname.split('/')[1] === 'crypto') {
      dispatch(fetchCryptoData(data.id, days));
    }
    dispatch(getCryptoList());
    //if (walletAddress) {
    //  dispatch(getWalletAddress());
    //  dispatch(getWalletBalance());
    //  dispatch(getWalletENS());
    //}
  };

  return (
    <div>
      <Select
        sx={{
          m: 2,
          border: 0,
          color: 'secondary.main',
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
