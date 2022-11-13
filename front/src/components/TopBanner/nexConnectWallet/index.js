import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const miniAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

function ConnectButton() {
  const [textButton, setTextButton] = useState('Connect');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setTextButton(miniAddress(accounts[0]));
        }
        else {
          setTextButton('Connect');
        }
      });
    }
  }, []);

  const click = () => {
    if (textButton === 'Install MetaMask') {
      import('../../../metamask/install')
        .then((module) => module.default());
    }
    if (import('../../../metamask/initialize')
      .then((install) => install.default()) === 'Install MetaMask' && textButton === 'Connect') {
      setTextButton('Install MetaMask');
    }
    if (textButton === 'Connect') {
      import('../../../metamask/connect')
        .then((connect) => connect.default());
    }
  };

  return (
    <Button
      variant="outlined"
      sx={{ height: 28, width: 150, color: 'primary.main' }}
      style={{ fontSize: '0.7em' }}
      onClick={click}
    >
      {textButton}
    </Button>
  );
}

export default function ConnectWallet() {
  return (
    <ConnectButton />
  );
}
