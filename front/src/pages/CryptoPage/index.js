import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import CryptoDetails from 'src/components/CryptoDetails';

export default function CryptoPage() {

    // const { crypto } = useSelector((state) => state.cryptoDetails);
    // console.log(crypto);

    return (
        <div className="">
            <TopBanner />
            <Navbar />
            <CryptoDetails />
        </div>
    );
}
