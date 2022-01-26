import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const portfolios = [
  {
    name: 'Daily trading',
    holdings: '7830',
  },
  {
    name: 'HODL',
    holdings: '23968',
  },
  {
    name: 'Long term',
    holdings: '2892',
  },
  {
    name: 'Mid term',
    holdings: '1000',
  }, {
    name: 'Savings 1',
    holdings: '7810',
  },
  {
    name: 'Savings 2',
    holdings: '5000',
  }, {
    name: 'Savings 3',
    holdings: '250',
  },
];

const TestWalletsNav = () => (
  <Box sx={{
    display: 'flex', flexDirection: 'column', margin: 'auto',
  }}
  >
    <ListItemButton sx={{ flex: '1' }}>
      <Box
        component="span"
        sx={[{
          width: '40%',
          maxWidth: '40vw',
          borderRadius: '60%',
          border: 'solid 2px #1976D2',
          background: '#1976D2',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        {
          '::after': {
            display: 'block',
            paddingBottom: '100%',
            content: '""',
          },
        },
        ]}
      ><Typography>$52,637.35</Typography>
      </Box>
    </ListItemButton>
    <List sx={{ overflowY: 'auto', flex: '2', maxHeight: '30vh' }}>
      {
        portfolios.map((portfolio) => (
          <ListItemButton key={portfolio.name}>
            <Box sx={{
              display: 'flex', width: '100%', alignItems: 'center', position: 'relative',
            }}
            >
              <Box
                component="span"
                sx={[{
                  width: '30%',
                  maxWidth: '40vw',
                  borderRadius: '50%',
                  border: 'solid 2px #1976D2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                },
                {
                  '::after': {
                    display: 'block',
                    paddingBottom: '100%',
                    content: '""',
                  },
                },
                ]}
              ><Typography variant="body2">{`$${portfolio.holdings}`}</Typography>
              </Box>
              <Typography>{portfolio.name}</Typography>
            </Box>
          </ListItemButton>
        ))
      }
    </List>
    <Box sx={{ flex: '1' }}>
      <AddCircleIcon sx={{ color: '#1976D2', marginLeft: '25px' }} fontSize="large" />
    </Box>
  </Box>
);

export default TestWalletsNav;
