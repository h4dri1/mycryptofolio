// == Import : npm
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from 'src/actions';
// == Import : local
import './styles.css';

// == Composant
const Counter = () => {
  const { value } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const dispatchIncrement = () => {
    dispatch(increment());
  };

  const dispatchDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div className="counter">
      <button type="button" onClick={dispatchDecrement}>⇩</button>
      <div className="value">{value}</div>
      <button type="button" onClick={dispatchIncrement}>⇧</button>
    </div>
  );
};

// == Export
export default Counter;
