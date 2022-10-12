/* eslint-disable react/function-component-definition */
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Tabs,
  Tab,
  IconButton
} from '@mui/material';

import { toggleTransactionEditor, toggleTransactionCreator } from 'src/actions/settings';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useState } from 'react';

import TcForm from './TcForm';

const TabPanel = ({
  children,
  value,
  index,
  ...other
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // maxHeight: '50vh',
          overflowY: 'auto',
          padding: '0 2em',
        }}
      >
        {children}
      </Box>
    )}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Props(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  };
}

const TransactionCreator = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const { wallet: wallets, selectedWallet } = useSelector((state) => state.portfolio);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // maxHeight: '50vh',
        overflowY: 'auto',
        padding: { xs: '0 0 2em 0', sm: '0 .5em 2em .5em' },
      }}
    >
      <Box sx={{display:'flex', width: '100%', justifyContent: 'right', cursor: 'pointer', marginBottom: -5}} edge="end" aria-label="Fermer" onClick={() => {
        if (props.id) {
          dispatch(toggleTransactionEditor());
        } else {
          dispatch(toggleTransactionCreator());
        }
      }
      }>
        <CloseRoundedIcon />
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Panneau ">
          <Tab label="Achat" {...Props(0)} />
          <Tab label="Vente" {...Props(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TcForm buy={value === 0} disabled={!selectedWallet} wallets={wallets} selectedWallet={selectedWallet} {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TcForm buy={value === 0} disabled={!selectedWallet} wallets={wallets} selectedWallet={selectedWallet} {...props} />
      </TabPanel>
    </Box>
  );
};

export default TransactionCreator;

TransactionCreator.propTypes = {
  props: PropTypes.object,
};

TransactionCreator.defaultProps = {
  props: {},
};
