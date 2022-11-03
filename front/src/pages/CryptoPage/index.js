import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoDetails from 'src/components/CryptoDetails';
import Footer from 'src/components/Footer';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCryptoData } from 'src/actions/cryptoDetails';
import { fetchFavoriteCryptos } from '../../actions/favorite';
import { useEffect } from 'react';

export default function CryptoPage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { logged } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCryptoData(slug, 1));
  }, [slug]);

  useEffect(() => {
    if (logged) {
      dispatch(fetchFavoriteCryptos());
    }
  }, [logged]);

  return (
    <>
      <TopBanner />
      <Navbar />
      <CryptoDetails />
      <Footer />
    </>

  );
}
