// == Import
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/user';
import Home from 'src/pages/Home';
import Login from 'src/components/Login';
import Footer from 'src/components/Footer';
import { Button } from '@mui/material'

// == Composant
const App = () => (
  <div className="app">
    <Home />
  </div>
);

// == Export
export default App;
