import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import Profil from 'src/components/Profil';
import Footer from 'src/components/Footer';
import Home from 'src/pages/Home';

import { useSelector } from 'react-redux';

export default function ProfilPage() {
  const { logged } = useSelector((state) => state.user);

  return (
    logged ? (
      <>
        <TopBanner />
        <Navbar />
        <Profil logged={logged} />
        <Footer />
      </>
    ) : (
      <Home displayLogin />
    )
  );
}
