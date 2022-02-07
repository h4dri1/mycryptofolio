import { useSelector } from 'react-redux';
import LoginRegister from 'src/components/LoginRegister';
import { login, register } from 'src/actions/user';
import AvatarIcon from './AvatarIcon';

export default function MyAccount() {

  const { logged, existingUser } = useSelector((state) => state.user);

  return (
    // If connected = display the avatar
    // If NOT connected = display the button MON COMPTE to access LOGIN
    <div>
      {!logged && (existingUser ? <LoginRegister type="login" handleFormSubmit={login} /> : <LoginRegister type="register" handleFormSubmit={register} />)}
      {logged && <AvatarIcon />}
    </div>
  );
}
