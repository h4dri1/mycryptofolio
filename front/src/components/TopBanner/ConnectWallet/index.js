import { Button, Box, useMediaQuery, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
    
    const handleChange = (event) => {
        dispatch(getCurrentAccount([event.target.value]));
        navigate('/wallet')
    }

    const onClick = () => {
        if (wallet.wallet.walletAddress === 'Wallet') {     
            dispatch(getConnectAccount())
        }
    };

    useEffect(() => {
        if (wallet.wallet.walletAddress !== 'Wallet' && location.pathname.split('/')[1] !== 'wallet') {
            dispatch(getCurrentAccount())
        }
    },[])

    return (
        <>
        <FormControl sx={{ minWidth: 120 }} size="small"> 
        <Select
            onOpen={onClick}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            component="div"
            id="select-wallet"
            labelId="select-wallet"
            name="wallet"
            onChange={handleChange}
            value={
                wallet.wallet.walletAddress !== 'Wallet' ? wallet.wallet.walletAddress : ''
            }
            sx={{m: 0.5,
                border: 0,
                color: 'secondary.main',
                fontSize: '0.8rem',
                height: '32px',}}
      >
        {wallet.wallets ? wallet.wallets.map((wal, index) => {
            return (
                <MenuItem value={wal.address} key={index}>
                    {
                        wal.name ? wal.name : `${wal.address.substring(0,6)}...${wal.address.substring(wal.address.length - 4)}`
                    }
                </MenuItem>
            );
        }) : 
            <MenuItem value="">Wallet</MenuItem>
        }
      </Select>
      </FormControl>
      <Box sx={{width: 22, height: 22, borderRadius: '50%', marginLeft: 1}} component={'img'} src={Number(wallet.wallet.walletNetwork) === 137 ? "https://cdn-icons-png.flaticon.com/512/7016/7016537.png" : "https://cdn-icons-png.flaticon.com/512/7016/7016523.png" }/>
        </>
    )
}