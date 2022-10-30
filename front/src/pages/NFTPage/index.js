import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import NFTList from 'src/components/NFTList';
import Footer from 'src/components/Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getNFTList } from '../../actions/cryptos';

export default function NFTPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNFTList());
  }, []);

  return (
    <>
      <TopBanner />
      <Navbar />
      <NFTList />
      <Footer />
    </>
  );
}
