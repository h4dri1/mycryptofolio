import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import Profil from 'src/components/Profil';
import Footer from 'src/components/Footer';

import { useSelector } from 'react-redux';

export default function ProfilPage() {

    const { logged } = useSelector((state) => state.user);

    return (
        <>
            <div className="">
                <TopBanner />
                <Navbar />
                <Profil logged={logged}/>
                <Footer />
            </div>
        </>
    );
}
