const onClickConnect = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    await ethereum.request({ method: 'eth_requestAccounts' });
  }
  catch (error) {
    console.error(error);
  }
};

export default onClickConnect;
