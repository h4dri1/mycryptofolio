import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchFavoriteCryptos } from 'src/actions/favorite';

import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoList from 'src/components/CryptoList';
import Footer from 'src/components/Footer';

export default function MarketPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { logged } = useSelector((state) => state.user);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (logged) {
      dispatch(fetchFavoriteCryptos());
    }
    if (logged && location.search === '?continue=/addfav') {
      setShowTutorial(true);
    }
  }, [logged]);

  return (
    <>
      <TopBanner />
      <Navbar />
      <CryptoList showTutorial={showTutorial} />
      <Footer />
    </>
  );
}
