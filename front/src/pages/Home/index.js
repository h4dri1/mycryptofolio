import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoList from 'src/components/CryptoList';

export default function Home() {
  return (
    <div className="">
        <TopBanner />
        <Navbar />
        <CryptoList />
    </div>
  );
}
