/* eslint-disable camelcase */
import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// material-tailwind
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

import EditMembers from './EditMembers';
import { SET_LOADING } from '../../../../store/actions';

// ----------------------------------------------------------------------
MenuContacts.propTypes = {};

export default function MenuContacts({ item, levels }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showDrawer, setDrawer] = useState(false);

  const onClickEditMember = () => {
    setDrawer(true);
    setIsOpen(false);
  };
  const deleteMember = async () => {
    setIsOpen(false);
    Swal.fire({
      title: 'Are you sure?',
      text: 'คุณต้องการลบผู้ใช้คนนี้หรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง!',
      cancelButtonText: 'ยกเลิก!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({ type: SET_LOADING, loading: true });
        await axios.delete(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${item._id}`);
        Swal.fire({
          icon: 'success',
          title: 'ยืนยันการทำรายการ',
          text: 'คุณได้ทำการลบผู้ใช้นี้ออกจากระบบเเล้ว',
          showConfirmButton: false,
          timer: 1500
        });
        dispatch({ type: SET_LOADING, loading: false });
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      }
    });
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon="codicon:list-filter" />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon="clarity:note-edit-line" />
          </ListItemIcon>
          <ListItemText
            primary="แก้ไข"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => onClickEditMember()}
          />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon="fluent:delete-dismiss-24-filled" />
          </ListItemIcon>
          <ListItemText
            primary="ลบ"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => deleteMember()}
          />
        </MenuItem>
      </Menu>
      <EditMembers showDrawer={showDrawer} setDrawer={setDrawer} levels={levels} item={item} />
    </>
  );
}
MenuContacts.propTypes = {
  levels: PropTypes.array,
  item: PropTypes.object
};
