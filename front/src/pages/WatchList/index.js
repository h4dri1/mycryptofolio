import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import WatchList from 'src/components/WatchList';
import Footer from 'src/components/Footer';
import Home from 'src/pages/Home';

import { useSelector } from 'react-redux';

export default function WatchListPage() {
  const { logged } = useSelector((state) => state.user);

  return (
    logged ? (
      <>
        <TopBanner />
        <Navbar />
        <WatchList logged={logged} />
        <Footer />
      </>
    ) : (
      <Home displayLogin />
    )
  );
}
