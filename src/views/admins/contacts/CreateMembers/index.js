import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SET_LOADING } from '../../../../store/actions';

import Image from '../../../../assets/images/background/buble2.png';

export default function CreateMembers({ showDrawer, setDrawer, levels }) {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    member_phone_number: '',
    member_firstname: '',
    member_lastname: '',
    member_address: '',
    member_password: '',
    member_current_point: 1,
    member_total_point: 1,
    member_level: ''
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const headleSubmit = async () => {
    setDrawer(false);
    if (
      values.member_phone_number &&
      values.member_firstname &&
      values.member_lastname &&
      values.member_address &&
      values.member_password &&
      values.member_current_point &&
      values.member_total_point &&
      values.member_level
    ) {
      const data = {
        member_phone_number: values.member_phone_number,
        member_firstname: values.member_firstname,
        member_lastname: values.member_lastname,
        member_address: values.member_address,
        member_password: values.member_password,
        member_current_point: parseInt(values.member_current_point, 10),
        member_total_point: parseInt(values.member_current_point, 10),
        member_level: values.member_level
      };
      dispatch({ type: SET_LOADING, loading: true });
      await axios
        .post(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members`, data, {
          headers: {
            secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
            token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
          }
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มข้อมูลสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 1500);
        })
        .catch(() => {
          Swal.fire({
            icon: 'info',
            title: 'เพิ่มข้อมูลไม่สำเร็จ',
            showConfirmButton: false,
            timer: 1500
          });
        });
      dispatch({ type: SET_LOADING, loading: false });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'กรอกข้อมูลไม่ครบ',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  return (
    <div>
      <>
        <Drawer anchor="right" open={showDrawer} onClose={() => setDrawer(false)}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom sx={{ m: 3 }}>
              ผู้ใช้งานใหม่
            </Typography>
            <IconButton aria-label="delete" sx={{ m: 3 }} onClick={() => setDrawer(false)}>
              <Icon icon="icomoon-free:exit" />
            </IconButton>
          </Stack>

          <Box
            sx={{
              width: 380,
              height: '100%',
              minHeight: '100vh',
              backgroundImage: `url(${Image})`,
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'top'
            }}
            role="presentation"
          >
            <List sx={{ p: '0px 20px' }}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="member_phone_number">
                    เบอร์โทรศัพท์
                  </InputLabel>
                  <Input
                    color="secondary"
                    id="member_phone_number"
                    value={values.member_phone_number}
                    onChange={handleChange('member_phone_number')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="ci:phone" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="member_firstname">
                    ชื่อ
                  </InputLabel>
                  <Input
                    color="secondary"
                    id="member_firstname"
                    value={values.member_firstname}
                    onChange={handleChange('member_firstname')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="icon-park-solid:edit-name" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="member_lastname">
                    นามสกุล
                  </InputLabel>
                  <Input
                    color="secondary"
                    id="member_lastname"
                    value={values.member_lastname}
                    onChange={handleChange('member_lastname')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="icon-park-twotone:edit-name" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="member_address">
                    ที่อยู่
                  </InputLabel>
                  <Input
                    color="secondary"
                    id="member_address"
                    value={values.member_address}
                    onChange={handleChange('member_address')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="clarity:map-marker-solid-badged" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="member_password">
                    รหัสผ่าน
                  </InputLabel>
                  <Input
                    color="secondary"
                    id="member_password"
                    value={values.member_password}
                    onChange={handleChange('member_password')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="carbon:password" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="member_current_point">
                    Point เริ่มต้น
                  </InputLabel>
                  <Input
                    color="secondary"
                    type="number"
                    id="member_current_point"
                    value={values.member_current_point}
                    onChange={handleChange('member_current_point')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="bxs:coin" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
              <ListItem disablePadding>
                <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                  <InputLabel color="secondary" id="member_level">
                    เลเวลเริ่มต้น
                  </InputLabel>
                  <Select
                    color="secondary"
                    labelId="member_level"
                    id="member_level"
                    value={values.member_level}
                    label="Age"
                    onChange={handleChange('member_level')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="simple-icons:opslevel" />
                      </InputAdornment>
                    }
                  >
                    {levels.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.lmb_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem disablePadding>
                <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                  <Button
                    onClick={() => headleSubmit()}
                    color="secondary"
                    variant="contained"
                    sx={{
                      transition: '.2s transform ease-in-out',
                      borderRadius: '15px',
                      '&:hover': {
                        // border: '2px solid transparent',

                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    ยืนยันการเพิ่มข้อมูล
                  </Button>
                </FormControl>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </>
    </div>
  );
}
CreateMembers.propTypes = {
  levels: PropTypes.array,
  showDrawer: PropTypes.bool,
  setDrawer: PropTypes.func
};
