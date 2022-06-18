import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import ForgotPass from 'src/components/ForgotPass';
import Footer from 'src/components/Footer';

import { useSelector } from 'react-redux';

export default function ProfilPage() {

    return (
        <>
            <div className="">
                <TopBanner />
                <Navbar />
                <ForgotPass/>
                <Footer />
            </div>
        </>
    );
}
