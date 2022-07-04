import * as Yup from 'yup';
import React, { useState } from 'react';
import OTPInput, { ResendOTP } from 'otp-input-react';

import axios from 'axios';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Grid,
  Avatar,
  Typography,
  Paper,
  Alert
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import Conditions from './Conditions';
// component

// ----------------------------------------------------------------------
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = makeStyles((theme) => ({
  grid: {
    backgroundColor: 'grey',
    height: '50vh',
    textAlign: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [newOTP, setNewOTP] = React.useState(false);
  const [OTP, setOTP] = useState('');
  const [value, setValue] = useState({
    firstName: '',
    lastName: '',
    address: '',
    password: '',
    phone: ''
  });
  const [mathRandom, setMathRandom] = useState();
  const [errorOTP, setERROROTP] = React.useState(false);
  const [disabledButton, setDisabledButton] = React.useState(true);

  const RegisterSchema = Yup.object().shape({
    phone: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('ไม่ต้องใส่ - หรือเว้นวรรค'),
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('กรุณากรอกชื่อ'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('กรุณากรอกนามสกุล'),
    address: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('กรุณากรอกที่อยู่สำหรับจัดส่งของด้วย'),
    password: Yup.string().required('กรุณาใส่รหัสผ่าน 6 ตัวขึ้นไป')
  });
  const handleSubmits = async (e) => {
    console.log(e);
    const zero = '0';
    const phoneNumber = e.phone;
    const result = zero.concat(phoneNumber);
    const randomMath = Math.floor(Math.random() * (999999 - 100000) + 100000);
    console.log(randomMath);
    let status = false;
    await axios
      .get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/phone/${result}`)
      .then((res) => {
        if (res.data.data.length === 0) {
          status = false;
        } else {
          status = res.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(status);
    if (status) {
      Swal.fire({
        icon: 'info',
        html: '<p style="font-size: 20px">มีผู้ใช้งานนี้ในระบบเเล้ว</p>',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      setTimeout(() => {
        setNewOTP(true);
      }, 3000);
      setOpen(true);
      setValue({
        firstName: e.firstName,
        lastName: e.lastName,
        address: e.address,
        password: e.password,
        phone: result
      });
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
          message: `รหัส OTP คือ ${randomMath} ใช้เพื่อลงทะเบียนยืนยันตัวตน`,
          phone: result,
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
    }
  };

  const requireNewOTP = () => {
    setOTP('');
    setNewOTP(false);
    const randomMath = Math.floor(Math.random() * (999999 - 100000) + 100000);
    setMathRandom(randomMath);
    console.log(randomMath);
    const config = {
      method: 'post',
      url: 'https://portal-otp.smsmkt.com/api/send-message',
      headers: {
        'Content-Type': 'application/json',
        api_key: `${process.env.REACT_APP_OTP_API_KEY}`,
        secret_key: `${process.env.REACT_APP_OTP_SECRET_KEY}`
      },
      data: JSON.stringify({
        message: `รหัส OTP คือ ${randomMath} ใช้เพื่อลงทะเบียนยืนยันตัวตน`,
        phone: value.phone,
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
    if (OTP !== mathRandom.toString()) {
      setERROROTP(true);
      setOTP('');
      setTimeout(() => {
        setERROROTP(false);
      }, 3000);
    } else {
      setOpen(false);
      const data = {
        member_phone_number: value.phone,
        member_firstname: value.firstName,
        member_lastname: value.lastName,
        member_address: value.address,
        member_password: value.password
      };
      await axios
        .post(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members`, data)
        .catch((error) => console.log(error));
      Swal.fire({
        icon: 'success',
        html: '<p style="font-size: 20px">Happy Point ยินดีต้อนรับ</p>',
        showConfirmButton: false,
        timer: 2000
      });
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      password: '',
      phone: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (e) => {
      handleSubmits(e);
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <>
      <Conditions disabledButton={disabledButton} setDisabledButton={setDisabledButton} />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              color="secondary"
              fullWidth
              type="number"
              label="Phone No."
              placeholder="0809876543"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-phone"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                    </svg>
                  </InputAdornment>
                )
              }}
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                color="secondary"
                label="ชื่อ"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />

              <TextField
                color="secondary"
                fullWidth
                label="นามสกุล"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Stack>

            <TextField
              color="secondary"
              fullWidth
              type="address"
              label="ที่อยู่"
              {...getFieldProps('address')}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />

            <TextField
              color="secondary"
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="รหัสผ่าน"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      {/* <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} /> */}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <AnimateButton>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                disabled={disabledButton}
              >
                ยืนยันการสมัคร
              </Button>
            </AnimateButton>
          </Stack>
        </Form>
      </FormikProvider>
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
            {newOTP && (
              <Button
                color="secondary"
                sx={{ m: 'auto', width: '100%' }}
                onClick={() => requireNewOTP()}
              >
                ขอรหัส OTP ใหม่
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
