import { useSelector } from 'react-redux';
import LoginRegister from 'src/components/LoginRegister';
import { login, register } from 'src/actions/user';
import AvatarIcon from './AvatarIcon';
import { Avatar, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { setDisplaySnackBar } from 'src/actions/settings';
import { useDispatch } from 'react-redux';

export default function MyAccount() {

  const { logged, existingUser, verify } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    // If connected = display the avatar
    // If NOT connected = display the button MON COMPTE to access LOGIN
    <div>
      {!logged && (existingUser ? <LoginRegister type="login" handleFormSubmit={login} /> : <LoginRegister type="register" handleFormSubmit={register} />)}
      {(logged && verify) && <AvatarIcon />}
    </div>
  );
}
