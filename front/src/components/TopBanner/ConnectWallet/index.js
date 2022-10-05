import { Select, MenuItem, FormControl } from '@mui/material';
import { getConnectAccount, getCurrentAccount } from '../../../actions/metamask';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function ConnectWallet(wallet, wallets) {
    const dispatch = useDispatch()
    const location = useLocation();
    
    const handleChange = (event) => {
        dispatch(getCurrentAccount([event.target.value]));
    }

    const onClick = () => {
        if (wallet.wallet.walletAddress === 'Wallet') {     
            dispatch(getConnectAccount())
        }
    };

    useEffect(() => {
        if (wallet.wallet.walletAddress !== 'Wallet' && location.pathname.split('/')[1] === 'wallet') {
            dispatch(getCurrentAccount())
        }
    },[])

    return (
        <>
        <FormControl size="small"> 
        <Select
            variant='outlined'
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
            sx={{
                m: 0.5,
                border: 0,
                color: 'primary.main',
                fontSize: '0.8rem',
                height: '32px'
            }}
      >
        {wallet.wallets ? wallet.wallets.map((wal, index) => {
            return (
                <MenuItem value={wal.address} key={index}>
                    {
                        wal.name && Number(wallet.wallet.walletNetwork) === 1 ? wal.name : `${wal.address.substring(0,6)}...${wal.address.substring(wal.address.length - 4)}`
                    }
                </MenuItem>
            );
        }) : 
            <MenuItem value="">Wallet</MenuItem>
        }
      </Select>
      </FormControl>
      
        </>
    )
}