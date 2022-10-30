import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import Wallet from 'src/components/Wallet';
import Footer from 'src/components/Footer';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getConnectAccount, getCurrentAccount } from '../../actions/metamask';

export default function WalletPage() {
  const dispatch = useDispatch();
  const { walletAddress } = useSelector((state) => state.wallet);



  return (
    <>
      <TopBanner />
      <Navbar />
      <Wallet />
      <Footer />
    </>
  );
}
