import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TopBanner from '../../components/TopBanner';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Info from '../../components/Info';
import { toggleLoginModal } from '../../actions/settings';
import { getCryptoTrend, getFearGreedIndex, getNFTList, getCryptoList } from '../../actions/cryptos';
import { fetchFavoriteCryptos } from '../../actions/favorite';

export default function Home({ displayLogin }) {
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCryptoTrend());
    dispatch(getFearGreedIndex());
    dispatch(getNFTList());
    dispatch(getCryptoList());
  }, []);

  useEffect(() => {
    if (logged) {
      dispatch(fetchFavoriteCryptos());
    }
  }, [logged]);

  useEffect(() => {
    if (displayLogin) dispatch(toggleLoginModal(true));
  }, [displayLogin]);

  return (
    <>
      <TopBanner />
      <Navbar />
      <Info />
      <Footer />
    </>
  );
}

Home.defaultProps = {
  displayLogin: false,
};

Home.propTypes = {
  displayLogin: PropTypes.bool,
};
