// == Import
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/user';
import Home from 'src/pages/Home';
import Login from 'src/components/Login';
import Footer from 'src/components/Footer';
import { Button } from '@mui/material'

const loginDisplay = true;


// == Composant
const App = () => {

  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout())
  };

  return (
    <div className="app">
      <Home />
      {loginDisplay && <Login />}
      <Button onClick={handleLogout} variant='contained' color='error'>Déconnexion</Button>
    </div>
  );
}

// == Export
export default App;
