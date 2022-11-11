export default async function switchNetwork(wallet) {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: wallet.walletNetwork !== '1' ? '0x1' : '0x89' }],
    });
  }
  catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902 || switchError.code === -32603) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x89',
              rpcUrls: ['https://rpc-mainnet.matic.network/'],
              chainName: 'Matic Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              blockExplorerUrls: ['https://polygonscan.com/'],
            },
          ],
        });
      }
      catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}
