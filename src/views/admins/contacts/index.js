/* eslint-disable camelcase */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
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
import CreateMembers from './CreateMembers';
import MenuContacts from './MenuContacts';
//
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'member_phone_number', label: 'เบอร์โทรศัพท์', alignRight: false },
  { id: 'lmb_name', label: 'เลเวล', alignRight: false },
  { id: 'member_firstname', label: 'ชื่อ', alignRight: false },
  { id: 'member_lastname', label: 'นามสกุล', alignRight: false },
  { id: 'member_current_point', label: 'Point ที่มีอยู่', alignRight: false },
  { id: 'member_timestamp', label: 'วันที่สมัคร', alignRight: false },
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
      (_user) =>
        _user.member_phone_number.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.lmb_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.member_firstname.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.member_lastname.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [Memberslist, setMemberslist] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showDrawer, setDrawer] = useState(false);
  const [levels, setLevels] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const getMembers = await axios.get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members`, {
      headers: {
        secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
        token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
      }
    });
    const getLevels = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/level_members`,
      {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      }
    );
    setLevels(getLevels.data.data);
    const MembersAndLevels = [];
    if (getMembers.data.data) {
      await getMembers.data.data.forEach((element) => {
        const idx = getLevels.data.data.find((item) => item._id === element.member_level);
        if (idx) {
          MembersAndLevels.push({
            ...element,
            lmb_name: idx.lmb_name,
            lmb_multiply: idx.lmb_multiply,
            lmb_point: idx.lmb_point
          });
        }
      });
    }
    setMemberslist(MembersAndLevels);
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Memberslist.map((n) => n.member_firstname);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Memberslist.length) : 0;

  const filteredUsers = applySortFilter(Memberslist, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
          ผู้ใช้งานทั้งหมด
        </Typography>
        <Button
          sx={{ borderRadius: '15px', mt: 3, boxShadow: '1px 2px #888888' }}
          color="secondary"
          variant="contained"
          onClick={() => setDrawer(true)}
          startIcon={<Icon icon="carbon:add-alt" />}
        >
          เพิ่มผู้ใช้งาน
        </Button>
      </Stack>
      <CreateMembers showDrawer={showDrawer} setDrawer={setDrawer} levels={levels} />
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
                rowCount={Memberslist.length}
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
                      member_phone_number,
                      lmb_name,
                      member_current_point,
                      member_firstname,
                      member_lastname,
                      member_timestamp
                    } = row;
                    const isItemSelected = selected.indexOf(member_firstname) !== -1;

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
                            <Typography variant="subtitle2" noWrap>
                              {member_phone_number}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{lmb_name}</TableCell>
                        <TableCell align="left">{member_firstname}</TableCell>
                        <TableCell align="left">{member_lastname}</TableCell>
                        <TableCell align="left">{member_current_point.toLocaleString()}</TableCell>
                        <TableCell align="left">
                          {dayjs(member_timestamp)
                            .add(543, 'year')
                            .locale('th')
                            .format('D MMM  YYYY h:mm A')}
                        </TableCell>

                        <TableCell align="right">
                          <MenuContacts item={row} levels={levels} />
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
