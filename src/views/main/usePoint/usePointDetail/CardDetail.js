/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
import parse from 'html-react-parser';
import numeral from 'numeral';
import { Button, CardActionArea, CardActions, IconButton, Grid } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import Swal from 'sweetalert2';
// import io from 'socket.io-client';

import { SET_LOADING } from '../../../../store/actions';

// const socket = io.connect(`${process.env.REACT_APP_HAPPY_POINT_SOCKET}`);

export default function CardDetail({ state }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = React.useState(1);
  const [ownerPoint, setOwnerPoint] = React.useState(0);
  const [disabledButtonPlus, serDisabledButtonPlus] = React.useState(false);
  const [disabledButtonReduce, serDisabledButtonReduce] = React.useState(false);
  const [limitedMember] = React.useState(state.usep_limited_member);
  const [buttonConfirm, setButtonConfirm] = React.useState(false);
  const [limitedAmount, setLimitedAmount] = React.useState(state.usep_limited_member);
  const [valueUseing, setValueUseing] = React.useState(
    state.usep_limited_total -
      state.usep_useing.reduce((value, item) => value + item.member_amount, 0)
  );
  const reducerAmount = () => {
    const newAmount = amount - 1;
    serDisabledButtonPlus(false);
    if (newAmount < 1) {
      setAmount(1);
    } else {
      setAmount(newAmount);
    }
  };
  const plusAmount = () => {
    const setNewAmount = amount + 1;
    setAmount(setNewAmount);
    // Check limited Amount
    let valuereduce = 0;
    if (state) {
      valuereduce = state.usep_useing.reduce((value, item) => value + item.member_amount, 0);
    }
    const valueReducer = limitedMember - valuereduce;
    if (setNewAmount >= valueReducer) {
      serDisabledButtonPlus(true);
    }
    // --------------end----------------
    // Check Socket
    if (setNewAmount >= valueUseing) {
      serDisabledButtonPlus(true);
    }
    // ------------end--------------

    const valuePoint = setNewAmount + 1;

    const NewValue = valuePoint * state.usep_point;
    if (limitedAmount <= amount + 1) {
      serDisabledButtonPlus(true);
    } else if (NewValue > ownerPoint) {
      serDisabledButtonPlus(true);
    }
  };
  // React.useEffect(() => {
  //   const room = state._id;
  //   if (room !== '') {
  //     socket.emit('join_room', room);
  //   }
  //   socket.on('value_useing_use_point', (data) => {
  //     setValueUseing(data.value);
  //     if (data.value <= 1) {
  //       serDisabledButtonPlus(true);
  //       serDisabledButtonReduce(true);
  //     }

  //     if (data.value <= 0) {
  //       Swal.fire('สิทธิคงเหลือหมดแล้ว');
  //       navigate('/', { replace: true });
  //     }
  //   });
  // }, [socket]);
  React.useEffect(async () => {
    const memberLocal = JSON.parse(localStorage.getItem('members'));
    const getMember = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${memberLocal._id}`
    );
    if (getMember.data.data) {
      if (getMember.data.data.member_current_point < state.usep_point) {
        setButtonConfirm(true);
        serDisabledButtonPlus(true);
        serDisabledButtonReduce(true);
      }
      setOwnerPoint(getMember.data.data.member_current_point);
    }
    if (state.usep_useing.length !== 0) {
      const filterId = state.usep_useing.filter((item) => item.member_id === memberLocal._id);
      const reduceAmount = filterId.reduce((value, item) => value + item.member_amount, 0);

      if (limitedMember <= reduceAmount) {
        setButtonConfirm(true);
        serDisabledButtonPlus(true);
        serDisabledButtonReduce(true);
      } else if (limitedMember > reduceAmount) {
        setLimitedAmount(limitedMember - reduceAmount);
      }
      if (limitedMember === amount) {
        serDisabledButtonPlus(true);
        serDisabledButtonReduce(true);
      }
      const value = limitedMember - reduceAmount;
      if (value === 1) {
        serDisabledButtonPlus(true);
        serDisabledButtonReduce(true);
      }
      if (valueUseing <= 1) {
        serDisabledButtonPlus(true);
        serDisabledButtonReduce(true);
      }
      if (valueUseing <= 0) {
        Swal.fire('สิทธิคงเหลือหมดแล้ว');
        navigate('/', { replace: true });
      }
    }
  }, []);
  const onClickConfirm = async () => {
    Swal.fire({
      title: 'ยืนยันการทำรายการ ?',
      text: 'หากยืนยันแล้วจะไม่สามารถแก้ไขได้ !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await putData();
        Swal.fire({
          icon: 'success',
          text: 'ยืนยันการแลกสิทธิพิเศษ',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);
      }
    });
  };
  const putData = async () => {
    dispatch({ type: SET_LOADING, loading: true });
    const getUsePoint = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/use_point/${state._id}`
    );
    const memberLocal = JSON.parse(localStorage.getItem('members'));
    const dataUseing = getUsePoint.data.data.usep_useing;
    const dataPust = {
      member_id: memberLocal._id,
      member_amount: amount,
      payoff_point: getUsePoint.data.data.usep_point,
      member_timestamp: dayjs(Date.now()).format()
    };
    dataUseing.push(dataPust);
    const dataUsePoint = getUsePoint.data.data;
    const reportHistory = {
      rph_member_id: memberLocal._id,
      rph_name: dataUsePoint.usep_name,
      rph_amount: amount,
      rph_point: dataUsePoint.usep_point * amount,
      rph_detail: dataUsePoint.usep_detail,
      rph_type: 'ใช้พอยท์',
      rph_timestamp: dayjs(Date.now()).format(),
      rph_status: 'ใช้งานแล้ว',
      rph_note: dataUsePoint.usep_note ? dataUsePoint.usep_note : 'ไม่มี'
    };
    await axios.put(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/use_point/${getUsePoint.data.data._id}`,
      {
        usep_useing: dataUseing
      }
    );
    const dataPutpoint = ownerPoint - getUsePoint.data.data.usep_point * amount;
    if (dataPutpoint > 0) {
      await axios.put(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${memberLocal._id}`, {
        member_current_point: dataPutpoint
      });
    }

    await axios.post(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/report_history`, reportHistory);
    const pointHistory = {
      ph_member_id: memberLocal._id,
      ph_title: 'ใช้ Point แลกของรางวัล',
      ph_detail: dataUsePoint.usep_name,
      ph_point: dataUsePoint.usep_point * amount,
      ph_type: 'จ่ายออก',
      ph_timestamp: dayjs(Date.now()).format()
    };
    await axios.post(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/point_history`, pointHistory);
    // await sendUsePoint();

    dispatch({ type: SET_LOADING, loading: false });
  };
  // const sendUsePoint = () => {
  //   const room = state._id;
  //   socket.emit('send_use_point', { room });
  // };
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" color="secondary">
            {state.usep_name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary"> */}
          {/* {state.usep_detail} */}
          {parse(state.usep_detail)}
          {/* </Typography> */}
        </CardContent>
      </CardActionArea>
      <Typography gutterBottom variant="h6" component="div" color="error" sx={{ p: '0px 12px' }}>
        ***หมดเขต:{' '}
        {dayjs(state.usep_date_end).add(543, 'year').locale('th').format('D MMM  YYYY h:mm A')}
      </Typography>
      <CardActions>
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Grid item lg={8.5} md={8.5} sm={8.5} xs={8.5}>
            <div
              style={{
                fontSize: '12px',
                color: 'purple',
                fontWeight: 'bold',
                marginTop: '4px'
              }}
            >
              ต้องใช้ {numeral(state.usep_point * amount).format('0,0')} Point
            </div>
          </Grid>
          <Grid item lg={3.5} md={3.5} sm={3.5} xs={3.5} sx={{ display: 'flex' }}>
            <IconButton
              disabled={disabledButtonReduce}
              aria-label="fingerprint"
              color="secondary"
              sx={{ p: 0, m: 0 }}
              onClick={() => reducerAmount()}
            >
              <Icon icon="icon-park-solid:reduce-one" width="26" height="26" />
            </IconButton>
            <div
              style={{ marginLeft: '6px', marginRight: '7px', marginTop: '4px', fontSize: '16px' }}
            >
              {amount}
            </div>
            <IconButton
              disabled={disabledButtonPlus}
              aria-label="fingerprint"
              color="secondary"
              sx={{ p: 0, m: 0 }}
              onClick={() => plusAmount()}
            >
              <Icon icon="ant-design:plus-circle-filled" width="26" height="26" />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        color="secondary"
        sx={{ p: '0px 12px' }}
      >
        Point ปัจจุบันของคุณคือ {numeral(ownerPoint).format('0,0')}
      </Typography>
      {buttonConfirm ? (
        <Button
          disabled
          variant="contained"
          color="secondary"
          sx={{ width: '100%' }}
          // onClick={() => onClickConfirm()}
        >
          ท่านใช้สิทธิครบแล้ว หรือ Point ไม่พอ
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: '100%' }}
          onClick={() => onClickConfirm()}
        >
          แลกสิทธิพิเศษนี้
        </Button>
      )}
    </Card>
  );
}

CardDetail.propTypes = {
  state: PropTypes.object
};
