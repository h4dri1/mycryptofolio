// == Import
import reactLogo from './react-logo.svg';
import './styles.css';

import Counter from '../Counter';

// == Composant
const App = () => (
  <div className="app">
    <img src={reactLogo} alt="react logo" />
    <h1>Composant : App</h1>
    <Counter />
  </div>
);

// == Export
export default App;
