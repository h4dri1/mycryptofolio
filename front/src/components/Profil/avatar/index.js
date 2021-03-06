import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { change_avatar, saveUser } from '../../../actions/user';

import axios from 'axios';



export default function AvatarP() {

    const uploadInputRef = useRef(null);

    const dispatch = useDispatch();

    const { avatar } = useSelector((state) => state.user);

    const { darkMode } = useSelector((state) => state.settings);

    const avatarStyle = {
      border: darkMode ? "2px solid #07f3d5" : "2px solid #7932a8",
      boxShadow: 20,
      mt: 3, width: 150, height: 150 
    };

    const avatarS = avatarStyle;

    const handleChange = (event) => {
      event.preventDefault();
      const file = {
        avatar: event.target.files[0]
      }
      dispatch(change_avatar(file));
    }

    return (
      <Fragment>
      <input
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
        <IconButton onClick={() => uploadInputRef.current && uploadInputRef.current.click()} variant="contained">
            <Avatar
                alt="photo-avatar"
                src={avatar}
                sx={avatarS}
            />
        </IconButton>
      </Fragment>
    );
}