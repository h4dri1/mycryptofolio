import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import WatchList from 'src/components/WatchList';
import Footer from 'src/components/Footer';

import { useSelector } from 'react-redux';

export default function WatchListPage() {
    const { logged } = useSelector((state) => state.user);

    return (
        <>
            <div className="">
                <TopBanner />
                <Navbar />
                <WatchList logged={logged}/>
                <Footer />
            </div>
        </>
    );
}
