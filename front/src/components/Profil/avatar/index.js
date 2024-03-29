import { Avatar, IconButton } from '@mui/material';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change_avatar } from '../../../actions/user';

export default function AvatarP() {
  const uploadInputRef = useRef(null);

  const dispatch = useDispatch();

  const { avatar } = useSelector((state) => state.user);

  const { darkMode } = useSelector((state) => state.settings);

  const avatarStyle = {
    border: darkMode ? '2px solid #07f3d5' : '2px solid #7932a8',
    boxShadow: 20,
    mt: 3,
    width: 150,
    height: 150,
  };

  const avatarS = avatarStyle;

  const handleChange = (event) => {
    event.preventDefault();
    const file = {
      avatar: event.target.files[0],
    };
    dispatch(change_avatar(file));
  };

  return (
    <>
      <input
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <IconButton onClick={() => uploadInputRef.current && uploadInputRef.current.click()} variant="contained">
        <Avatar
          alt="photo-avatar"
          src={avatar}
          sx={avatarS}
        />
      </IconButton>
    </>
  );
}
