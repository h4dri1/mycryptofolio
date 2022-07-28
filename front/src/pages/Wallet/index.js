import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import Wallet from 'src/components/Wallet';
import Footer from 'src/components/Footer';

import { useSelector } from 'react-redux';

export default function ProfilPage() {

    const { logged } = useSelector((state) => state.user);

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
