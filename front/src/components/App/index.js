// == Import
import Home from 'src/pages/Home';
import Portfolio from 'src/pages/Portfolio';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { getAllCryptos } from 'src/actions/cryptos';

// == Composant
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCryptos());
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />}>
          <Route path="/portfolio/:portfolioName" element={<Portfolio />} />
        </Route>
      </Routes>
    </div>
  );
};

// == Export
export default App;
