import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import Profil from 'src/components/Profil';
import Footer from 'src/components/Footer';

import { useSelector } from 'react-redux';
import { Fragment } from 'react';

export default function ProfilPage() {

    const { logged } = useSelector((state) => state.user);

    return (
        <Fragment>
            <TopBanner />
            <Navbar />
            <Profil logged={logged}/>
            <Footer />
        </Fragment>
    );
}
