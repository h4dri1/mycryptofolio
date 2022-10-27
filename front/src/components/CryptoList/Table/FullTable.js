import {
  Table,
  TableContainer,
  Paper,
} from '@mui/material';

import HeadTable from './HeadTable';
import BodyTable from './BodyTable';

export default function FullTable(props) {
  const { cryptos } = props;

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '10px', overflowX: 'initial', marginTop: 2, boxShadow: 5, width: { xs: 'auto', md: '1220px' }, minWidth: '344px',
      }}
    >
      <Table stickyHeader size="medium" sx={{ backgroundColor: 'primary.main', borderRadius: '10px' }}>
        <HeadTable {...props} />
        { cryptos.length > 0 ? (
          <BodyTable loading={false} {...props} />
        ) : (
          <BodyTable loading {...props} />
        )}
      </Table>
    </TableContainer>
  );
}
