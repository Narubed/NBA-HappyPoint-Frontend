/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Switch,
  FormControlLabel,
  Stack,
  IconButton,
  Typography,
  ListItem,
  FormControl,
  InputLabel,
  Input
} from '@mui/material';

import { styled } from '@mui/material/styles';
import axios from 'axios';

import { Icon } from '@iconify/react';
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';
import Image from '../../../../assets/images/background/buble2.png';
import ConfirmSetting from './ConfirmSetting';

export default function DrawerSetting({ selectedIndex }) {
  const dispatch = useDispatch();

  const [showDrawer, setDrawer] = useState(false);
  const customization = useSelector((state) => state.customization);
  const [radioPassword, setRadioPassword] = React.useState(false);
  const [values, setValues] = React.useState({
    member_phone_number: '',
    member_firstname: '',
    member_lastname: '',
    member_address: '',
    member_password: ''
  });

  useEffect(async () => {
    const memberLocal = JSON.parse(localStorage.getItem('members'));
    let getMember = [];
    await axios
      .get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${memberLocal._id}`, {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      })
      .then((res) => (getMember = res.data.data));
    setValues({
      ...values,
      member_phone_number: getMember.member_phone_number,
      member_firstname: getMember.member_firstname,
      member_lastname: getMember.member_lastname,
      member_address: getMember.member_address
    });
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      {' '}
      <ListItemButton
        onClick={() => setDrawer(true)}
        sx={{ borderRadius: `${customization.borderRadius}px` }}
        selected={selectedIndex === 0}
      >
        <ListItemIcon>
          <IconSettings stroke={1.5} size="1.3rem" />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2">ตั้งค่าข้อมูลส่วนตัว</Typography>} />
      </ListItemButton>
      <Drawer anchor="right" open={showDrawer} onClose={() => setDrawer(false)}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom sx={{ m: 3 }}>
            ตั้งค่าข้อมูลส่วนตัว
          </Typography>
          <IconButton aria-label="delete" sx={{ m: 3 }} onClick={() => setDrawer(false)}>
            <Icon icon="icomoon-free:exit" />
          </IconButton>
        </Stack>

        <Box
          sx={{
            width: 380,
            height: '100%',
            minHeight: '70vh',
            backgroundImage: `url(${Image})`,
            backgroundAttachment: 'fixed'
            // backgroundRepeat: 'no-repeat'
            // backgroundSize: 'cover',
            // backgroundPosition: 'top'
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
                  disabled
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
            <FormControlLabel
              checked={radioPassword}
              color="secondary"
              onChange={(e) => setRadioPassword(e.target.checked)}
              control={<IOSSwitch sx={{ m: 1 }} />}
              label="แก้ไขรหัสผ่าน"
            />
            {radioPassword && (
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="member_password">
                    รหัสผ่านใหม่ (กรุณากรอก หากเปิดการเเก้ไขรหัสผ่านแล้ว)
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
            )}
            <ListItem disablePadding>
              <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                <ConfirmSetting
                  values={values}
                  radioPassword={radioPassword}
                  setDrawer={setDrawer}
                />
              </FormControl>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? 'purple' : 'purple',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));
