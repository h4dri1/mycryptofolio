// == Import
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/user';
import Home from 'src/pages/Home';
import Portfolio from 'src/pages/Portfolio';
import Login from 'src/components/Login';
import Footer from 'src/components/Footer';
import { Routes, Route } from 'react-router-dom';

// == Composant
const App = () => (
  <div className="app">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />}>
        <Route path="/portfolio/:portfolioName" element={<Portfolio />} />
      </Route>
    </Routes>
  </div>
);

// == Export
export default App;
