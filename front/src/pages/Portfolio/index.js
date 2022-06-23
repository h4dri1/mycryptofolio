import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import Dashboard from 'src/components/Dashboard';
import Footer from 'src/components/Footer';

import { useSelector } from 'react-redux';

export default function Portfolio() {
  const { logged } = useSelector((state) => state.user);

  return (
    <div className="">
      <TopBanner />
      <Navbar />
      <Dashboard logged={logged}/>
      <Footer />
    </div>
  );
}
