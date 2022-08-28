import { Button, Box, useMediaQuery, Select, MenuItem } from '@mui/material';
import { getWalletENS } from '../../../actions/wallet';
import { getChainId, getConnectAccount, getCurrentAccount, getWalletBalance } from '../../../actions/metamask';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ConnectWallet(wallet, wallets) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const hide500 = useMediaQuery('(max-width:600px)');
    const location = useLocation();

    const [value, setValue] = useState(wallet.wallet.walletAddress);
    
    const handleChange = (event) => setValue(event.target.value);

    const onClick = () => {
        if (wallet.wallet.walletAddress === 'Wallet') {     
            dispatch(getConnectAccount())
        } else {
            navigate('/wallet')
        }
    };

    useEffect(() => {
        if (wallet.wallet.walletAddress !== 'Wallet' && location.pathname.split('/')[1] !== 'wallet') {
            dispatch(getCurrentAccount())
        }
        if (value !== wallet.wallet.walletAddress) {
            setValue(wallet.wallet.walletAddress)
        }
    },[])

    return (
        <>
        <Select
            fullWidth
            id="followers"
            labelId="followersL"
            margin="dense"
            displayEmpty
            name="followers"
            onChange={handleChange}
            value={value}
            variant="outlined"
      >
        {wallet.wallets && wallet.wallets.map((wal) => {
            return (
                <MenuItem value={wal} key={wal}>
                    {wal}
                </MenuItem>
            );
        })}
      </Select>
        <Button onClick={onClick} variant="outlined" sx={{ fontSize: {xs: '0.5em', md: '0.7em'}, margin: '5px', width: { xs: '75px', md: '140px' } }}>
            {wallet.wallet.walletAddress === 'Wallet' ? `${wallet.wallet.walletAddress}` : wallet.wallet.walletENS !== '' && wallet.wallet.walletENS !== undefined ? `${wallet.wallet.walletENS}` : `${wallet.wallet.walletAddress.substring(0, 6)}...${ !hide500 ? wallet.wallet.walletAddress.substring(38, 42) : ''}`}
            <Box sx={{width: 18, height: 18, borderRadius: '50%', marginLeft: 1}} component={'img'} src={Number(wallet.wallet.walletNetwork) === 137 ? "https://cdn-icons-png.flaticon.com/512/7016/7016537.png" : "https://cdn-icons-png.flaticon.com/512/7016/7016523.png" }/>
        </Button>
        </>
    )
}