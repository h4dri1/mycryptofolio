import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import Wallet from 'src/components/Wallet';
import Footer from 'src/components/Footer';
import { Fragment } from 'react';

export default function WalletPage() {

    return (
        <Fragment>
            <TopBanner />
            <Navbar />
            <Wallet />
            <Footer />
        </Fragment>
    );
}
