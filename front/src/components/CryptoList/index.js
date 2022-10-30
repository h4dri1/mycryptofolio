/* eslint-disable max-len */
import {
  useState,
  useEffect,
  lazy,
  Suspense,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCryptoList } from '../../actions/cryptos';
import { fetchFavoriteCryptos } from '../../actions/favorite';
import MainContainer from './mainContainer';

const TutoPage = lazy(() => import('./tutoPage'));

const sortArray = (arr, key, orderBy) => {
  switch (orderBy) {
    case 'desc':
      return arr.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));
    case 'asc':
      return arr.sort((a, b) => (a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0));
    default:
      return arr;
  }
};

export default function CryptoList({ favoritePage, showTutorial }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: cryptos, cryptoListLoading } = useSelector((state) => state.cryptos.cryptoList);
  const { allCryptos } = useSelector((state) => state.cryptos);
  const { logged } = useSelector((state) => state.user);
  const { favorite } = useSelector((state) => state.favorite);
  const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);

  const [orderDirection, setOrderDirection] = useState('asc');
  const [favClick, setFavClick] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(showTutorial);

  const favTable = () => {
    if (favoritePage || favClick) {
      const newCryptoList = favClick ? cryptos : allCryptos;
      // eslint-disable-next-line max-len
      return newCryptoList.filter((crypto) => favorite.cryptos.find((e) => e.coin_id === crypto.id));
    } if (showTutorial) {
      const someCryptos = cryptos.filter((_, index) => {
        if (index < 10) {
          return true;
        }
        return false;
      });
      return someCryptos;
    }
    return cryptos;
  };

  const handleToggleBackdrop = () => {
    setBackdropOpen(!backdropOpen);
  };

  const handleDisplayFav = () => {
    setFavClick(!favClick);
    favTable();
  };

  const handleSortRequest = (key) => {
    sortArray(cryptos, key, orderDirection);
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    dispatch(getCryptoList());
  }, [selectedCurrency]);

  useEffect(() => {
    if (favorite.cryptos[0]?.coin_id === 'none') {
      setBackdropOpen(showTutorial);
    }
    else if (favorite.cryptos.length > 0 && showTutorial) {
      navigate('/watchlist');
    }
  }, [showTutorial, favorite.cryptos]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {backdropOpen
        ? (
          <Suspense>
            <TutoPage
              logged={logged}
              toggleBackdrop={handleToggleBackdrop}
              favoritePage={favoritePage}
              cryptoListLoading={cryptoListLoading}
              orderDirection={orderDirection}
              sortRequest={handleSortRequest}
              cryptos={favTable(cryptos)}
              favorite={favorite}
              selectedCurrency={selectedCurrency}
              showTutorial={showTutorial}
            />
          </Suspense>
        )
        : (
          <MainContainer
            logged={logged}
            favoritePage={favoritePage}
            cryptoListLoading={cryptoListLoading}
            displayFav={handleDisplayFav}
            orderDirection={orderDirection}
            sortRequest={handleSortRequest}
            cryptos={favTable(cryptos)}
            favorite={favorite}
            selectedCurrency={selectedCurrency}
            showTutorial={showTutorial}
          />
        )}
    </>

  );
}
