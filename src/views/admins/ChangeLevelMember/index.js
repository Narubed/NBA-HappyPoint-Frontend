/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack
} from '@mui/material';

import CardDetail from './LevelCardDetail.js';
import { SET_LOADING } from '../../../store/actions';

export default function index() {
  const dispatch = useDispatch();
  const [levels, setLevels] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [createValue, setCreateValue] = React.useState({
    levelName: '',
    levelPoint: '',
    levelMultiply: ''
  });

  React.useEffect(async () => {
    let getLevel = '';
    dispatch({ type: SET_LOADING, loading: true });
    await axios
      .get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/level_members`)
      .then((res) => {
        getLevel = res.data.data.sort((a, b) => b.lmb_point - a.lmb_point);
      });
    setLevels(getLevel);
    dispatch({ type: SET_LOADING, loading: false });
  }, []);

  const handleChange = (prop) => (event) => {
    setCreateValue({ ...createValue, [prop]: event.target.value });
  };
  const handleSubmit = async () => {
    setOpen(false);
    const data = {
      lmb_name: createValue.levelName,
      lmb_point: parseFloat(createValue.levelPoint).toFixed(3),
      lmb_multiply: parseFloat(createValue.levelMultiply).toFixed(3)
    };
    dispatch({ type: SET_LOADING, loading: true });
    await axios
      .post(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/level_members`, data)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'สร้างเลเวลใหม่ของผู้ใช้เเล้ว',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถสร้างเลเวลใหม่ได้',
          showConfirmButton: false,
          timer: 1500
        });
      });
    dispatch({ type: SET_LOADING, loading: false });
  };
  return (
    <div>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <div style={{ fontSize: '20px', margin: '5%', fontWeight: '800', color: 'purple' }}>
              จัดการเลเวลผู้ใช้งาน
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <div style={{ justifyContent: 'flex-end', display: 'flex', padding: '25px' }}>
              <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
                เพิ่มเลเวล
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {levels.map((level) => (
            <Grid item lg={4} md={6} sm={6} xs={12} key={level._id}>
              <CardDetail level={level} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <div style={{ fontSize: '22px' }}>เพิ่มระดับของผู้ใช้</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              onChange={handleChange('levelName')}
              color="secondary"
              autoFocus
              margin="dense"
              id="name"
              label="ชื่อระดับ"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContentText>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0}>
            <TextField
              onChange={handleChange('levelPoint')}
              sx={{ m: 2 }}
              color="secondary"
              margin="dense"
              id="name"
              label="Point ที่ต้องใช้"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={handleChange('levelMultiply')}
              sx={{ m: 2 }}
              color="secondary"
              margin="dense"
              id="name"
              label="จำนวน point x จำนวนที่กรอก หาร 100"
              type="number"
              fullWidth
              variant="standard"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="outlined" onClick={() => setOpen(false)}>
            ออก
          </Button>
          <Button color="secondary" variant="outlined" onClick={() => handleSubmit()}>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
