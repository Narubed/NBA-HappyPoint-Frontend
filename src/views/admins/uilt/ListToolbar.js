import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
// import searchFill from '@iconify/icons-eva/search-fill';
// import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import Swal from 'sweetalert2';
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: '3px ' },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

CompanyListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};

// eslint-disable-next-line camelcase
export default function CompanyListToolbar({ numSelected, filterName, onFilterName }) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search ..."
          startAdornment={
            <InputAdornment position="start">
              <Icon icon="flat-color-icons:search" width="20" height="20" />
              {/* <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} /> */}
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            22
            {/* <Icon icon={trash2Fill} onClick={() => deleteRider()} /> */}
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="ค้นหา">
          <IconButton>
            <Icon icon="fluent:globe-search-20-filled" width="24" height="24" />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
