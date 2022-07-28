/* eslint-disable no-return-await */
/* eslint-disable camelcase */
import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// material-tailwind
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

// import EditMembers from './EditMembers';
import { SET_LOADING } from '../../../../store/actions';

// ----------------------------------------------------------------------
MenuContacts.propTypes = {};

export default function MenuContacts({ item, levels }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const deleteMember = async () => {
    const { usep_image } = item;
    setIsOpen(false);
    Swal.fire({
      title: 'Are you sure?',
      text: 'คุณต้องการลบข้อมูลนี้หรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง!',
      cancelButtonText: 'ยกเลิก!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({ type: SET_LOADING, loading: true });
        await axios.delete(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/use_point/${item._id}`, {
          headers: {
            secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
            token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
          }
        });
        await usep_image.map(
          async (imageName) =>
            await axios
              .delete(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/deleteImage/${imageName}`, {
                headers: {
                  secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
                  token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
                }
              })
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'ยืนยันการทำรายการ',
                  text: 'คุณได้ทำการลบข้อมูลนี้ออกจากระบบเเล้ว',
                  showConfirmButton: false,
                  timer: 2500
                });
                dispatch({ type: SET_LOADING, loading: false });
                setTimeout(() => {
                  window.location.reload(false);
                }, 2500);
              })
        );
      }
    });
  };
  const nanigateEdit = async () => {
    const getLevel = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/level_members`,
      {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      }
    );
    navigate('/usePoint/edit', { replace: true, state: { ...item, levels: getLevel.data.data } });
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
        <MenuItem
          // component={RouterLink}
          // to="/privilege/edit"
          state={item}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon="clarity:note-edit-line" />
          </ListItemIcon>
          <ListItemText
            primary="แก้ไข"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => nanigateEdit()}
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
      {/* <EditMembers showDrawer={showDrawer} setDrawer={setDrawer} levels={levels} item={item} /> */}
    </>
  );
}
MenuContacts.propTypes = {
  levels: PropTypes.array,
  item: PropTypes.object
};
