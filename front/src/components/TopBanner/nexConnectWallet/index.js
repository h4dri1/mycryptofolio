import MetaMaskOnboarding from '@metamask/onboarding';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

const ONBOARD_TEXT = 'Install MetaMask!';
const CONNECT_TEXT = 'Connect';

const miniAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

const walletsStorage = (accounts) => {
  if (localStorage.getItem('wallet') !== accounts[0]) {
    localStorage.setItem('wallet', accounts[0]);
  }
};

const walletsObject = (wallets) => {
  const walletList = [];
  wallets.map((wallet) => walletList.push({ address: wallet }));
  return walletList;
};

export default function OnboardingButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [wallets, setWallets] = useState([]);
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(miniAddress(accounts[0]));
        setIsConnected(true);
        onboarding.current.stopOnboarding();
      }
      else {
        setIsConnected(false);
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('wallets', JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      window.ethereum
        .request({ method: 'wallet_getPermissions' })
        .then((walletsList) => {
          setWallets(walletsObject(walletsList[0]?.caveats[0].value));
        });
      if (newAccounts.length > 0) {
        walletsStorage(newAccounts);
      }
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'wallet_getPermissions' })
        .then((walletsList) => {
          setWallets(walletsObject(walletsList[0]?.caveats[0].value));
        });
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (isConnected) {
      navigate('/wallet');
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts), localStorage.setItem('wallets', JSON.stringify(wallets)), (err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            import('../../../actions/settings')
              .then((display) => dispatch(display.setDisplaySnackBar({ severity: 'error', message: 'Please connect to Metamask' })));
          }
          else {
            console.error(err);
          }
        });
    }
    else {
      onboarding.current.startOnboarding();
      setDisabled(true);
    }
  };
  return (
    <Button style={{ fontSize: '0.7em' }} sx={{ height: 28, width: 150, color: 'primary.main' }} variant="outlined" disabled={isDisabled} onClick={onClick}>
      {buttonText}
    </Button>
  );
}
