import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCryptos } from 'src/actions/cryptos';

import { toggleLoginModal } from 'src/actions/settings';

import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoList from 'src/components/CryptoList';

export default function Home({ displayLogin }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { logged } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllCryptos());
    if (displayLogin) dispatch(toggleLoginModal());
  }, []);

  useEffect(() => {
    if (logged && location.search === '?continue=/portfolio') {
      navigate('/portfolio');
    }
  }, [logged]);

  return (
    <div className="">
      <TopBanner />
      <Navbar />
      <CryptoList />
    </div>
  );
}

Home.defaultProps = {
  displayLogin: false,
};

Home.propTypes = {
  displayLogin: PropTypes.bool,
};
