import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import WatchList from 'src/components/WatchList';
import Footer from 'src/components/Footer';
import Home from 'src/pages/Home';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchFavoriteCryptos } from 'src/actions/favorite';
import { getAllCryptos } from '../../actions/cryptos';

export default function WatchListPage() {
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.user);

  useEffect(() => {
    if (logged) {
      dispatch(fetchFavoriteCryptos());
      dispatch(getAllCryptos());
    }
  }, [logged]);

  return (
    logged ? (
      <>
        <TopBanner />
        <Navbar />
        <WatchList />
        <Footer />
      </>
    ) : (
      <Home displayLogin />
    )
  );
}
