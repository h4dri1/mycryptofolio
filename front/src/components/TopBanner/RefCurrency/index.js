import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// export default function SelectAutoWidth() {
export default function RefCurrency() {
    const [cur, setCur] = React.useState('USD');

    const handleChange = (event) => {
        setCur(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 70 }}>
                <Select
                    component='div'
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={cur}
                    onChange={handleChange}
                    autoWidth
                >
                    <MenuItem value="USD">
                    </MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="BTC">BTC</MenuItem>
                    <MenuItem value="ETH">ETH</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
