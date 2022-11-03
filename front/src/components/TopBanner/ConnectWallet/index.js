import { Select, MenuItem, FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getConnectAccount, getCurrentAccount } from '../../../actions/metamask';

export default function ConnectWallet(props) {
    const { wallet, wallets } = props;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(getCurrentAccount([event.target.value]));
  };

  const onClick = () => {
    if (wallet.walletAddress === 'Wallet') {
      dispatch(getConnectAccount());
    }
  };

  return (
    <FormControl size="small">
      <Select
        variant="outlined"
        onOpen={onClick}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        component="div"
        id="select-wallet"
        labelId="select-wallet"
        name="wallet"
        onChange={handleChange}
        value={
                wallet.walletAddress !== 'Wallet' ? wallet.walletAddress : ''
            }
        sx={{
          m: 0.5,
          border: 0,
          color: 'primary.main',
          fontSize: '0.8rem',
          height: '32px',
        }}
      >
        {wallets ? wallets.map((wal, index) => (
          <MenuItem value={wal.address} key={index}>
            {
                        wal.name && Number(wallet.walletNetwork) === 1 ? wal.name : `${wal.address.substring(0, 6)}...${wal.address.substring(wal.address.length - 4)}`
                    }
          </MenuItem>
        ))
          : <MenuItem value="">Wallet</MenuItem>}
      </Select>
    </FormControl>
  );
}
