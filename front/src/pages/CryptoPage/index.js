import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoDetails from 'src/components/CryptoDetails';
import cryptoDetails from 'src/reducers/cryptoDetails';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CryptoPage() {

    const { slug } = useParams();
    // const crypto = useSelector((state) => state.cryptoDetails, slug);
    const crypto = useSelector((state) => cryptoDetails(state.cryptoDetails, slug));
    console.log(crypto);

    return (
        <div className="">
            <TopBanner />
            <Navbar />
            <CryptoDetails
                description={crypto.description}
                symbol={crypto.symbol}
                name={crypto.name}
            />
        </div>
    );
}
