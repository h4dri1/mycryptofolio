import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'
import { useSelector } from 'react-redux';

  const avatarStyle = {
    border: "2px solid #7932a8",
    boxShadow: 20,
    mt: 3, width: 150, height: 150 
  };

export default function AvatarP() {
    const avatarS = avatarStyle;

    const { avatar } = useSelector((state) => state.user);

    return (
        <IconButton>
            <Avatar
                alt="photo-avatar"
                src={avatar}
                sx={avatarS}
            />
        </IconButton>
    );
}