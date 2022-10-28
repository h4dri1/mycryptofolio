import { PropTypes } from 'prop-types';
import { Fragment, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';
import Info from 'src/components/Info';
import { toggleLoginModal } from '../../actions/settings';

export default function Home({ displayLogin }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (displayLogin) dispatch(toggleLoginModal(true));
  }, []);

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
