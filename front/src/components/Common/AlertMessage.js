import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useSelector, useDispatch } from 'react-redux';

import { setDisplaySnackBar } from 'src/actions/settings';

export default function AlertMsg() {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector((state) => state.settings.alert);

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
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
