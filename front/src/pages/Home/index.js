import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCryptos } from 'src/actions/cryptos';

import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoList from 'src/components/CryptoList';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCryptos());
  }, []);

  return (
    <div className="">
        <TopBanner />
        <Navbar />
        <CryptoList />
    </div>
  );
}
