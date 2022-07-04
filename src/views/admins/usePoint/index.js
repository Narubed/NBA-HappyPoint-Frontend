/* eslint-disable camelcase */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { Image } from 'primereact/image';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Scrollbar from '../uilt/Scrollbar';
import SearchNotFound from '../uilt/SearchNotFound';

import ListHead from '../uilt/ListHead';
import ListToolbar from '../uilt/ListToolbar';
// import CreateMembers from './CreateMembers';
import MenuUsePoint from './component/MenuUsePoint';
//
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'usep_name', label: 'ชื่อสิทธิพิเศษ', alignRight: false },
  { id: 'usep_point', label: 'Point ที่ใช้แลก', alignRight: false },
  { id: 'usep_limited_total', label: 'สิทธิทั้งหมด', alignRight: false },
  { id: 'usep_limited_member', label: 'สิทธิต่อคน', alignRight: false },
  { id: 'usep_date_start', label: 'เริ่มวันที่', alignRight: false },
  { id: 'usep_date_end', label: 'สิ้นสุดวันที่', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.usep_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [usePointslist, setUsePointslist] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const getUsePoints = await axios.get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/use_point`);
    const getLevels = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/level_members`
    );
    const Privileges = [];
    if (getUsePoints.data.data) {
      getUsePoints.data.data.forEach((element) => {
        const levelName = [];
        element.usep_grop_level.forEach((item) => {
          const data = getLevels.data.data.findIndex((f) => f._id === item);
          levelName.push(getLevels.data.data[data]);
        });
        Privileges.push({ ...element, levels: levelName });
      });
    }
    console.log(Privileges);
    setUsePointslist(Privileges.reverse());
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = usePointslist.map((n) => n.usep_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usePointslist.length) : 0;

  const filteredUsers = applySortFilter(usePointslist, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
          การใช้พอยท์แลกทั้งหมด
        </Typography>
        <Button
          sx={{ borderRadius: '15px', mt: 3, boxShadow: '1px 2px #888888' }}
          color="secondary"
          variant="contained"
          component={RouterLink}
          to="/usePoint/create"
          startIcon={<Icon icon="carbon:add-alt" />}
        >
          เพิ่มของรางวัล
        </Button>
      </Stack>
      {/* <CreateMembers showDrawer={showDrawer} setDrawer={setDrawer} levels={levels} /> */}
      <Card>
        <ListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <ListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={usePointslist.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      _id,
                      usep_name,
                      usep_point,
                      usep_limited_total,
                      usep_limited_member,
                      usep_date_start,
                      usep_date_end,
                      usep_image
                    } = row;
                    const isItemSelected = selected.indexOf(usep_name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox" />
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Image
                              src={`${process.env.REACT_APP_DRIVE_SELECT_IMAGE}${usep_image[0]}`}
                              alt="Image"
                              width="50px"
                            />

                            <Typography variant="subtitle2" noWrap>
                              {usep_name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          {parseInt(usep_point, 10).toLocaleString()}
                        </TableCell>
                        <TableCell align="left">
                          {parseInt(usep_limited_total, 10).toLocaleString()}
                        </TableCell>
                        <TableCell align="left">{usep_limited_member.toLocaleString()}</TableCell>
                        {/* <TableCell align="left">{member_current_point.toLocaleString()}</TableCell> */}
                        <TableCell align="left">
                          {dayjs(usep_date_start)
                            .add(543, 'year')
                            .locale('th')
                            .format('D MMM  YYYY h:mm A')}
                        </TableCell>
                        <TableCell align="left">
                          {dayjs(usep_date_end)
                            .add(543, 'year')
                            .locale('th')
                            .format('D MMM  YYYY h:mm A')}
                        </TableCell>

                        <TableCell align="right">
                          <MenuUsePoint item={row} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 0 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
