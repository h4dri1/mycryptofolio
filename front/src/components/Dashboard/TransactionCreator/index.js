/* eslint-disable react/function-component-definition */
import { PropTypes } from 'prop-types';

import {
  Box,
  Tabs,
  Tab,
} from '@mui/material';

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
    'aria-controls': `tabpanel-${index}`,
  };
}

const TransactionCreator = (props) => {
  const [value, setValue] = useState(0);

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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Panneau ">
          <Tab label="Achat" {...Props(0)} />
          <Tab label="Vente" {...Props(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TcForm buy={value === 0} disabled={false} {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TcForm buy={value === 0} disabled={false} {...props} />
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
