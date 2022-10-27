import TopBanner from 'src/components/TopBanner';
import Navbar from 'src/components/Navbar';
import WatchList from 'src/components/WatchList';
import Footer from 'src/components/Footer';

import { useSelector } from 'react-redux';
import { Fragment } from 'react';

export default function WatchListPage() {
    const { logged } = useSelector((state) => state.user);

    return (
        <Fragment>
            <TopBanner />
            <Navbar />
            <WatchList logged={logged}/>
            <Footer />
        </Fragment>
    );
}
