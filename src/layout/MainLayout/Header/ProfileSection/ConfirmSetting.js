import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import OTPInput from 'otp-input-react';

// material
import {
  Button,
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Alert
} from '@mui/material';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ConfirmSetting(props) {
  const [open, setOpen] = React.useState(false);
  const [newOTP, setNewOTP] = React.useState(false);
  const [OTP, setOTP] = useState('');
  const [mathRandom, setMathRandom] = useState();
  const [errorOTP, setERROROTP] = useState(false);

  const requireNewOTP = () => {
    setOpen(true);
    setOTP('');
    // setNewOTP(false);
    const randomMath = Math.floor(Math.random() * (999999 - 100000) + 100000);
    setMathRandom(randomMath);
    const config = {
      method: 'post',
      url: 'https://portal-otp.smsmkt.com/api/send-message',
      headers: {
        'Content-Type': 'application/json',
        api_key: `${process.env.REACT_APP_OTP_API_KEY}`,
        secret_key: `${process.env.REACT_APP_OTP_SECRET_KEY}`
      },
      data: JSON.stringify({
        message: `รหัส OTP คือ ${randomMath} ใช้เพื่อแก้ไขข้อมูลส่วนตัว`,
        phone: props.values.member_phone_number,
        sender: `${process.env.REACT_APP_OTP_SENDER}`,
        expire: '10:00'
      })
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const confirmOTP = async () => {
    const memberLocal = JSON.parse(localStorage.getItem('members'));
    if (OTP !== mathRandom.toString()) {
      setERROROTP(true);
      setOTP('');
      setTimeout(() => {
        setERROROTP(false);
      }, 3000);
    } else {
      props.setDrawer(false);
      setOpen(false);
      let data = null;
      if (props.radioPassword) {
        data = {
          member_phone_number: props.values.phone,
          member_firstname: props.values.member_firstname,
          member_lastname: props.values.member_lastname,
          member_address: props.values.member_address,
          member_password: props.values.member_password
        };
      } else {
        data = {
          member_phone_number: props.values.phone,
          member_firstname: props.values.member_firstname,
          member_lastname: props.values.member_lastname,
          member_address: props.values.member_address
        };
      }
      await axios
        .put(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${memberLocal._id}`, data, {
          headers: {
            secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
            token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
          }
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            html: '<p style="font-size: 20px">ยืนยันการตั้งค่าข้อมูลส่วนตัว</p>',
            showConfirmButton: false,
            timer: 2000
          });
        })
        .catch(() => {
          Swal.fire({
            icon: 'success',
            html: '<p style="font-size: 20px">มีบางอย่างผิดพลาด</p>',
            showConfirmButton: false,
            timer: 2000
          });
        });
    }
  };

  return (
    <>
      <Button
        onClick={() => requireNewOTP()}
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
        ยืนยันการตั้งค่า
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <a style={{ fontSize: '150%' }}>ยืนยันตัวตัวผ่านรหัส OTP</a>
          {errorOTP && <Alert severity="error">error - กรุณากรอกใหม่อีกครั้ง!</Alert>}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              secure={false}
              inputStyles={{
                color: 'purple',
                border: '15px',
                margin: '0px 5px 0px 0px',
                borderBottom: '0.5px solid #cbcbcb'
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div style={{ width: '100%' }}>
            <Button
              sx={{ m: 'auto', width: '100%' }}
              onClick={() => setOTP('')}
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-refresh"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                </svg>
              }
            >
              รีเซตรหัส OTP
            </Button>
            <br />
            <Button
              color="secondary"
              variant="contained"
              sx={{ m: 'auto', width: '100%', color: '#ffffff' }}
              onClick={() => confirmOTP()}
            >
              ยืนยัน
            </Button>
            {/* {newOTP && (
              <Button
                color="secondary"
                sx={{ m: 'auto', width: '100%' }}
                onClick={() => requireNewOTP()}
              >
                ขอรหัส OTP ใหม่
              </Button>
            )} */}
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

ConfirmSetting.propTypes = {
  values: PropTypes.object,
  radioPassword: PropTypes.bool
};
