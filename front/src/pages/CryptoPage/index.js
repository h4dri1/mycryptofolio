import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoDetails from 'src/components/CryptoDetails';
import Footer from 'src/components/Footer';
import { Fragment } from 'react';

export default function CryptoPage() {
  return (
    <Fragment>
      <TopBanner />
      <Navbar />
      <CryptoDetails />
      <Footer />
    </Fragment>

  );
}
