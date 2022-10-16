import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import Wallet from 'src/components/Wallet';
import Footer from 'src/components/Footer';

export default function WalletPage() {

    return (
        <>
            <div className="">
                <TopBanner />
                <Navbar />
                <Wallet />
                <Footer />
            </div>
        </>
    );
}
