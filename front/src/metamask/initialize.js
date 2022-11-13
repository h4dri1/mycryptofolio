const isMetaMaskInstalled = () => {
  // Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

const MetaMaskClientCheck = () => {
  // Now we check to see if MetaMask is installed
  if (!isMetaMaskInstalled()) {
    // If it isn't installed we ask the user to click to install it
    const textButton = 'Install MetaMask';
    return textButton;
  }

  // If it is installed we change our button text
  const textButton = 'Connect';
  return textButton;
};

export default MetaMaskClientCheck;
