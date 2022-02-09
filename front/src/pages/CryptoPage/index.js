import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoDetails from 'src/components/CryptoDetails';
import Footer from 'src/components/Footer';

export default function CryptoPage() {
  return (
    <div className="">
      <TopBanner />
      <Navbar />
      <CryptoDetails />
      <Footer />
    </div>
  );
}
