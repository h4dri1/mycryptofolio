import Login from 'src/components/Login';
import { useSelector } from 'react-redux';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material';

export default function MyAccount() {

    // // handle to open and close login modal
    // // TODO: @Gregory-Tannier : to transfer this handle to "Mon Compte" Button in MyAccount component
    // const handleToggleLoginModal = () => {
    //     dispatch(toggleLoginModal());
    // }

    const logged = useSelector((state) => state.user.logged);

    // TODO Greg: faire une ternaire en fonction du state connecté ou pas
    const isLogged = logged ? 'avatar-visible' : 'avatar-hidden';;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login());
    };

    return (
        // If connected = display the avatar
        // If NOT connected = display the button MON COMPTE to access LOGIN
        <div>
            {!logged && <Login />}
            {logged && <><Avatar src="/broken-image.jpg" />Bienvenue</>}
        </div>
    );
}
