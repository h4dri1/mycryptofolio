import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import Dashboard from 'src/components/Dashboard';
import Footer from 'src/components/Footer';
import Home from 'src/pages/Home';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchPortfolio } from 'src/actions/portfolio';
import { getAllCryptos } from 'src/actions/cryptos';

export default function Portfolio() {
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.user);

  useEffect(() => {
    if (logged) {
      dispatch(fetchPortfolio());
      dispatch(getAllCryptos());
    }
  }, [logged]);

  return (
    logged ? (
      <>
        <TopBanner />
        <Navbar />
        <Dashboard />
        <Footer />
      </>
    ) : (
      <Home displayLogin />
    )
  );
}
