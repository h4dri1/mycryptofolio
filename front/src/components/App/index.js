// == Import
import Home from 'src/pages/Home';
import Login from 'src/components/Login';
import Footer from 'src/components/Footer';

const loginDisplay = true;

// == Composant
const App = () => (
  <div className="app">
    <Home />
    {loginDisplay && <Login />}
  </div>
);

// == Export
export default App;
