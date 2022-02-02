import { useSelector } from 'react-redux';
import LoginRegister from 'src/components/LoginRegister';
import { login, register } from 'src/actions/user';
import AvatarIcon from './AvatarIcon';


export default function MyAccount() {
  // // handle to open and close login modal
  // // TODO: @Gregory-Tannier : to transfer this handle to "Mon Compte" Button in MyAccount component
  // const handleToggleLoginModal = () => {
  //     dispatch(toggleLoginModal());
  // }

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
