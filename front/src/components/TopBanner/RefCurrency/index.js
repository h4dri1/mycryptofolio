import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { useDispatch } from 'react-redux';
import { getCryptoList } from '../../../actions/cryptos';

// export default function SelectAutoWidth() {
export default function RefCurrency() { 
  const disptach = useDispatch()

  const currency = localStorage.getItem('currency');
  if (!currency) {
    var [cur, setCur] = React.useState('USD');
    localStorage.setItem('currency', 'USD')
  } else {
    var [cur, setCur] = React.useState(currency);
  }

  const handleChange = (event) => {
    setCur(event.target.value);
    localStorage.setItem('currency', event.target.value);
    disptach(getCryptoList());
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
        value={cur}
        onChange={(event) => {handleChange(event);}}
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
