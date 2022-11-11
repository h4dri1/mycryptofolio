/* eslint-disable react/function-component-definition */
// == Import
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';

import { getCurrentAccount } from '../../actions/metamask';
import AlertMsg from '../common/AlertMessage';
import { checkToken } from '../../actions/user';

import Loading from '../Loading';
import Home from '../../pages/Home';

import Theme from '../../theming/Theme';

const CryptoPage = lazy(() => import('../../pages/CryptoPage'));
const Wallet = lazy(() => import('../../pages/Wallet'));
const Portfolio = lazy(() => import('../../pages/Portfolio'));
const NFTDetails = lazy(() => import('../../pages/NFTDetails'));
const NFTPage = lazy(() => import('../../pages/NFTPage'));
const MarketPage = lazy(() => import('../../pages/MarketPage'));
const ContactPage = lazy(() => import('../../pages/ContactPage'));
const ForgotPass = lazy(() => import('../../pages/ForgotPass'));
const ProfilPage = lazy(() => import('../../pages/ProfilPage'));
const UnknowRoute = lazy(() => import('../../pages/404'));
const WatchList = lazy(() => import('../../pages/WatchList'));

// == Composant

const App = () => {
  const dispatch = useDispatch();
  // DARK MODE

  const { walletAddress } = useSelector((state) => state.wallet);

  const theme = Theme();
  // COLOR PALETTE for LIGHT & DARK modes

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      dispatch(checkToken());
    }
  }, []);

  return (
    <div style={{ height: '100vh' }} className="app">
      <ThemeProvider theme={theme}>
        {/* <Paper> */}
        <CssBaseline enableColorScheme />
        <AlertMsg />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home displayLogin />} />
          <Route
            path="/market"
            element={(
              <Suspense fallback={<Loading />}>
                <MarketPage />
              </Suspense>
            )}
          />
          <Route
            path="/nft"
            element={(
              <Suspense fallback={<Loading />}>
                <NFTPage />
              </Suspense>
            )}
          />
          <Route
            path="/crypto/:slug"
            element={(
              <Suspense fallback={<Loading />}>
                <CryptoPage />
              </Suspense>
            )}
          />
          <Route
            path="/nft/:slug"
            element={(
              <Suspense fallback={<Loading />}>
                <NFTDetails />
              </Suspense>
            )}
          />
          <Route
            path="/wallet"
            element={(
              <Suspense fallback={<Loading />}>
                <Wallet />
              </Suspense>
            )}
          />
          <Route
            path="/portfolio"
            element={(
              <Suspense fallback={<Loading />}>
                <Portfolio />
              </Suspense>
            )}
          >
            <Route
              path="/portfolio/:walletName"
              element={(
                <Suspense fallback={<Loading />}>
                  <Portfolio />
                </Suspense>
              )}
            />
          </Route>
          <Route
            path="/contact"
            element={(
              <Suspense fallback={<Loading />}>
                <ContactPage />
              </Suspense>
            )}
          />
          <Route
            path="/profil"
            element={(
              <Suspense fallback={<Loading />}>
                <ProfilPage />
              </Suspense>
            )}
          />
          <Route
            path="/reset/:token"
            element={(
              <Suspense fallback={<Loading />}>
                <ForgotPass />
              </Suspense>
            )}
          />
          <Route
            path="/watchlist"
            element={(
              <Suspense fallback={<Loading />}>
                <WatchList />
              </Suspense>
            )}
          />
          <Route
            path="*"
            element={(
              <Suspense fallback={<Loading />}>
                <UnknowRoute />
              </Suspense>
            )}
          />
        </Routes>
        {/* </Paper> */}
      </ThemeProvider>
    </div>
  );
};

// == Export
export default App;
