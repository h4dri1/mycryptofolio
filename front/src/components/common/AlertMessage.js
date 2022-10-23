import { Snackbar, Alert, Link } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import { setDisplaySnackBar } from 'src/actions/settings';

export default function AlertMsg() {
  const dispatch = useDispatch();
  const { open, severity, message, link } = useSelector((state) => state.settings.alert);

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={() => dispatch(setDisplaySnackBar())}
      >
        <Alert severity={severity}>
          {link && (<>{message}<Link underline="none" color='primary.light' href={link}>renvoyer l'email</Link></>)}
          {!link && message}
        </Alert>
      </Snackbar>
    </div>
  );
}
