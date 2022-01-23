import { useSelector } from 'react-redux';
import * as React from 'react';
import Login from 'src/components/Login';
import TestAvatar from './TestAvatar';

export default function MyAccount() {

    // // handle to open and close login modal
    // // TODO: @Gregory-Tannier : to transfer this handle to "Mon Compte" Button in MyAccount component
    // const handleToggleLoginModal = () => {
    //     dispatch(toggleLoginModal());
    // }

    const logged = useSelector((state) => state.user.logged);

    return (
        // If connected = display the avatar
        // If NOT connected = display the button MON COMPTE to access LOGIN
        <div>
            {!logged && <Login />}
            {logged && <TestAvatar />}
        </div>
    );
}
