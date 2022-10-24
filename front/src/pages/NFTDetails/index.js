import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import NFTDetails from 'src/components/NFTDetails';
import Footer from 'src/components/Footer';
import { Fragment } from 'react';

export default function CryptoPage() {
  return (
    <Fragment>
      <TopBanner />
      <Navbar />
      <NFTDetails />
      <Footer />
    </Fragment>
  );
}
