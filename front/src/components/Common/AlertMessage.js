import { PropTypes } from 'prop-types';

export default function AlertMsg( { open, severity, message }) {
  return (
    <div>
      <Snackbar
            anchorOrigin={{
              vertical : 'top',
              horizontal: 'center'
            }}
            open={open}
            autoHideDuration={6000}
            onClose={() => setDisplaySnackBar(false)}
          >
            <Alert severity={severity} onClose={() => setDisplaySnackBar(false)}>
              {message}
            </Alert>
          </Snackbar>
    </div>
  );
};

AlertMsg.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
