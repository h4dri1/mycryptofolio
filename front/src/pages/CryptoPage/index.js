import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoDetails from 'src/components/CryptoDetails';
import { useSelector } from 'react-redux';

export default function CryptoPage() {
  const { crypto } = useSelector((state) => state.cryptoDetails);

  return (
    <div className="">
      <TopBanner />
      <Navbar />
      <CryptoDetails
        key={crypto.id}
        description={crypto.description}
        symbol={crypto.symbol}
        name={crypto.name}
        slug={crypto.id}
      />
    </div>
  );
}
