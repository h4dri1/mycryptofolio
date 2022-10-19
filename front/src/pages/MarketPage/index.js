import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box } from '@mui/material'

import { toggleLoginModal } from 'src/actions/settings';

import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoList from 'src/components/CryptoList';
import Footer from 'src/components/Footer';

export default function MarketPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { logged } = useSelector((state) => state.user);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (logged && location.search === '?continue=/addfav') {
      setShowTutorial(true);
    }
  }, [logged]);

  return (
    <div className="">
      <TopBanner />
      <Navbar />
      <CryptoList showTutorial={showTutorial}/>
      <Footer />
    </div>
  );
}
