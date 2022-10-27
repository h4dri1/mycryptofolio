import { PropTypes } from 'prop-types';
import { Fragment, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toggleLoginModal } from 'src/actions/settings';

import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';
import Info from 'src/components/Info';

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
    } else if (logged && location.search == '?continue=/watchlist') {
      navigate('/watchlist');
    }
  }, [logged]);

  return (
    <Fragment>
      <TopBanner />
      <Navbar />
      <Info />
      <Footer />
    </Fragment>
  );
}

Home.defaultProps = {
  displayLogin: false,
};

Home.propTypes = {
  displayLogin: PropTypes.bool,
};
