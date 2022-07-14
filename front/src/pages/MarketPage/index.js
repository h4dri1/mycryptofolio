import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box } from '@mui/material'

import { toggleLoginModal } from 'src/actions/settings';

import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoList from 'src/components/CryptoList';
import Footer from 'src/components/Footer';

export default function Home({ displayLogin }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { logged } = useSelector((state) => state.user);

  useEffect(() => {
    if (displayLogin) dispatch(toggleLoginModal());
  }, []);

  useEffect(() => {
    if (logged && location.search === '?continue=/portfolio') {
      navigate('/portfolio');
    } else if (logged && location.search == '?continue=/profil') {
      navigate('/profil');
    }
  }, [logged]);

  return (
    <div className="">
      <TopBanner />
      <Navbar />
      <CryptoList/>
      <Footer />
    </div>
  );
}

Home.defaultProps = {
  displayLogin: false,
};

Home.propTypes = {
  displayLogin: PropTypes.bool,
};
