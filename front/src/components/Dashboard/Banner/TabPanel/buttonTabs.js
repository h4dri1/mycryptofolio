/* eslint-disable max-len */
import {
  Box,
  IconButton,
} from '@mui/material';

import AddWalletOrTransac from 'src/components/common/AddWalletOrTransac';
import ReplayIcon from '@mui/icons-material/Replay';

export default function ButtonTabs(props) {
  const {
    selectedWallet,
    buttonBackGroundColor,
    toggleCreateWalletModal,
    handleEditTransaction,
    mainLinkClick,
    linkClick,
  } = props;

  const handleMainLinkClick = () => mainLinkClick();
  const handleLinkClick = (id) => linkClick(id);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      height: '48px',
      backgroundColor: { xs: '', md: buttonBackGroundColor },
      marginTop: { xs: -7, md: 0 },
      borderTopRightRadius: { xs: 0, md: '10px' },
    }}
    >
      <IconButton
        sx={{ height: '47px', width: '64px' }}
        onClick={() => {
          if (selectedWallet === '') {
            handleMainLinkClick();
          }
          else {
            handleLinkClick(selectedWallet);
          }
        }}
      >
        <ReplayIcon sx={{ color: 'secondary.light' }} fontSize="large" />
      </IconButton>
      <AddWalletOrTransac
        addWallet={toggleCreateWalletModal}
        addTransaction={handleEditTransaction}
      />
    </Box>
  );
}
