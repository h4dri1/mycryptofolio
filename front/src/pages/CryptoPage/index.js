import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoDetails from 'src/components/CryptoDetails';
import cryptoDetails from 'src/reducers/cryptoDetails';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CryptoPage() {

    const { slug } = useParams();
    const params = useParams();
    console.log(params);

    // const crypto = useSelector((state) => state.cryptoDetails, slug);
    // const crypto = useSelector((state) => getDescription(state.cryptoDetails, slug));
    const { crypto } = useSelector((state) => state.cryptoDetails);
    console.log(crypto);
    console.log(slug);

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
