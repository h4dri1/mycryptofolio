import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import ForgotPass from 'src/components/ForgotPass';
import Footer from 'src/components/Footer';

import { useSelector } from 'react-redux';
import { Fragment } from 'react';

export default function ForgotPassword() {

    return (
        <Fragment>
            <TopBanner />
            <Navbar />
            <ForgotPass />
            <Footer />
        </Fragment>
    );
}
